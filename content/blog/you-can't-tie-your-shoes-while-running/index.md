---
title: You can't tie your shoes while running
date: "2020-05-27T10:24:24.765Z"
description: "Boy scout rule is taken as gospel in software engineering, but while good intentioned it actually can be harmful."
---

You may have heard of the boy scout rule; if you haven't, it goes like this: "Leave it better than you found it." Here it is presented in the context of a software project. This makes sense conventionally; if you make a small part better consistently, the whole will get better in the end. In this post, I will challenge that.

First of all, this conventional wisdom assumes that there is a single universal definition of "better"; but there isn't one. If you work on a project as a team–which is almost all of us–it's really hard to get everyone to agree on something; be it the definition of clean code, or even the type of whitespace to be used for indentation. If you are in the minority who doesn't work in a team, you're not safe either. We are always evolving and what you thought was better a week ago doesn't necessarily hold true the next week.

Let's assume you have excellent communication within the team and you commit to your decisions; so you established a single source of truth for what "better" means, even for a single aspect of code. This is by no means impossible, but it still isn't a good idea to follow the boy scout rule. Say you communicated a best practice to the team, and decided that instead of stopping the world to do it at once, you should keep doing the tickets and do the improvement as you touch the code. I suggest that this will never be done and be a mental burden for the team forever, leaving the codebase in an eternal state of flux.

It's easy to imagine that if you keep doing the improvement as you touch the code, at some point you'll cover the whole codebase. This is a wrong assumption. Some parts of the code are never touched until the project is rewritten or gone out-of-commission. We don't care about what will happen eventually, we care about making the code better now.

Even if it was possible to apply an improvement incrementally over the lifetime of a project, it still wouldn't make sense. Because there won't be a single improvement over that lifetime, there will be a bunch of them at the same time and while it can be possible to keep one in mind, it's not humanly possible to juggle many of them. Your codebase will be a graveyard of many ways of doing something.

One underrated quality of every codebase is consistency, the law of least surprise. At any point in time, you want everything to be consistent. Business requirements are hard already, you don't want to take on more challenge by adding different paradigms into the mix.

At this point you may be on board with everything I said, but you're still reluctant to stop the world and ignore business needs until you're done. Unfortunately, _you can't tie your shoes while running._ I'm not saying that you should do your improvements secretly, communicate this need to business. Technical debt is a reality of the world and it slows down development to a halt. It's your responsibility to take the time to pay it back and increase the speed, don't expect it to come from business.

One reason I believe the boy scout rule sounds lucrative is that in a large team, it's hard to communicate a best practice to everyone involved. You know in your heart that doing things the current way is bad for everyone, but you don't feel up to the task of getting everyone on board. Maybe because there are too many people, maybe you don't feel senior enough. So you just sweep around your own front door and feel like you made a positive change. But remember this, for the next person who reads your code, they'll see two different ways of doing the same thing and they will be confused.

There's this [Nasreddin Hodja](https://en.wikipedia.org/wiki/Nasreddin) tale where the Hodja loses something inside his home but he searches for it outside. When asked by someone why he is not searching inside the house, he tells that it was too dark in there. Similarly, when we find a problem too hard, sometimes we switch to a problem that we know we can solve. In this case, communicating a change is the hard one, and boy scout rule is the easy way. But good intentions don't necessarily produce good results.

So when you think it's a good idea to change something for the better, discuss it with your team, communicate it to business and do it in one fell swoop. Don't make it into yet another tech debt that shackles you down.
