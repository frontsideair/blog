---
title: Local procedure calls and static microservices
date: "2020-04-12T09:35:40Z"
description: "Maybe there's a solution between a microservice and a monolith."
---

> Uber in 2016: “We have thousands of microservices.”
>
> Everyone: “That sounds insane."
>
> Uber in 2020: “It turns out that was insane.”
> <cite>[Ben Sandofsky](https://mobile.twitter.com/sandofsky/status/1247629388104880129)</cite>

Say you have a microservice and you need to use a functionality from another microservice, like sending an email or processing a payment. How do you do it? Either you call an API or you send a message. We have a lot of design concerns to do that reliably, like idempotency keys, and a lot of logging and monitoring goes on to see if it's working correctly. That's a fact of life and other than building better tools we don't have anything to do about it.

Or do we? Let's think in abstract terms. You want to perform an action from your service, but don't want to implement it yourself. There may be other dependents on it or maybe it's another team's responsibility. Technically, that's a function (or procedure) call. And when you need to perform it remotely, we call it a remote procedure call, or RPC. But the problem here is the remote part, because when the network is involved, there's latency and error handling. Also everything's untyped and you need to generate documentation to circumvent their absence.

But what if you could call a procedure, and instead of being on another machine... it was on your machine? Crazy, right? Separating a functionality as a microservice against keeping it in the same codebase is a false dichotomy. You can extract functionality as a library and any service that depends on it can import and use it. Think of it as a _static_ microservice. It doesn't run on a server listening to messages, it becomes alive when you call it and it goes back to sleep when it's done.

Of course it's not a silver bullet. There are legitimate reasons to use a microservice instead; like predictable performance, resilience, ability to scale separately, security, monitoring... We can discuss all day which of those reasons are needed for _your_ service. But for many use cases, we're unnecessarily turning to microservices. Probably we're conditioned to, as there's a big push to make everything a microservice and it's hard to not get affected. It bears repeating that we can get some of the most crucial benefits of microservices by moving some functionality to its own repository.

Ultimately, you should consider if the solution to your problem is really a microservice or can you get the same done with a library? Microservices are not free, not in terms of maintenance burden they bring, and not in the literal sense. At the very least, go with a library first and see if that solves your problems, and think about introducing a microservice only if it doesn't. Since you'll already have most of the business logic, it won't be wasted effort.

_Thanks to [Dogan](https://mobile.twitter.com/sepet) for proofreading._
