---
title: What I look forward to about web development in 2021
date: "2021-02-25T20:06:42.381Z"
description: "Web development is in much better shape than it ever was before. It's both easier to build products and the products we build are much more user-friendly. We see an increasing emphasis on performance, consistency, and accessibility. Here are some advancements in web development that I expect to see in 2021."
---

Web development is in much better shape than it ever was before. It's both easier to build products and the products we build are much more user-friendly. We see an increasing emphasis on performance, consistency, and accessibility. Here are some advancements in web development that I expect to see in 2021.

## Full-stack is going to be much more relevant

I expect the [JAMstack](https://jamstack.org) hype to die out this year. I think it's great that it exists and it's very suitable for some use cases. (My blog is proudly powered by [Gatsby](https://www.gatsbyjs.com)! But overall it was not a great idea to host your application exclusively on a CDN and a CMS.

Not everything can be done on build time and fetching all dynamic content on the client can leave a lot out. You would end up missing out on status codes, meta tags, caching, and perceived speed. That's where it would make sense to have a server (or a bunch of cloud functions).

The project that sold me on this idea was [Remix](https://remix.run), which is a new framework built on old (and good) ideas. Built by people who worked on [React Router](https://reactrouter.com), it embraces the web standards and encourages you to do the same. Unfortunately, it's not open source (good for them though, they deserve to get paid for their exceptional work) so I won't be able to try it out anytime soon.

Another such project is [Blitz](https://blitzjs.com) by my twitter-friend [Brandon](https://twitter.com/flybayer). It's aimed to be Rails for React and JavaScript. It's strategically built on Next.js and [Prisma](https://www.prisma.io) to bridge the gap between backend and frontend. It recently switched to beta so it's a good time to consider using it.

If you're not ready to switch yet, consider giving [Next.js](https://nextjs.org) a shot. It has great developer experience and with [Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html) on the horizon it's going to be more powerful than ever.

## We won't need bundling hopefully

[HTTP/2](https://en.wikipedia.org/wiki/HTTP/2) is finally here (for about 5 years) which was supposed to make bundling redundant, so why are we still bundling? Turns out it's not as simple as it looks, [according to](https://blog.khanacademy.org/forgo-js-packaging-not-so-fast/) engineers at Khan Academy. But there are good ways to unbundle [according to](https://medium.com/@asyncmax/the-right-way-to-bundle-your-assets-for-faster-sites-over-http-2-437c37efe3ff) others.

On the other hand, the first-time load shouldn't be our only concern, repeat loads should also be fast. (Wasn't this kind of the point of service workers?) If you bundle, the tiniest changes made cause the bundle to be invalidated. But if you serve assets at the module level, then you can benefit from the browser cache.

The good news is that [browsers are capable](https://caniuse.com/es6-module) of loading scripts as modules. Better yet, many CDNs like [Skypack](https://www.skypack.dev) and [JSPM](https://jspm.org) serve npm packages as modules. So we don't need node_modules or webpack anymore?

Unfortunately during my tests, I found out that TypeScript doesn't support loading modules from URLs. But I hope to see improvements about this in 2021. (One solution is to use [Deno](https://deno.land), which is awesome.)

## CSS-in-JS is going to become even more interesting

Currently, my favorite CSS solution is [Tailwind CSS](https://tailwindcss.com). Not because it's technically superior to others, but because it has great documentation and is batteries-included. But it has a major drawback, which is its file size.

This is a solved problem, of course, you're supposed to [purge](https://tailwindcss.com/docs/optimizing-for-production) the styles you don't use. But this leads to the cache-invalidation-with-every-tiny-change drawback. I hope to see a new and exciting solution to this problem in 2021. I will continue using Tailwind until I find such a solution though.

In my mind, an ideal solution would be to use top-level CSS variables as design tokens and write (scoped) vanilla CSS for low-level components only. I will have more to tell about this later, hopefully.

## More progressive enhancement, please

I like what Next.js and Gatsby do with the `Link` and `Image` components. They have super-powers when (or if) JavaScript loads, but they still work even if it doesn't. I wonder why don't forms work like that?

If you want your website to be responsive even before the scripts are loaded, you should build on web standards. (And you should [care about](https://web.dev/fid/) this.) I don't think there are a lot of people who disable JavaScript and expect everything to work. Not every website is a document anymore, many would not be functional without JavaScript. But many websites are kind of like that and there are a ton of people who have slow internet speeds; they should not wait multiple seconds to interact with your site.

I have reason to believe that Remix is actively working on this and hope Next.js will follow.

# Conclusion

As you can see, a central focus of my expectations boils down to simplicity and an adherence to standards. I think these concepts go hand in hand and web development will greatly benefit from them, both developers and end-users.
