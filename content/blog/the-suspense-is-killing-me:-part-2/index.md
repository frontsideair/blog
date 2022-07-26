---
title: "The Suspense is Killing Me: Part 2"
date: "2022-07-24T21:47:59.364Z"
description: "Part 2 in the saga of Concurrent React and Suspense; going over what got shipped in React 18, what comes next, and how it all fits together."
---

I have to admit, I didn't intend to put a year between two parts to create... suspense. Yet, here we are. The past year was full of updates and most importantly, [React 18 is shipped](https://reactjs.org/blog/2022/03/29/react-v18.html) with some of the features I mentioned in the previous post.

Let's quickly go over some of the most important things that happened in the last year and what got shipped.

## What happened in the meantime

### React 18 Working Group
React team created this [discussion board](https://github.com/reactwg/react-18/discussions) to announce updates and gather feedback from community leaders. It provided a lot of in-depth information, and the feedback received shaped some APIs to have better ergonomics and support unforeseen use cases.

### React 18 Release
Around a year after the announcement of the working group, and after a few prereleases, [React 18 was released](https://reactjs.org/blog/2022/03/29/react-v18.html) as stable. It came with important features such as streaming SSR with Suspense, transitions API, automatic batching, and a few new hooks.

### A new React Labs post
React Labs was announced before my last post, providing architectural deep dives in video format. It didn't receive any updates, but a blog post featuring active exploration areas [recently come up](https://reactjs.org/blog/2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html) in React blog.

---

With all these, we now have a more complete vision of the React team and what's coming next. In the first part, I mentioned some of the most exciting features that I expected to land with React 18. Some of them actually landed, others were pushed back, and there were features that I didn't even know about. So, first let's go over the important features that are new in React 18.

## What's new in React 18

### No more Concurrent Mode
The now removed React docs about concurrent features mentioned three modes: Legacy, Blocking, and Concurrent. This distinction didn't land in React 18, in favor of [enabling concurrency only in subtrees](https://github.com/reactwg/react-18/discussions/64) that use those features, for backward compatibility. If you don't use concurrent features, your React app will work and behave as before.

### Transitions
This is one of the aforementioned concurrent features. While state updates will keep working the same as before, you can mark a state update as a ["transition"](https://github.com/reactwg/react-18/discussions/41), by wrapping it in a `startTransition` call to let React know that it is not an urgent update and more urgent updates are allowed to interrupt it. A non-urgent update is rendered concurrently, so, as a bonus, it enables time-slicing. You can use the hook version (`useTransition`) to show the user that an update is pending, or use the `useDeferredValue` hook to achieve a similar effect when you have no control over setting the state. (Transitions are opt-in for now but they may become the default in the future, by inferring the priority from the event type.)

### Streaming SSR with Suspense
This landed without any changes since my last post, but let's do a quick refresher. Server-side rendering was a sequential process, where each phase blocks the next one. With [Streaming SSR](https://github.com/reactwg/react-18/discussions/37), React uses Suspense boundaries to create chunks that allow pipelining of the SSR process. This will allow the HTML to be streamed before all of it is rendered, and the hydration process can start before the HTML is completely streamed. In the future, when Suspense for Data Loading is shipped, React will also be able to skip suspended subtrees to prioritize whatever's ready, while streaming and hydrating. Currently, it works while hydrating, only if you have code-split components with `React.lazy`. But React frameworks like Next.js and Remix are getting ready with this, so you can expect to reap the full benefits soon.

### Selective Hydration
This ties in with Streaming SSR, as hydration is no longer an interruptible process, [selective hydration](https://github.com/reactwg/react-18/discussions/130) improves the first input delay metric if you have some suspense boundaries in your tree. React can also prioritize subtrees that the user interacts with, and replay events after hydration is done.

### New hooks
Apart from the transition-related hooks, we have a few interesting ones. `useId` can be used to [generate IDs](https://github.com/reactwg/react-18/discussions/111) that are stable across the client and server.

### Automatic batching
This is one of the least interesting features, but [React is smarter about batching](https://github.com/reactwg/react-18/discussions/21) state changes happening outside event handlers, which will result in a single render when a user interaction causes multiple `setState` calls.

---

Now, I want to spend a bit of time on the why. Why did we get these features, and why these particular ones at the same time? This keeps getting lost in the messaging, but it's important to us as developers to understand the reasons behind these features and how they are all tied together.

## The why and the how

### Sometimes things are slow
A user interface needs to be fast to delight the user, but sometimes there's nothing we can do. Maybe it's because the user's connection is bad, or the device is underpowered. It's still on us to make the experience as smooth as possible. One thing we take for granted is that most users are okay with waiting a bit, only if you don't break their expectations.

### Loading states are part of your design
If a component is slow to render for any reason, you may end up showing a fallback UI, like a spinner. These loading UIs are separate from which components cause the slowdown; there may be many components with data dependencies down the render tree but it may make more sense to have a single placeholder at the top for your design requirements. Suspense is the feature that allows this, letting you declare your loading UIs wherever you want, similar to how a `try/catch` block allows you to control where you catch exceptions.

### Showing consecutive spinners is bad
Even if you have carefully placed loading states in your UI, you may still introduce a bad user experience, if many loading states follow each other with short delays, making it feel slower than it actually is. React automatically fixes this using a psychological concept called ["just-noticeable difference"](https://en.wikipedia.org/wiki/Just-noticeable_difference). React can use heuristics to throttle successive loading states a little bit more before showing spinners to reduce this perception of slowness.

### Not all loading states are the same
One of the biggest problems with single-page applications today is the lack of feedback on navigation. Nobody likes to second guess if they clicked a link or not if the next page takes a long time to load. They would prefer to see a skeleton as soon as possible. On the other hand, if you were only refreshing the data, you wouldn't want the existing content to disappear. React may differentiate the two in the future, but right now it gives you the Transition API to keep the existing content while React is blocked on the next view. You can add loading indicators to improve the user experience even further.

### Not all events have the same urgency
We already talked about how some things are slow, and a user may change their mind while things are loading. They may click a tab in a tab switcher and then click another before the first one loads, or type in a typeahead while it eagerly fetches results. In either case, while the user input was being processed, some more urgent update came and we must make a choice. We can either continue processing the old input and make the UI unresponsive, or we can discard the old work. Previously, the second option was not possible at all. Now, we can use the same Transition API to mark some updates as non-urgent and interruptible. React can interrupt these transitions and discard the incomplete work to prioritize more urgent updates. React may make this distinction automatically in the future, depending on the event type, but right now this is opt-in and all updates are assumed to be urgent.

### How it all ties together
The objective here is to improve the user experience. In recent years, we moved a lot of logic from backend to frontend, while reimplementing things that ended up breaking user expectations in surprising ways. React tries to fix this by introducing two core APIs, Suspense and Transitions. Suspense allows developers to declaratively define loading states, which React uses to match user expectations, improve the perception of speed, and aid the streaming of server-side rendering. Transitions allow developers to mark events as non-urgent, helping React schedule updates more intelligently and interrupt them as necessary. Together, they can improve many pain points that modern web applications introduce.

---

If I've done my job correctly, you should be excited and wondering how can you start integrating these features into your application today. I'm really glad if this is the case, and these are the steps you need to follow.

## Steps to upgrade

### Upgrade your application to use React 18
The React blog [has an excellent post](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html) to help you upgrade to the latest version. You need to bump your dependencies and change a few entry points, if everything goes well your application will be on the latest version without any problems or behavioral changes.

### Run your application in StrictMode and check your effects
One thing you need to be careful about is that [StrictMode](https://reactjs.org/docs/strict-mode.html) on development [runs your effects twice](https://beta.reactjs.org/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development). This is to catch bugs before they end up in production. (They will run once in production.) If your effects had correct dependencies and cleanup behavior, this shouldn't cause any problems; otherwise, it's a good opportunity to make necessary fixes. If you are confused about effects, you're not alone and the [beta React docs](https://beta.reactjs.org/learn/synchronizing-with-effects) should help.

### Start using Suspense and Transition APIs where necessary
Remember that Suspense currently only works with code-splitting and chunking for SSR and hydration, and it should be dictated by UX-centric design. Transitions, on the other hand, should be used to make CPU-intensive updates more responsive. In the future, however, you can expect Suspense to be baked into your design system, and Transitions will be baked into your router or metaframework.

---

This has been a long journey, and it's yet to finish. We have a few more exciting features down the road, and I'd like to briefly touch on each. With these also shipped, we can finally see the Concurrent React vision in its glory and the ecosystem can catch up with it. We may see component systems, state management libraries, and frameworks implement these APIs under the hood, giving us even higher-level abstractions.

## What's next

### Suspense for Data Fetching and Cache
The missing piece of the Suspense story is data fetching, and the Cache component will allow data libraries to cache data that's compatible with Suspense and concurrent rendering. React I/O wrapper libraries were being built to interact with Suspense and Cache, but it seems like this approach was abandoned in favor of using async/await for better compatibility.

### React Server Components
I have written about this in the previous part, but essentially this feature allows React to run on the server. This is fundamentally different from SSR, which prerenders your entire view tree on the server and hydrates on the client using the same code. Server Components, on the other hand, will exclusively run on the server, and their code isn't shipped to the browser, so they don't get hydrated either. JavaScript-heavy and data-fetching components make the most sense as server components.

### Suspense for Asset Loading
Another area that Suspense can help with, other than code and data, is asset loading. Images, stylesheets, and fonts cause layout shifts and disorientation when they load. React will soon support coordination of these assets with Suspense, allowing you to reuse the same throttling heuristics we mentioned to reduce the perception of slowness.

### React Optimizing Compiler
When your app is slow and there are too many unnecessary re-renders, it's not straightforward how to tackle this problem. React Optimizing Compiler, which was [first demoed at React Conf 2021](https://www.youtube.com/watch?v=lGEMwh32soc), will work by automatically inserting memoization hooks to improve the performance of your app, requiring no intervention on your part.

### SuspenseList
When you have a list of Suspense boundaries, such as articles, comments, or messages, the order they resolve matters to the user experience. SuspenseList component will allow coordination of its children, letting you to determine the order they reveal.

### Offscreen API
One of the most interesting things that Concurrent React allows is the ability to retain the state of an unmounted component. This unlocks so many features, one pretty exciting feature being that React will be able to pre-render a transition that a user will likely perform. Think of prefetching the resources for a route on link hover, but React can start rendering without displaying anything, making the transition even snappier. Or, React can deprioritize content that is not in the viewport, while keeping it mounted. I will have more to write about it once we have more details.

---

The last thing I want to touch on is where these features lie in the greater landscape. There are many view libraries and frameworks, each pursuing a different goal. It's a good idea to look at the big picture and see why React is working on these particular features and not others.

## The big picture

### Streaming server-side rendering
React is an old library, but it's not the first to pursue streaming SSR. [Marko](https://markojs.com) has had streaming SSR support [since at least 2014](https://tech.ebayinc.com/engineering/async-fragments-rediscovering-progressive-html-rendering-with-marko/), and before that Facebook was using a similar technique called [BigPipe in 2009](https://www.facebook.com/notes/10158791368532200/). It makes sense to flush as early as possible, so further steps in the pipeline can start to work earlier, improving responsiveness. This is also a CPU microarchitecture technique known as [pipelining](https://en.wikipedia.org/wiki/Instruction_pipelining), making our computers faster.

### Islands architecture
Server-side rendering is considered a net win, but synchronous hydration blocks the main thread for large apps, hurting responsiveness. [Islands architecture](https://jasonformat.com/islands-architecture/) is a solution to this, adopted by many frameworks, such as [Astro](https://astro.build). React solves the same problem by making hydration interruptible; if you combine this with a progressive framework like [Remix](https://remix.run), you may enjoy your DX without any of the UX drawbacks.

### Fine-grained reactivity
This is another optimization method gaining popularity across many frameworks, the most prominent being [SolidJS](https://www.solidjs.com). React, despite its name, is not reactive; a state change results in a subtree being marked as dirty, a reconciliation step performed, a diff generated, and applied to the view. Fine-grained reactivity, on the other hand, maps view changes directly to value containers; when you change the state, it's known beforehand which views will be changed. This reflects well on the benchmarks, reactive frameworks tend to perform better in terms of raw speed. But [Dan Abramov wrote on this topic back in 2019](https://overreacted.io/react-as-a-ui-runtime/#raw-models), making a convincing case that the React team thought about this and chose not to pursue it. While that may have been the correct choice at the time, React Optimizing Compiler can be seen as a step in the reactive direction.

### Scheduling
Yielding to more urgent work with the Transition API is not a new technique either, [Google Maps is another example](https://github.com/WICG/scheduling-apis/blob/c0d033ce2352fa78dfc061242ebb04dc33223ab5/misc/userspace-schedulers.md#case-study-1-maps-job-scheduler) where a similar architecture is used for touch responsiveness on the web. Main thread scheduling on the web is an unsolved problem but there is [ongoing work](https://github.com/WICG/scheduling-apis) to make it available as standard APIs.

### Server-rendered components
React Server Components is not a new idea either, Elixir land had a similar solution back in 2018 called [Phoenix LiveView](https://github.com/phoenixframework/phoenix_live_view). With this, they could achieve zero-JS interactivity with server-side state and rendering. React, however, gives you a lever, so you can render some components on the client and some on the server, as you need.

---

If you have come this far, congratulations! This was the result of months of research, deep dives in React Working Group discussions, going through pull request descriptions, watching hours of technical talks, and reading way too many Twitter threads. I wanted to take a peek behind the curtain and see what went into years of exciting work, and I wrote this for curious minds like myself.

As a treat, here's some trivia regarding the internal subproject codenames in the React project:

- Fiber was the codename for the core rewrite, enabling asynchronous rendering
- Fizz is the codename for the new server-side rendering architecture
- Flight is the codename for Server Components; it was previously called Blocks, and Chunks before that
- Fire was the discontinued initiative to modernize React DOM
- Flare was a subset of Fire to modernize the event system, which was also killed
- Codenames mostly start with the letter "F"

If you liked this, [follow me on Twitter](https://mobile.twitter.com/frontsideair) for upcoming installations to the series. I will keep following the React development and share my insights with you.