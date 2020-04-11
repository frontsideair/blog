---
title: Does your web app work without JavaScript?
date: "2020-04-10T21:25:52Z"
description: "It really should. I share my experiences building a web app that works without JavaScript."
---

I'm currently running an experiment. I'm building a non-trivial web app using JavaScript, which should work with no missing functionality if JavaScript is disabled. That's an undertaking for sure, but it's how it used to be in the olden times. I just wanted to try to build a product using the web fundamentals where JavaScript would only enhance the experience and not be a requirement. Call it graceful degradation taken to the extreme.

How did I do it? My framework of choice was Next.js, which was actually an inspiration to this experiment. With Next.js you make pages using React.js and Next.js handles everything for you. What do I mean by everything? When you make a request to the server, Next.js gathers the required data to render the page and sends the HTML along with the required JavaScript and it is rehydrated on the client. When you navigate to another page, something magical happens. The Next.js runtime actually fetches the scripts required for the navigated page, fetches the required data, using the same code for gathering the data on the server via an automatically generated route and switches to the page without a full page refresh. This works out-of-the-box, zero config. Neat!

With Next.js doing most of the heavy lifting, the only thing I had to do was to wrap every user interaction that hits the server in a `<form>`. Have a login form? Don't intercept with an `onSubmit` handler. Give the form an `action` and implement that with an API endpoint, which will do the job and send redirect status code and a `Location` header for the browser to navigate to. It looks something like this:

```jsx
// pages/login.js
export default function() {
  return (
    <form method="post" action="/api/login">
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  )
}

// pages/api/login.js
export default async (req, res) => {
  const { email, password } = req.body
  const user = await db.getUserByEmail(email)

  if (user !== null && hash(password) === user.hash) {
    res.setHeader("Location", "/")
    res.setHeader("Set-Cookie", `token=${genToken(user)}; Path=/; HttpOnly;`)
    res.status(303).end()
  } else {
    res.setHeader("Location", "/login")
    res.status(303).end()
  }
}
```

This is good, but now we do full page refreshes. This sucks! Well, it doesn't have to. Let's create a custom `<Form>` component that does what I told you not to do, intercept the submit event. But since the form now works without JavaScript enabled, when it is enabled we will _enhance_ the behavior, not just provide it. The custom component can `.preventDefault`, create the post body from the form data, make a request to the `action` and read the `Location` header from the response and navigate to that page using Next.js router. We're providing the same functionality, using the same endpoint (though this is not a requirement) and we're sleeping better at night knowing we're still using the web standards. Looks a bit like this:

```jsx
function Form({ children, action, method }) {
  const router = useRouter()

  function onSubmit(event) {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    fetch(action, { method, body }).then(response => {
      const { pathname } = new URL(response.url)
      return router.push({ pathname })
    })
  }

  return (
    <form action={action} method={method} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
```

So why do this? As I said at the beginning of the post, it's just an experiment. But there's more to it. First of all, how many forms did you encounter in the past which wouldn't work when you pressed enter. I bet this number is greater than zero. This is because people reinvent forms and add event handlers only to the submit buttons. When you reinvent something, there is a risk of not being able to get all the details correct. But when you start with a simple form, you must implement it correctly. So this solution is inherently more accessible.

Another big win is that your website is instantly more interactive. Go ahead and navigate to your favorite web application, open the devtools and set the internet speed to 2G. (Don't forget to disable the cache.) It's not interactive and you see spinners until all the scripts are loaded. If you're in luck, the web app has server side rendering, but even though you see content right away, it's also not interactive until after the scripts are loaded. Why? Since they implemented business critical functionality with JavaScript, you need to wait until it's loaded for the website to function. What a bummer! Our approach, on the other hand, works like a charm. You only need to wait to get the speedier version, which is a nice to have and not a requirement.

So is it all roses and sunshine? Unfortunately, no. Not every user interaction should result in navigation to a new page for the enhanced version. So the custom form component gets complicated. The API endpoints also have to respond differently depending on the way the request was made. Well it's a not a total drawback since it makes sense for an endpoint to respond differently depending on the `Accepts` header, which is how I solved this issue. And you also get quite a lot of `<form>`s in your application. Have a like button? Yeah that's a form. Five star rating component? That's gonna be five forms. I already felt like giving up a few times, but the experiment is still going strong! I expect to hit more roadblocks in the future, but it's all going to be a valuable learning experience.

In the end, I had a lot of fun working on this experiment and learned a ton. I want to publish my custom form component once I'm confident that it covers enough use cases and works reliably. It also needs cooperation from the backend so it might get published with a few helpers for the API handlers. Finally, I wanted to let you know that I'm sharing my experiences and frequent frustrations on Twitter, so if you're interested in my little experiment be sure to keep an eye on me there!
