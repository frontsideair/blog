---
title: A Summer Spent Studying, Part II
date: "2014-10-01T17:38:34.964Z"
description: "...and the motivation for my first project, Dropbox Window"
---

When starting a fun project, it’s essential that you’re doing it to scratch an itch you have. It goes without saying, but let’s just say it: you’ll need every reason to motivate you see it through, and as an upside you’ll know the exact use cases and you’ll be able design for them. Isn't it just great?

So I had this itch of mine for a long time. Sometimes when I’m using a computer that I don’t own to edit some document or whatever, I need the files afterwards. Like when I want to keep the homework I did in the library, or some AutoCAD drawing from computer lab, or when I’m printing out stuff at the internet cafe and made a last second change I don’t want to lose. You’re lucky if you have a USB stick with you, but even then you might not feel like putting the drive where you keep important files to a virus laden, filthy computer.

USB sticks are so 2006 and to be honest, I don’t keep one around anymore. Everything’s on the cloud, right? And if I need to print out a file, I just generate a public Dropbox link on my smartphone and I’m good to go. But it’s frustrating I can’t do it the other way. (I think you see now where this all is headed.) Well, maybe you can. You can just navigate to the Dropbox website and after logging in you can upload the files you need, but I don’t think I would.

I see no shame in admitting that I’m a fairly paranoid person. I never log into any service on any device I don’t own. I use KeePass to store my randomly-generated non-reused 24+ character alphanumeric passwords for each service I register to and use two-factor authentication where it’s available. Even if I wanted to login on an untrusted computer, it wouldn't be an easy task. But that’s a fair trade-off for security.

Does it seem unreasonable to want to use Dropbox on an untrusted computer and still have an easy login procedure? I think not. I believe in ease of use and I’ll pursue it no matter what. And it gets easier when you see it’s actually doable. That’s why I fell in love with [AirDroid login](http://web.airdroid.com/) when I first laid my eyes on it. (Go see it if you haven’t. I’ll wait, promise.)

I’ll just go on and explain how it solved the login problem in case you didn't check it. You install the AirDroid app on your phone and point your browser to _web.airdroid.com_ and then scan the barcode on the page using the app. That’s just it, you’re in! It’s simple and elegant. Even if the computer you’re using is compromised, no login information is transmitted. No username, no password, nothing. And that’s what I wanted to have.

I had a vision of the finished product. You would point the browser to the Dropbox Window website and it would simply state its purpose and prompt a QR code (and a URI if the trusted device doesn't have a camera). Scanning the code and then authenticating the app will in turn authenticate the client so you can start uploading immediately. It’s easy _and_ secure. The client doesn't get your credentials, just an access token —which you can deauthorize using your phone. Even if you forget to deauthorize, an adversary is limited to the contents of the app folder; other files in your Dropbox are safe. And you can revoke the app itself later on, which will render any leaked access token useless.

The great thing about this is, the possibilities are endless. I just drew a picture of use cases I cared about, where it’s a good alternative to mailing files to yourself. But you can use it when you need to send a file to someone, but you don’t trust them enough to give your email address. You can implement this same login scheme for other services too. I read a while back that Google acquired a company experimenting with sound based authentication, and I hope it gets widespread. Logging in is a mess and it needs to be fixed.

I started with these ideas and drew some mockups, designed client-server relationship and the API. I implemented the server side using Flask and Dropbox Python API, and client side with many web development tools including jQuery, Web Starter Kit, PureCSS, etc. It was a great experience and kind of overwhelming designing such a software that touches so many different tools, services and technologies; but fun nevertheless. Right now it’s at 90% but I know that the remaining 10% will take as much time. I’ll release the source code with a permissive license, as soon as I think it’s polished enough.

On the studying front, I enrolled in two more courses on Coursera; [Automata](https://www.coursera.org/course/automata) and [Cryptography I](https://www.coursera.org/course/crypto). I think with these two, I’ll have been covered pretty much over 2/3 of a standard CS curriculum. While my approach a bit different, this summer study turned out a lot like Scott H Young’s [MIT Challenge](http://www.scotthyoung.com/blog/mit-challenge/). There are still some topics I didn't cover yet, but I’m getting there and I don’t think I will ever say enough or stop. I love learning new and interesting stuff and while I find fun in that, it’ll keep me going.

I’ll keep posting as long as I find interesting stuff, so keep an eye out. And if you’re interested in hiring me, please contact me on [Twitter](https://mobile.twitter.com/frontsideair).
