---
title: Finding the right database for serverless
date: "2020-05-18T14:51:44.609Z"
description: "The holy grail of serverless databases. Does it really exist?"
---

Serverless is taking the world by the storm. It follows a long series of improvements in software deployment and has many benefits over its predecessors. Maybe it has yet to prove its worth for enterprise, but for hobby projects and startups, it sits at a very sweet spot. [Netlify](https://www.netlify.com/) and [Vercel](https://vercel.com/) make it so easy to experiment and scale with zero-config infrastructures and generous free-tiers.

You can go a long way with static pages and CMSes but at some point, you may find yourself needing a database. There are many options out there with multiple dimensions of tradeoffs. I'll talk about my personal requirements and end with my choice for the side-project that I'm working on.

## PostgreSQL

This may sound like a strange requirement since it's the name of a database and there's only one database that fits the requirement. I could go for "relational" instead, but this was my actual requirement.

I want a database that's open-source and relational with no vendor lock-in. I also want it to be performant, have rich types, and rich extensions. Only PostgreSQL checks all the boxes. I can make some tradeoffs but this is the accumulation of some closely-related requirements.

## Globally-distributed

If my static assets and cloud functions are global, why shouldn't my database be? I want to be able to serve every user with comparable latency and be highly available.

## Multi-cloud

I don't want my website to be down if something happens to Google, Microsoft, or Amazon infrastructure. It might seem that the previous requirement covers this as well, but even if rare, a global downtime isn't something unprecedented. There's no reason to be stuck to one infrastructure.

## Pay-as-you-go with a free-tier

I don't want to start paying when there's a lot of time before the product is ready, and I don't want to hold off production deployments until the finish line is in sight. I believe in ["Hello, production"](https://blog.thepete.net/blog/2019/10/04/hello-production/) deployments.

## The competition

You see that there's quite a contradiction. PostgreSQL requirement is incompatible with the rest of the requirements, as it's inherently single-node. But there's hope! In my investigation, I found two possible solutions: an open-source extension to PostgreSQL ([Citus](https://www.citusdata.com/)) that makes it distributed, and a PostgreSQL wire-compatible open-source database ([CockroachDB](https://www.cockroachlabs.com/)) with distribution baked-in.

Citus seemed very promising, but the company behind it was recently purchased by Microsoft and it was integrated into Azure. Their pricing scheme was tied to the number of nodes. This coupled with it being a single-cloud solution makes it disqualified.

CockroachDB was also interesting. While it's not able to use PostgreSQL extensions, it could be an acceptable trade-off. But their cloud offering was also node-based and you could deploy on a single cloud provider; either Google or Amazon. This was also unacceptable to me.

Once you take full PostgreSQL compatibility out of the picture, there are somewhat PostgreSQL or MySQL compatible serverless offerings from all cloud providers; Google has [Cloud Spanner](https://cloud.google.com/spanner) and Amazon has [Aurora Serverless](https://aws.amazon.com/rds/aurora/serverless/). (Microsoft has [Azure Database with Hyperscale](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-service-tier-hyperscale), but it's just Citus rebranded, which we already covered.) As expected, each of them is single-cloud and unfortunately, they are not even serverless at all; you still pay per node.

With these also eliminated, although disheartening, we need to let go of PostgreSQL (or any SQL) requirement. (Which means there's a market gap for a PostgreSQL-compatible, multi-cloud, true serverless database. Free startup idea!)

In that case, let's look at the NoSQL offerings out there. Each cloud provider has its own globally-distributed key-value store, with all of them having a pay-as-you-go pricing. Amazon has [DynamoDB](https://aws.amazon.com/dynamodb/), Google has [Cloud Firestore](https://firebase.google.com/docs/firestore) and Microsoft has [Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/). Like earlier, they are single-cloud and proprietary with strong vendor lock-in.

At this point, there aren't many choices left. When you ask people what is their database of choice for serverless, you usually get one of these answers; Cloud Firestore (or Dynamo, or Cosmos), managed PostgreSQL on a single node (on [Google](https://cloud.google.com/sql), [Microsoft](https://azure.microsoft.com/en-us/services/postgresql/), [Amazon](https://aws.amazon.com/rds/) or [Digital Ocean](https://www.digitalocean.com/products/managed-databases-postgresql/)), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [FaunaDB](https://fauna.com/). We covered most of them already. Let's look at those we didn't.

MongoDB had its day once, then everyone hated it and now everyone's indifferent about it. I heard that many limitations it had are now fixed and Atlas is their brand new cloud offering. I don't have any experience with it and if I can't have PostgreSQL, I have no qualms with Mongo. But Atlas is also single-cloud; you need to stick to a provider (Google, Amazon, or Microsoft) and you pay per node. This leaves only FaunaDB. But is it any good?

I haven't used Fauna yet, but while it's not open-source, it has a GraphQL API; which makes switching easier and it's multi-cloud with a pay-as-you-go pricing model. It also has a free-tier, which is more generous than what Cloud Firestore offers. Technicals-wise it is relational, has ACID guarantees, joins, and authentication built-in, but sadly it doesn't have full-text search.

## Conclusion

While it's not perfect from every perspective, FaunaDB seems to be the best tradeoff for my needs and preferences. At least on paper. I'll share my experience once I spend enough time with it. Stay tuned and subscribe to the newsletter if you want to get updates to your inbox!

Correction: In the first version of this post, it was not clear that FaunaDB is relational and it was implied that there was no "relational, multi-cloud, true serverless" database. FaunaDB is not SQL; but it is relational, multi-cloud and true serverless. I regret the error.
