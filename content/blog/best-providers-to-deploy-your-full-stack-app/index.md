---
title: "Best providers to deploy your full-stack app"
date: "2023-08-02T22:14:25.991Z"
description: "It's hard to deploy an app or depend on a slew of providers that may not be around in a year. Let me list a few reliable options that solve my problems."
---

This is an opinionated selection of deployment options for full-stack JavaScript applications. I've been researching this for a while and finally feel like I have come close to a conclusion. Of course, this is not final and I may—and most likely will—change my mind in the future.

We have a lot of good options for writing a full-stack JavaScript application. [Next.js](https://nextjs.org) and [Remix](https://remix.run) are excellent frameworks that beautifully marry backend and frontend concerns. It's a delight to write applications using them. But that's only a part of the problem. You also need to persist and cache data, store blobs, and perform scheduled or delayed execution. Suddenly you have to start caring about migrations, seeding, end-to-end testing, and so on.

You're lucky if your app is static. There are many robust options for deploying a static web application, it's a solved problem. If you have API routes or server-side rendering, we have good options as well, powered by function-as-a-service and edge-computing technologies. But the rest of the stack hasn't caught up to the same degree.

## Evaluation criteria

Let me detail my checklist of desired features first, on which I will score the viable options I will list next. These are things that I find necessary and may not fit others' use cases.

1. Serverless compute

I don't want to manage servers, think about scaling or cold starts, or pay for unused resources. Solutions for serverless or edge computing have matured and it fits the request-response model well. Even containers are too heavyweight for my needs, but they have their pros too. AWS recently launched [response streaming for Lambda](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/), which was the final missing piece for serving performant web applications.

2. Serverless relational database

The reluctance to manage my servers applies here as well. The most recent technological leap in this space was separating storage and compute is gaining in popularity, and makes your application more performant and available while lowering the costs. [AWS Aurora](https://aws.amazon.com/rds/aurora/), [PlanetScale](https://planetscale.com), and [Neon](https://neon.tech) are all great options built on the same principle.

I specifically mentioned "relational", because I don't want to be locked into a technology like DynamoDB. PostgreSQL, MySQL, and SQLite are great open-source options that allow you to use world-class query builders like [Prisma](https://www.prisma.io), [Kysely](https://kysely.dev), or most recently [Drizzle](https://orm.drizzle.team).

3. Blob storage

In this day and age, it's near impossible to not have uploads in your application. It's always an option to store things in block storage or your database, but it's not as performant, reliable, or cost-effective as using blob storage. S3-compatible APIs have become the de facto standard and adopted by open-source solutions like [MinIO](https://min.io) and [Garage](https://garagehq.deuxfleurs.fr), so it's easy to avoid vendor lock-in.

4. GitOps

I have been using Vercel for far too long to fully understand what I was missing about the term GitOps. I can push to my repository and the Vercel GitHub plugin picks up my changes, runs my build command in CI, and deploys it automatically. The same pipeline runs when a pull request is created, so I can have [preview deployments](https://vercel.com/docs/concepts/deployments/preview-deployments) that I can use to test my changes. I don't want to lose this luxury if I switch to another provider.

5. Observability

Having a type-checker, tests, and lint rules is awesome and can give you a lot of confidence. But you should be able to observe the health and metrics of a running system so you have some idea about what's going on and can have insight when things inevitably go wrong. Logs, metrics, tracing, health checks, and alerting are some of the most important observability tools that you simply must have. Analytics are similar but can give you business insights instead of operational ones.

6. Transactional emails

Email is here to stay and it's hard to imagine an authentication solution that doesn't send transactional emails. In the same vein of avoiding vendor lock-in, an ideal email solution gives you an SMTP endpoint that you can use via an off-the-shelf library and can swap out during local development and testing.

7. Local/offline development

While I agree that dev/prod parity is impossible, there's still an immense benefit to being able to raise a full-stack application locally for development and testing. In an ideal world, you could ship your whole local environment to the cloud, but I will take online local development over see-your-changes-after-you-merge any day.

8. Price

The best things in life are free. A generous free tier is a must, and after you start turning a profit, it shouldn't break the bank. Ideally, you should be able to put a spending limit, accepting downtime over infinite costs.

---

There are things that I didn't mention such as a key-value store, message queues, domain management, etc. These are also important things, but I wanted to keep the list short and only have the essentials. Many of the missing items are already available on my candidate providers.

I also didn't specifically mention longevity, but I simply didn't include any provider that likely won't be around in 5 years. Startups are great, but they are bets and you don't want to build your business on their success.

## Providers

### Vercel

[Vercel](https://vercel.com) is simply the gold standard in serverless computing and GitOps. And they have a pretty good [integrations marketplace](https://vercel.com/integrations) that eases the pain of finding and integrating solutions they don't provide. They also offer a very generous free tier, but I heard that [it gets expensive](https://medium.com/@sushrit.pk21/how-when-and-why-you-should-switch-from-vercel-to-a-different-hosting-provider-especially-for-8ba25e439788) when you need to scale up.

However, Vercel wouldn't make the shortlist if they didn't expand their storage solutions; [KV](https://vercel.com/storage/kv), [Postgres](https://vercel.com/storage/postgres), and [Blob](https://vercel.com/storage/blob). Two of the three are powered by partners; KV by [Upstash](https://upstash.com) and Postgres by [Neon](https://neon.tech). (To my knowledge, Blob is homegrown.) The good news is, they are included in the free tier. Similarly, their [acquisition of Splitbee](https://vercel.com/blog/vercel-acquires-splitbee) helped them expand into web analytics and their [announcement of monitoring](https://vercel.com/blog/introducing-monitoring) shows they are serious about becoming a one-stop shop for everything you need for your app.

Some notable missing pieces are emails and local development experience. For emails, you can either use one of the many 3rd parties for email delivery or use the [`vercel-email`](https://github.com/Sh4yy/vercel-email) package and piggyback the [partnership between Cloudflare and MailChannels](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/). Local development still poses a serious problem, as neither email nor Blob uses standardized APIs and protocols, and serverless functions may also behave differently in some cases during development.

Despite some drawbacks, Vercel seems like a much more complete provider than it was a year ago, and they have serious momentum to do much more. Although some of the solutions mentioned are not generally available as I'm writing this, it's only a matter of time.

### Cloudflare

[Cloudflare](https://www.cloudflare.com) has been steadily expanding their developer platform for years now and with their [announcement of D1](https://blog.cloudflare.com/introducing-d1/), they are closer to becoming a dream provider than ever. It's also welcome that they [merged their Workers product into Pages](https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience/) so there's no more overlap and confusion.

Workers, Cloudflare's serverless computing solution, is one of the first edge computing services ever, and it's already powering other services like Vercel's edge functions. [R2](https://www.cloudflare.com/developer-platform/r2/) is their S3-compatible blob storage, and for email, you can make use of their [partnership with MailChannels](https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/). And [Pages](https://pages.cloudflare.com) ties all the services together so you can push to deploy with its GitHub integration and [observe the metrics](https://developers.cloudflare.com/workers/observability/).

What sets Cloudflare apart in my eyes is their commitment to [offline development](https://developers.cloudflare.com/pages/platform/functions/local-development/). They open-sourced [the engine that powers Workers](https://github.com/cloudflare/workerd), and their command line tool, [Wrangler](https://developers.cloudflare.com/workers/wrangler/), runs everything locally, as close to production as possible. (Except for email, which is not a product they offer.) They are also famous for being affordable [^1][^2] with a generous free tier. Now we only have to wait for D1 to reach general availability.

### Amazon Web Services

It would be a massive omission if I didn't list [AWS](https://aws.amazon.com) here. They offer [every service you can imagine](https://aws.amazon.com/products/) and more. They have an [excellent track record](https://twitter.com/rakyll/status/1671354533375795200) for maintaining their products, [unlike a certain cloud provider](https://blog.pragmaticengineer.com/google-domains-to-shut-down/). Nothing is missing in their vast catalog.

However, AWS is also famous for being complicated to use. Their demo full-stack app has [3,000 lines of infrastructure configuration](https://github.com/aws-samples/aws-bookstore-demo-app/blob/41838c0/template/master-fullstack.yaml). Using [CDK](https://aws.amazon.com/cdk/) or [Terraform](https://www.terraform.io) may ease the pain a little bit, but you still have to wrangle the low level, close to the metal infrastructure. (Well, there's [Amplify](https://aws.amazon.com/amplify/), but it's nowhere near my requirements, stuck in a [limbo of jamstack](https://remotesynthesis.com/blog/goodbye-jamstack/).)

Or, you can pay another company to do it for you. There are many to choose from like [Seed](https://seed.run), [Flightcontrol](https://www.flightcontrol.dev), [Begin](https://begin.com), and [Serverless](https://www.serverless.com), with more cropping up each day. Many of these solutions also provide GitOps for you so you can push to deploy with peace of mind, and many of them provide some form of local development too. It's anyone's guess though, if they'll provide the same stability AWS offers.

### Honorable mentions

Heroku was ahead of its time and was [effectively killed off by Salesforce](https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/). But Heroku inspired a generation of providers to fill the gap it left, which may be viable options for you if you have a different checklist than mine. Here's a whirlwind tour:

[Fly](https://fly.io) deploys serverless containers globally and has pretty interesting solutions for global databases. [Render](https://render.com) is a simple solution with clear pricing, for containers and managed databases. [Supabase](https://supabase.com) focuses on the backend, leaving you to use a solution like Vercel for the frontend. [Deno Deploy](https://deno.com/deploy) recently [announced its KV product](https://deno.com/kv), moving them one step closer to becoming full-stack.

## Conclusion

I tried to evaluate cloud providers based on my current requirements, and their current and future offerings, as fairly as possible. I can't say I've used every single one of them to the full extent, I don't have that kind of time. I'd be delighted to know your experiences if you'd like to share them.

This is an exciting time for full-stack engineers to expand their horizons into the devops world, with providers adding more products to their portfolios and better tools emerging every day. I believe it's important to own every part of the stack and use state-of-the-art tools and conventions while doing so. If this trend continues, I hope every full-stack engineer will be able to put their apps on the internet, ensuring they are available, scalable, and performant.

Note: No AI was used while writing this post.

[^1]: https://blog.cloudflare.com/cloudflare-registrar/#the-cloudflare-registrar-promise
[^2]: https://r2-calculator.cloudflare.com
