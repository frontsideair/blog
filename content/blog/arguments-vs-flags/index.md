---
title: Arguments vs Flags
date: "2020-04-12T15:44:02.499Z"
description: ""
---

In almost all programming languages we have functions that take arguments. Some languages also have methods, which take a special `this` argument, for convenience. I don't like the idea of locating functions within data, but I see the appeal. Anyway, I recently noticed a distinction within arguments, that some arguments are a bit different than others.

A function like `sort` can receive a list of sortable items. This is nothing out of the ordinary. But it can also receive a direction, so it can sort the list in ascending or descending order. This one is a bit different, but let's try to ignore the distinction and implement it as two distinct functions sharing a private implementation, like `sortAsc` and `sortDesc`. This is not an ideal solution for many reasons, and logically both are sorting the array so there should be no need to name them differently. A second approach would be to use a boolean or an enum as an argument to signify the direction. Let's skip the boolean, we don't like [boolean blindness](https://runtimeverification.com/blog/code-smell-boolean-blindness/) bugs. So an enum-powered solution would look something like this:

```typescript
enum Dir = { Asc, Desc }
function sort<T>(array: Array<T>, direction: Dir): Array<T>
```

This works, but now you need to import `Dir` as well as the function to use it. If you're lucky, your IDE will auto-import it for you, but that's not the problem here. We're treating the direction like a separate thing from the sorting function, when they are closely related. `Dir` does not mean anything by itself. It's a bit like how object oriented programming colocates stuff, but in this case the colocation is actually good. A naive solution to this problem would be something like this:

```typescript
const sort = {
  asc(array) {
    return sortImpl(array, Dir.Asc)
  },
  desc(array) {
    return sortImpl(array, Dir.Desc)
  },
}
// it can be used like this
sort.asc([1, 2, 3]) // [1,2,3]
sort.desc([1, 2, 3]) // [3,2,1]
```

This solution seems to work well for this small example, but consider the case where there are multiple flags. Then we'd have to traverse the matrix, which would result in combinatorial explosion of functions to implement and be very error-prone. This can easily be automated with a macro, but my point is this is a valid use case that programming languages should support. My proposed API would look like this:

```typescript
function sort<T>(array: Array<T>, dir: $Flag<Asc | Desc>): Array<T>
// and you would use it like this
sort([1, 2, 3], Asc)
```

The key point here is that direction flag is defined within the function, so it's not leaked outside. Since it is annotated as a flag, it is implied that this variable must be looked up within the function. This can easily scale up to multiple flags. It's also documented clearly that you can't pass whatever you want to this function, it has strict requirements that can only be fulfilled by what it provides.

To be perfectly honest, I'm not convinced myself about increasing the surface area of a programming language for this feature. While it definitely is a quality-of-life improvement, it probably doesn't pull its own weight. Also I can imagine many use cases where flags can be shared by multiple functions and it can make sense to import and pass around a flag. But maybe just being aware of this distinction and implementing our own abstractions around them can result in better designed and more robust APIs.
