---
title: "The Suspense is Killing Me: Part 1"
date: "2021-04-18T20:43:44.405Z"
description: ""
---

If you are a long-time React user, you might be wondering for the past few years about when Concurrent Mode/Suspense will ship. The plans to release them have been [pushed back](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html) [more than once](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#an-update-to-the-roadmap) and the React core team has been [self-admittedly](https://twitter.com/reactjs/status/1377733244544778246) silent. Now with the Server Components demoed and React Labs announced there is more interest than ever.

Here's a refresher for those who forgot what happened when.

- May 11, 2016: [Initial PR](https://github.com/facebook/react/pull/6690) for async architecture (Fiber)
- Jul 19, 2016: Andrew Clark's [Fiber explainer](https://github.com/acdlite/react-fiber-architecture)
  - It hints to us that Async React was in the making since at least 2014
- September 26, 2017: [React 16 is out](https://reactjs.org/blog/2017/09/26/react-v16.0.html) with Fiber
  - Fiber is here, but Concurrent Mode is not enabled out of the box (even to this day)
- March 01, 2018: [Dan Abramov demos time-slicing and Suspense](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html) at JSConf Iceland 2018
- May 28, 2018: [Andrew Clark demos Suspense with streaming SSR](https://www.youtube.com/watch?v=z-6JC0_cOns)
- October 23, 2018: [React 16.6 released](https://reactjs.org/blog/2018/10/23/react-v-16-6.html) with Suspense only for code-splitting
- November 06, 2019: [Concurrent Mode and Suspense preliminary docs](https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) are released
- December 21, 2020: [Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) unveiled
- April 1, 2021: [React Labs](https://www.youtube.com/watch?v=rVpMhn5CafM) architecture deep dives announced

This was a lot, even with heavy pruning!

If you are confused by this timeline and many different names that seemingly refer to more or less the same thing, then you're not alone.

## What's with the names?

React core team has been on the concurrency track since 2016 and concurrent React has far-reaching consequences, which resulted in many sub-projects that were renamed (or sometimes killed) over a long time. I'll try my best to explain what's what.

- **Async React** is the earliest mention of the current direction of React. This name has been changed to **Concurrent Mode** since it was a better fit for explaining the benefits of this approach.
- **Fiber** is the name of the new core algorithm, which has replaced the old one (retroactively called **Stack**) in 2017. This change enables Concurrent Mode, which is considered unstable and not yet enabled by default.
- **Time-slicing** is one of the main intended benefits of Concurrent Mode. This allows React to do its work in chunks so it doesn't block the main thread for too long, which is necessary for smooth rendering of animations and input states.
- **Concurrent Mode** is enabled by Fiber and allows many improvements to React, such as prioritizing more urgent updates or showing current content a bit longer to avoid a loading state.
- **Suspense** is the feature that allows intentional loading states with minimal developer work. It doesn't depend on Concurrent Mode but is enhanced with it. A version of Suspense, which only works with code-splitting already shipped in 2018.

I hope this makes things a bit more clear.

## Which features are in the pipeline?

Concurrent Mode is the groundwork that made the mentioned features—and more—possible. Let's go over those features to see how they will improve the perceived performance and user experience of our apps.

### Time-slicing

React used to have a recursive algorithm for processing updates and determining which elements must be updated. If you trigger an update that affects a large subtree, React will have a lot of work to perform, which blocks the main thread, resulting in a degraded user experience.

The algorithm responsible for determining what to update (called reconciler) was replaced with the Fiber reconciler, which allows React to perform its work in chunks. If you think about the reconciliation step as a long bar in the browser profiler, performing this work in chunks in a way "slices" this block of time into smaller ones. These smaller chunks have a better chance of fitting in ~16 milliseconds budget (if you're aiming for 60 fps) to leave time for the browser to perform important work.

Dan Abramov's [JSConf Iceland 2018 talk](https://www.youtube.com/watch?v=nLF0n9SACd4) (and [accompanying demo](http://timeslicing-unstable-demo.surge.sh)) about time-slicing is still one of the best references to date if you want to learn more about it.

### Scheduler

JavaScript is famously single-threaded. [^1] This means you are not supposed to do a lot of work in one synchronous chunk, this will cause the browser to skip frames and make the UI janky and simply unpleasant to interact with.

React will soon use a scheduler to prioritize more urgent updates like scroll and animation over background or offscreen tasks. Since React is a specialized UI library, it has enough information about which tasks are more urgent than others, and it will expose necessary APIs to let you express your intent.

Brandon Dail explains the importance of scheduling pretty well in his [ReactEurope 2019 talk](https://www.youtube.com/watch?v=Iyrf52cwxQI).

### Suspense

If your application loads data, which is true for most apps, this puts you in a dilemma. The first approach is to follow the component-driven development practices and make each component responsible for its data, which results in uncoordinated and jarring loading states. The other approach is to centralize data loading and make loading states intentional, at the expense of separation of concerns. Suspense lets you have the best of both worlds out of the box.

Using Suspense, you can let components own their data requirements and control the loading states without breaking encapsulation. When Concurrent Mode is added to the mix, React can also reduce the perception of slowness caused by loading states that stay for a very short time. This is done by working on an update that's waiting for data while keeping the current state of the UI in place.

While Dan Abramov's talk from earlier is great at explaining Suspense; Hooks were introduced later that year and made some Suspense APIs more natural to work with. Andrew Clark and Brian Vaughn's [talk from React Conf 2018](https://www.youtube.com/watch?v=ByBPyMBTzM0) paints a more up-to-date picture of Suspense.

### Server Components

If you have used server-side rendering long enough, you likely had difficulty ensuring that your components work both on the server and the client correctly. If you have a component that only makes sense to render on the client (that does its work in a useEffect hook, which only runs on the client) [you may accidentally shoot yourself in the foot](https://www.joshwcomeau.com/react/the-perils-of-rehydration/). On the other hand, if you need to use a server-side resource with React, you're completely out of luck. [^2]

Server Components solve this problem by letting you mark components as either "server components" that can only run on the server or "client components" that can only run on the client. You can have also "shared components" which cannot use any server or client-side logic but can be rendered anywhere. [^3] This has the additional benefit of never shipping the dependencies of server components to the client.

Note that server components are not a replacement for server-side rendering, and you can observe this in the [server components demo](https://github.com/reactjs/server-components-demo) by viewing the HTML source, which is an empty skeleton that is populated by React after it's loaded.

### Suspense SSR

Server-side rendering support is almost as old as React itself and it has gained streaming powers with React 16. But if a component has a data dependency, which is usually declared in a useEffect hook, this is skipped on the server and performed by the client. With Suspense support, the server-side renderer can now wait for components to load their data and flush them to the client.

The main power of Suspense SSR is to do out-of-order streaming. When React encounters a component that is waiting for data to render, instead of blocking the stream it can flush the placeholder for the nearest Suspense boundary and continue rendering. When the data is ready and the component can be rendered, this can be streamed to the client along with a small script to replace the placeholder.

Andrew Clark's [2018 talk](https://www.youtube.com/watch?v=z-6JC0_cOns) is an excellent illustration of the benefits of Suspense SSR.

### Progressive & selective hydration

Currently, when React is hydrating a server-rendered markup, this is done in one go. Following the Concurrent Mode approach, progressive hydration can split this work into chunks and parts of the page can become interactive before everything is loaded. This fixes one of the main problems of React, which is the slow [time-to-interactive](https://web.dev/interactive/) metric.

Selective hydration takes this one step further and as soon as React is attached to a root, it starts listening to events and uses this information to prioritize the hydration of subtrees that are being interacted with. Furthermore, thanks to event delegation, React can record those events and replay them when hydration is complete. This will result in pages becoming interactive faster without events being ignored.

Check out this [demo of progressive hydration](https://codesandbox.io/s/floral-worker-xwbwv) (and the [Twitter thread](https://twitter.com/dan_abramov/status/1200111677833973760) about it, with a mention of selective hydration in replies) to see how it works.

---

In short, these features will work together to make pages load faster, become interactive faster, and transition faster; while ensuring the interactions responsive and fast to the human perception.

## Part 2 loading...

I think it's funny that this article was not done in one go, though this was not my intention. It was in the making for too long and I wanted to publish a good enough part of it. In the next installment, I will talk about how other features released after Fiber connect with Concurrent Mode, what changes have been made that are not reflected on the experimental Concurrent Mode docs, and alternative approaches (and non-solutions) to the same problems React is trying to solve.

You can subscribe to my [newsletter](#newsletter) (or follow me on [Twitter](https://twitter.com/frontsideair)) to be notified when part 2 is out.

[^1]: If you don't count Web Workers. But they are limited, expensive to spawn or communicate with, and can have unexpected performance characteristics; so let's ignore them for a moment.
[^2]: Frameworks like Next.js let you expose a function to load the data for a route, but that doesn't compose well. If you have a component with data requirements that you use in all pages, this ends up leaking into all routes.
[^3]: The only new thing here is the server components, as the components we use today can be classified as either client or shared components.
