---
title: "Teach yourself Kubernetes in 15 minutes or less"
date: "2021-10-16T09:04:17.862Z"
description: ""
---

It was a couple of years ago. I kept hearing Kubernetes so much, I thought maybe I should learn what it is. I googled "what is kubernetes" and the answer was that it's a "container orchestration" solution. Nothing. Doesn't make any sense. And I already am familiar with Docker and I know what a container is.

I dug deeper, because I was not content, and I have this ailment where if I don't understand something I bash my head against it repeatedly until I do, or give up for a few months and come back to it once again to repeat the process... Okay, looks like it's about deployment, scaling and management of containers. I know all of those things! (Management kind of covers the other two, but I'll let it slip.) But... how?

This is where things start to go downhill. Because unfortunately, when you ask the question "how", it can mean different things to different people. When I'm learning about something new, I'm curious about how does it work in general terms, and more importantly how does it help me. But to people who has experience with it, who tend to be the ones writing the documentation, how means how it works and how it's used. Those are the last things I have in my mind, because I'm not familiar enough with the product to be asking those questions, or make sense of the answers.

There's also marketing. Before I understand what Kubernetes is, I already know that it's built upon 15 years of experience Google had, which global and successful companies use it, and how the organization is governed.

Well, the best way to understand something is to use it, right? Following an interactive tutorial would surely help! I don't know if you are familiar with the term "tutorial hell" but let me say that deploying a toy application to a toy Kubernetes cluster while following instructions doesn't really teach you anything. I was just going through the motions, lost in terminology, and at the end felt a forced sense of accomplishment, while feeling no more enlightened than before I started.

I'm sorry I picked on Kubernetes, it could be any tool or technology, or any topic at all. It was just a tough nut to crack in my case, and a good case study. You may be wondering, did I learn what Kubernetes is and if so how I learned? (Some of you may even want a simpler explanation!) I can't say I _know_ Kubernetes (in The Matrix sense) and I haven't used it in production, but I can say I have a better idea about what problems does it solve and how does it solve them.

I think how I came to that understanding is by learning less about Kubernetes and more about the rest of the ecosystem. I could never understand it by trying to solve my non-existent scaling problems. But I could imagine that I wanted to build a website and deploy it. I could build with Docker since I know how to use it, and deploy it to any cloud provider. Then I can imagine what would happen if I had really high traffic, how would I scale up and down, how would I structure my service for changing requirements, how would I recover from a bad deployment, etc. I could solve all of those by myself, but these problems are so common, it's better to use a tool and configure it to your business use case. And this is how I understood the value Kubernetes brings.

How it works is a whole lot more complicated, both due to the complexity of the problem itself, and the architecture and terminology of Kubernetes. I have a vague idea about the first, and zero clue about the second. But many people couldn't care less about how it works, as long as it does its job.

Anyway, my point was not to explain what Kubernetes is. It's just so hard to learn about a complicated topic, and the teaching tools and mindset we have are not up to the task. But we're getting there, as there are movements to improve documentation structure, like [the Divio system](https://documentation.divio.com).

The important thing in my opinion is for people writing documentation to not lose the beginner mindset. I often find myself guilty of this. It's really hard to empathize with someone who's just starting, but if we don't target them then who are we writing the documentation for? A good solution would be to note down your own experience while you were learning, so you can empathize with your past, struggling self. (Or better yet, [learn in public](https://www.swyx.io/learn-in-public/) so anyone can see.) In conclusion, being mindful of the ways to structure documentation, understanding the different meanings "how" can have for people at different stages of learning, or taking documentation seriously in general can be very helpful.
