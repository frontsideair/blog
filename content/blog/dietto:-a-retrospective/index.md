---
title: Dietto: a retrospective
date: "2021-01-24T17:16:28.692Z"
description: ""
---

I've been working on a progressive web app for a while. It's a [calorie counting app](https://dietto.6nok.org/) with simplicity as the guiding principle. I dwelled on it for quite a bit of time and eventually lost my interest until lately. Then I decided to give myself a week to wrap it up.

I want to let you in with the choices I made and the path I took while building it. It's not a great technical achievement by any means, but it's a simple and self-contained project. And I know by experience that the internet is full of beginner and advanced content with scant resources in between.

I want this to help those who don't feel like a beginner but don't feel confident enough to build something from scratch. I made a ton of architectural mistakes but eventually recovered from most of them, and I have a path for the remaining ones. I hope this helps you see your path a bit better.

# Platform

When I decided to build a calorie counter app, I had a vague idea to make it a progressive web application; an application optimized for mobile devices, built on web technologies, and hosted on the web. I only needed to convince myself that this was the best option.

One option was to make it a website with a backend for user membership and server-side data storage. But this conflicted with the simplicity principle, as it would require a lot more moving parts and more development effort. So I didn't take this path.

I could also make it a native mobile app. I am not familiar with Swift or Kotlin, but I could use React Native to stay in my comfort zone. The problem was the high cost of obtaining a developer license, which felt wasteful to me. So my decision to write a web application was confirmed by the process of elimination.

In both iOS and Android, you can add a web application to the home screen, and it behaves more or less like a native app. This is good enough for a side project that I plan to build for myself.

# Framework

React was the obvious choice for me since it's the de facto standard at this point and the UI library I have the most experience with. But it's just a library, and I needed the complete package.

As a fan of [Next.js](https://nextjs.org/), I decided to start with it. It has excellent performance, simple routing, and a superpowered Link component. But I quickly realized that server-side rendering would be an issue when I'm using client-side data storage. And unfortunately, it's all-or-none. Wrapping everything in ClientSide components didn't seem like a good idea, so I decided to switch.

The obvious choice was [create-react-app](https://create-react-app.dev/). It comes with everything I need, including first-class TypeScript support.

In retrospect, I could've used a much simpler setup I was envisioning for a long time: TypeScript and [Skypack](https://www.skypack.dev/). TypeScript would handle type checking and JSX transformation, while Skypack would remove the need for bundling. I could also consider using [Snowpack](https://www.snowpack.dev/) to have React Fast Refresh at development.

# Routing library

When I ditched Next.js, I found myself in need of a router. There were options like [react-router](https://reactrouter.com/) and [reach-router](https://reach.tech/router/). (And they [announced](https://reacttraining.com/blog/reach-react-router-future/) a merge.) I knew that reach-router was vastly superior to the old react-router, but it would be deprecated eventually. So I decided to use the pre-release version of react-router, which has everything good about reach-router and more.

I had made the same mistake before by using react-router version 4 at beta and hit almost all bugs. But this time it worked without any problems. It could be that my app had only four routes, and all of them were top-level.

In the end, I decided to use the client-side state in favor of a router. Sometimes we cling to old habits for far too long. In an app with no interlinking, tabs will do just fine.

# Component library

I think it's not a secret that I'm a fan of [Tailwind CSS](https://tailwindcss.com/). But for this project, I didn't want to write any custom styles. I wanted to work with the components given to me and not reinvent stuff.

I had two main requirements for a component library; a strong focus on accessibility and a design that doesn't shout a brand.

Accessibility is very important to me, even though I'm making this app for myself, I think a component library that doesn't care about accessibility is bound to be low quality. Honestly, the web is accessible by default, and we break it by reinventing stuff but only worse.

Branding is also important. Take [Material Design](https://www.material.io/), for example. I think that it's a very good design system, but any app build with it looks like a Google app, there's no way around it. The same is true for [Polaris](https://polaris.shopify.com/) and Shopify.

There are a few libraries that meet these criteria. But I've heard a lot about [react-aria](https://react-spectrum.adobe.com/react-aria/index.html), and I decided to use the component library built on it, [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html). It doesn't have many components, but it looked like it could work for my case.

This turned out to be an okay choice, I didn't waste time writing basic components or deciding on design tokens, but it felt inflexible at times. I also stumbled upon a few bugs that I reported, which I could fix in theory, but it didn't make sense in practice. I worked around one and decided to live with the other.

If I were to start over, I might've given [Chakra UI](https://chakra-ui.com/) a try or go with Tailwind CSS and [Headless UI](https://headlessui.dev/) from the start.

# Client-side storage

I was not familiar with the client-side storage landscape when I started the project, to be honest. I only used [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) before and heard of [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) by the name. I spent a lot of time on this part and lost all my motivation.

In the beginning, I was going to use localStorage and call it a day. But since I was working with complex-ish data and queries, I wanted to give IndexedDB a try. One look at IndexedDB convinced me to seek something simpler. (Even MDN admits that it's too complicated and suggests using a wrapper.) In a futile attempt, I looked into [localForage](https://localforage.github.io/localForage/), which is a wrapper over IndexedDB with backward compatibility and localStorage like API. But it solved nearly none of my original problems, so I kept looking.

Then I remembered [PouchDB](https://pouchdb.com/), which would be an excellent fit for my use case, with the option to add server-side capabilities later on. To harness the popularity of React, I decided to look for a hooks-enabled wrapper for it. Unfortunately, I found two, each missing features the other has. Eventually, I decided that Suspense support was worth writing missing type definitions. Suspense is cool.

But the problem arose when I wanted to work with relational data. PouchDB has support for joins, but it's kind of weird. And my initial schema was a bit complex. So I scratched my head for such a long time and went back to the drawing board when I could've been implementing features. I ended up losing all interest.

When I came back to finish it within a reasonable timeframe, I had to do a serious simplification of the schema. I also didn't want to be buried under third-party libraries and experimental features, so even though it would be inefficient, I went with localStorage. It's simple, and it's synchronous; just what I need.

In the future, I may give PouchDB another try. I liked the simple API and the possibility of adding a backend. With more stable hooks, I can replace the finicky localStorage-based solution that I ended up writing. I wish I didn't spend so much time and motivation here.

# Chart library

The app was supposed to have a few charts, and I was supposed to find a library. In my previous experience, I was unable to find any good chart library. The case remains the same in 2021.

I had experience with [Recharts](http://recharts.org/) and [Victory](https://formidable.com/open-source/victory/), so I wanted to try something different. I like the charts on [The State of JavaScript](https://stateofjs.com/), so I decided to give [Nivo](https://nivo.rocks/) a try. There's no nice way of putting it, I didn't like it. But I didn't have any better options, so I stuck with it. At some point, I may end up writing a bare-bones chart library.

# Bits and pieces

I needed a date picker. React Spectrum doesn't ship with one. The native date input is not well supported. I ended up building a shitty one.

For all my date manipulation needs, I used the tried and true [date-fns](https://date-fns.org/). I would've liked a library that differentiates between date, time, and date-time, but it worked well enough, so I have no complaints.

For all my remaining needs, I used [Ramda](https://ramdajs.com/). There's no better alternative, period.

Since I wanted to store, thus serialize, Map data structures, it was the perfect opportunity to use [superjson](https://github.com/blitz-js/superjson). I also got to use [immer](https://immerjs.github.io/immer/) to do deep and immutable updates.

I didn't write any tests. Sue me.

# Conclusion

I'm glad I did this. It was an exercise to use some libraries I heard a lot and think about how to simplify and better structure things. And I'm happy to be sharing this retrospective. I'm hoping more people will share their decision processes and discuss their effects in the future.

As always, feedback is most welcome!
