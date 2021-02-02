---
title: Full-stack web development holy grail
date: "2021-02-02T13:47:10.552Z"
description: ""
---

I think web development is much better than it ever was, but it's also much worse at the same time. I'm glad we are mostly free from model-view-controller nonsense and we unified backend view generation with frontend DOM manipulation. But we also gave up much of the web standards for practically no reason. I think it's time we brought together what was good about web with what's good about development experience now.

1. MVC is bad

Model-view-controller is the manifestation of the discipline to not include any logic in views. But React proved to us that it's alright to have some logic in views. The controller is no longer needed. And honestly, you can even do your database queries inside your views, like the PHP days, if you're careful about it. If it gets out of hand, move the logic to another file but you can still call it inside the view. This misinterpretation of separation of concerns principle, has caused massive damage and it's time we simplified things.

2. ORMs are bad

First of all, you don't need a database wrapper to future proof yourself in case you decided to change your database software. You won't. Even if you do, before there's such a need you'd be printing money and you can hire a consultant to do the hard work for you. It's a textbook premature optimization. And trying to abstract the database away is a fool's errand. Different databases have different capabilities and even if you promise to use a standard subset, the abstraction can and will leak. If you want to do zero-downtime migrations, you need to know your database inside out. It's a good idea to familiarize yourself with your choice of database sooner than later and use the domain specific language for the databases, which is SQL.

3. Scaffolding is bad

Scaffolding is the symptom of a much bigger problem; boilerplate and the tendency to reduce boilerplate that cannot be reduced. If there's some unavoidable code that must be written, it's better if you write it than have it generated for you. It's easier to write code than modify it, and when the framework gets updated, your generated code will be outdated. Your code is your business domain and don't let a generic tool write your code for you.

4. SPAs are bad

Search engines, CDNs and browsers care about meta tags, status codes and response headers. But SPAs don't. Even full-stack React frameworks like Next.js and Gatsby are bad at it. Your supercharged link component promises that it's doing you a favor by fetching necessary data and code and performing a client-side navigation, but it's messing up scroll position, browser history and focus state. (It doesn't even work for forms, they are unresponsive until resources are downloaded, parsed and evaluated.) Are you even sure it's downloading less resources? React Server Components demo shows a case where downloading a server rendered markdown is cheaper than downloading the whole markdown library. Remix is a step in the right direction and I hope more will follow.

5. JavaScript is bad

Imagine you're visiting a sketchy ecommerce website. You add things to your cart, go to checkout page, enter your credit card information and only then decide it's not worth it. Are you even sure that the payment form didn't already send your credit card number without your permission? We give too much power to the web applications we use, some were even mining bitcoin while the site was open. We as developers should depend more on the web platform and reach for JavaScript when it's really necessary. At the very least, we should make things work without JavaScript and only progressively enhance.

6. Bundling is bad

We're bundling things together for HTTP performance, and maybe HTTP/2 is not as good as promised, but good cache behavior is also important for repeat visitors. Does it make sense to invalidate huge chunks of bundles for each little change? Same for CSS. It's great that you use utility-first CSS, but each tiny change requires the user to download everything all over again. We should stop bundling at this point and let browsers cache things at the module level.

7. CSS is bad

CSS is the worst. Cascade sucks, specificity sucks, !important sucks and source order is the worst idea ever. There isn't even a way to build constraint based user interfaces. CSS-in-JS makes things even worse by introducing runtime cost. The lesser evil is Tailwind in my opinion, which offers a good development experience and good defaults. But I think utility-first CSS is also a premature optimization. It's true that CSS only grows, but we have CSS variables now; is there any difference between your CSS growing with variables or your HTML growing with utility classes? The gold standard should be that your base components to have custom styling, and your composite and route components to use those.

8. File system routing is half-bad

I actually like file system based routing a lot. Express or React Router made things very complex for little benefit; there's no need to resolve routes if your routes are simple, like a file tree. But the problem is that the routes act only as GET handlers, if you need to handle POST you need to dive into API routes. I think a file system route module should export handlers for all the HTTP verbs you need, which are just GET and POST I guess.

With all the problems listed above, the holy grail app I would write today would start with the database schema first. I would write queries and views as well, and migration would get the attention it deserves. No down migrations, so your code should work both with the old schema and the new. Then I would decide on the design tokens and code them as CSS variables. My base components would build on those and a couple utilities. A route would live on the file system and it would have HTTP handlers and a view component. It would be server rendered with minimal JavaScript, only for progressive enhancement. There would be no bundling and only TypeScript and JSX transpilation.

Does this sound like something you'd be interested in? If it does, maybe I'll get around to build it someday. I know I would like something like this.
