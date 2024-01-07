---
title: "Server-side rendering local dates without FOUC"
date: "2024-01-07T00:20:16.113Z"
description: "Achieving the holy grail of server-side rendered local dates without hydration mismatches or flash of unhydrated content, by (ab)using synchronous scripts."
---

If you're server-side rendering dates in your users' local timezone with React, you may have had trouble with hydration mismatches. The server cannot know the user's timezone; it will inevitably lead to a mismatch and generate an error log in the console.

If that's the extent of your troubles, you can slap a `suppressHydrationWarning` to the `<time>` element and call it a day. It's [the officially recommended approach](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors) for this specific use case.

But if you're bothered by the uncanny valley where the server-rendered date is displayed until hydration completes, you're at the right place.

Before starting, let me tell you that this is a long-existing issue with different solutions and tradeoffs. I will share some solutions and a novel approach I came up with.

---

First, let's establish some concepts. If you're confused about server-side rendering, hydration, or mismatches; check out [Josh Comeau's excellent article](https://www.joshwcomeau.com/react/the-perils-of-rehydration/) on this topic.

- React traditionally has been a client-side rendering library, which takes an empty page and generates the HTML on the client.
- Server-side rendering converts the application to HTML on the server, so your users aren't presented with an initially empty page.
- Hydration[^1] is the step where React conceptually aligns the HTML it would generate with the HTML the server already generated and attaches itself to enable interactivity.
- If the HTML React generates doesn't match up with the server-generated HTML, that's what we call a hydration mismatch, and React throws an error.
- Hydration mismatches may occur for many reasons, but the most common reason is that the server and client are fundamentally different. They have different APIs and know separate things.
- User timezone is one of the knowledge differences, and there's no way for the server to know the user's timezone before rendering the page.

The last point is worth more elaboration. Let's say you needed the user's locale instead. In that case, you could guess it from the request headers[^2]. Donavon West has [an excellent article](https://donavon.com/blog/remix-locale) about this topic that I highly recommend.

On the other hand, if you are willing to make a round trip, you can learn more from the client. Jacob Paris has found [a great way](https://www.jacobparis.com/content/remix-ssr-dates) to inform the server quickly. Kent C. Dodds evolved this idea into [a library](https://github.com/epicweb-dev/client-hints) with well-picked defaults, which you can use if you are happy with its tradeoffs.

However, maybe you're comfortable with the flash of unhydrated content (FOUC)[^3]. If so, you can either follow my initial advice of adding a `suppressHydrationWarning` prop or use one of the many `useIsSSR`[^4] hooks, which returns `false` only after hydration is complete to avoid a mismatch.

But FOUC is a significant issue that may contribute to cumulative layout shift (CLS)[^5] or hypothetically [send a false missile alert](https://www.epicweb.dev/stop-lying-to-your-users). If you are okay with a round trip occasionally and want a robust solution, consider using `client-hints`. Otherwise, read on.

---

My approach borrows from [another one of Josh's stellar articles](https://www.joshwcomeau.com/react/dark-mode/) about a similar problem, the dreaded flash of light-mode. It's essentially the same technique: inject a synchronous script to act before the content is painted (or React has started hydration). There are a few steps.

1. A vanilla JavaScript function is needed to format the date. It has to be dependency-free and self-contained since we must turn it into a string.
2. Add it to the `window` object at your client entry point.
3. Render an additional `<script>` tag to your date component to replace the server-rendered HTML with the client-formatted data before the browser can paint.

Here's how it looks in action:

```jsx
// format-date.js
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date)
}
```

```jsx
// root.js
import { formatDate } from "./format-date.js"
function Document() {
  return (
    <html>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.formatDate = ${formatDate.toString()}`,
          }}
        />
      </head>
      <body>{/* Your app here! */}</body>
    </html>
  )
}
```

```jsx
// DateTime.js
import { formatDate } from "./format-date.js"
export function DateTime({ date }) {
  const isoString = date.toISOString()
  const formattedDate = formatDate(date)
  const id = useId()

  return (
    <>
      <time dateTime={isoString} id={id}>
        {formattedDate}
      </time>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.getElementById("${id}").textContent = window.formatDate(new Date("${isoString}"));
          `,
        }}
      />
    </>
  )
}
```

Check [the sandbox](https://stackblitz.com/edit/remix-run-remix-o5qpgi?file=app%2Fcomponents%2FDateTime.tsx) to see it in action and play with it. Even though the example is in Remix, it should work with Next.js or any other framework with SSR support.

Here's how and why it works:

1. When the browser parses and executes the `<head>`, our `formatDate` function is added to the global scope and ready to be consumed. It cannot be a module since it has to execute synchronously.
2. When the browser gets to the HTML generated on the server by the `DateTime` component, it immediately executes the script we added, and the client formatted date replaces the text content of the `<time>` element.
3. The browser can paint the client-formatted date, and the user sees only the local date.
4. At the end of the `<body>`, React is executed and hydrates the document. Since it uses the same function to format the date, the output is the same, and there's no hydration mismatch. Crisis averted!
5. React has done hydrating, and the page is interactive.

---

I must admit that this solution is hacky and prone to bugs. But I believe it's possible to improve on it. Some pointers for people who may be interested:

- There's no hard requirement to make the `formatDate` function dependency-free and self-contained. You can use a bundler to serialize it.
- The `<script>` tag in the entry point has a `suppressHydrationWarning` since the function may have gone through a bundler during the build and may not 1-to-1 match the stringified version.
- This approach requires a lot of manual wiring, but it's possible to abstract out parts and make it harder to mess it up. One can even generalize it to work with more than just date formatting!

---

Well, I hope you find it useful. I also hope that React will come up with a first-party solution to this class of problems in the future so there won't be a need for such hacks.

Please let me know if you use it, and I'd love to hear about your experience!

[^1]: https://react.dev/reference/react-dom/client/hydrateRoot
[^2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
[^3]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content
[^4]: https://react-spectrum.adobe.com/react-aria/useIsSSR.html
[^5]: https://web.dev/articles/cls
