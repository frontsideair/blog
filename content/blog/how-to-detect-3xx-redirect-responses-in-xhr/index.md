---
title: How to detect 3XX redirect responses in XHR
date: "2016-01-22T22:33:26.364Z"
---

I recently stumbled upon a problem when I was exploring how to handle a corner case in our web app. For a special case, we were considering returning a 3XX status code to inform the client and handle the situation; but to our chagrin, it wasn’t working. We scrapped the whole idea, but here’s what I learned when we were investigating it.

If the request is made to the same origin, or the server has CORS enabled, the 3XX response is followed transparently; and the XHR handlers never know that this is the case until it gets an OK (2XX) or error (4XX/5XX). The error case is not important to us right now, but how do we determine we were redirected if the status code we receive isn’t 3XX?

I looked for an answer on the internet, but found none of them satisfactory. One common solution was too hacky for my tastes; the server was supposed to provide a special header in case it redirected (or didn’t) so the client would know; but fiddling with the server to make it work didn’t make sense to me, so we didn’t spend any time on it.

One solution I found but we didn’t use was this:

```javascript
var xhr = new XMLHttpRequest()
var url = "/users"
xhr.open("GET", url, true)
xhr.onload = function() {
  if (xhr.status === 200) {
    if (xhr.responseURL === url) {
      console.log("got what we wanted, hooray!")
    } else {
      console.log("boo, we were redirected from", url, "to", xhr.responseURL)
    }
  }
}
xhr.send()
```

This works because when the request is redirected, the redirected page can be accessed from xhr.responseURL and any discrepancy between that and the URL we made the request to shows that we were redirected.

I don’t imagine this pattern to be very useful; but if this helps you, or doesn’t work for some reason, please ping me.
