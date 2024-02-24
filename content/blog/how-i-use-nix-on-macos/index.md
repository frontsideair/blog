---
title: "How I use Nix on macOS"
date: "2024-02-23T01:43:40.815Z"
description: "My foray into Nix, how I use it for day-to-day tasks, and why it's more than just another package manager."
---

## My personal history with package managers

I've been using GNU/Linux [^1] as my main operating system since as early as 2005. I like a lot of things about it, but one thing I didn't like was the lack of polish. After years of tinkering and crashing, I was looking for something more stable. This is why I was excited to switch to Mac when I changed jobs and the company [^2] could afford a Macbook.

However, I was missing some things from my previous Linux system, chief among them being package management. Those familiar with Linux will recognize that most distributions come with a central repository of pre-configured packages. macOS has the App Store, but it's limited to graphical user interfaces. Coming from Linux I'm accustomed to command-line tools and find them indispensable for my work.

I quickly found that there's an unofficial package manager and its accompanying package repository for macOS, collectively called [Homebrew](https://brew.sh). I used that for a while and it worked okay. My coworkers, on the other hand, were using [NixOS](https://nixos.org), and seeing their workflow changed what I expect from a package manager fundamentally. Luckily for me, Nix is cross-platform and it works well on macOS. Naturally, I gave it a try.

## What's Nix

I'll keep this short so as not to be intimidating, but there are a few things that Nix may be referring to.

- [Nix](https://zero-to-nix.com/concepts/nix-language), the purely functional programming language
- [Nix](https://zero-to-nix.com/concepts/package-management), the package manager
- [Nixpkgs](https://zero-to-nix.com/concepts/nixpkgs), the package repository, where package definitions are written in the Nix language
- [NixOS](https://zero-to-nix.com/concepts/nixos), the Linux distribution powered by all of the above

In my case, I started using the Nix package manager with the Nixpkgs repository to install stuff on my Mac. I had no intention to replace my operating system and didn't need to write Nix expressions just yet.

## Package management with Nix

Here are some basic package management commands, you can use this as a cheat sheet.

- Search for a package (alternatively, you can use [the web interface](https://search.nixos.org/packages)):

  ```
  > nix search nixpkgs ripgrep

  * legacyPackages.aarch64-darwin.ripgrep (14.1.0)
  A utility that combines the usability of The Silver Searcher with the raw speed of grep
  ```

- Install a package:

  ```
  > nix profile install nixpkgs#ripgrep # or by full path e.g. legacyPackages.aarch64-darwin.ripgrep
  ```

- List installed packages:

  ```
  > nix profile list

  Index:              0
  Flake attribute:    legacyPackages.aarch64-darwin.ripgrep
  Original flake URL: flake:nixpkgs
  Locked flake URL:   github:NixOS/nixpkgs/98b00b6947a9214381112bdb6f89c25498db4959
  Store paths:        /nix/store/agbdqb8yjnji2p7hc1ckg0q2fq5a7yn5-ripgrep-14.1.0

  ```

- Upgrade a package:

  ```
  > nix profile upgrade legacyPackages.aarch64-darwin.ripgrep # or by index e.g. 0
  ```

- Delete a package:

  ```
  > nix profile remove legacyPackages.aarch64-darwin.ripgrep # or by index e.g. 0
  ```

- Update the registry to the latest version:

  ```
  > nix registry pin nixpkgs
  ```

And some advanced commands, showing the true power of Nix.

- Set the registry to any point in time:

  ```
  > nix registry pin nixpkgs github:NixOS/nixpkgs/<COMMIT_HASH>
  ```

This is useful if you can find the specific version of a package in the [Nixpkgs GitHub repository](https://github.com/NixOS/nixpkgs), you can copy the commit hash and set the registry to that point in time.

- Rollback to the previous version:

  ```
  > nix profile rollback

  switching profile from version 30 to 29
  ```

If you want to undo an operation that affects your profile, you can undo your latest change, or roll back to a known good version. Nix packages are immutable, so upgrades or uninstalls aren't destructive.

- Run a package without installing it:

  ```
  > nix run nixpkgs#cowsay -- -f hellokitty nix is fun!

   _____________
  < nix is fun! >
   -------------
    \
     \
        /\_)o<
       |      \
       | O . O|
        \_____/
  ```

This is a game-changer, you don't have to pollute your system to run a one-off command, or you can try a package out before committing to installing it. Since Nix packages are deterministic, they are built only the first time they are run, afterwards, they are brought back from the cache and installs are instantaneous.

- Start a development shell with the packages you need:

  ```
  > nix shell nixpkgs#nodejs_20 nixpkgs#python3

  Restored session: Fri Feb 23 14:08:52 +03 2024

  > node --version && python --version

  v20.11.1
  Python 3.11.7
  ```

This is another game-changer. You can open a shell with all the tools you need, without installing them. One project may have Node 18 while the other has Node 20. No more version managers. You can take this even further with tools like [devenv](https://devenv.sh).

- Clean up your Nix store:

  ```
  > nix store gc

  3196 store paths deleted, 2074.36 MiB freed
  ```

You can periodically run this to clean up packages not depended on by anything, freeing up disk space. It has a nice feeling.

## What you may miss from Homebrew

The only thing that comes to mind is [Homebrew Cask](https://formulae.brew.sh/cask/). There's no good way to install prepackaged GUI applications with Nix that I could find. I'm using the App Store and disk images for that purpose.

## How to install Nix on macOS

I can highly recommend the [Determinate Nix Installer](https://github.com/DeterminateSystems/nix-installer). You can even use [the graphical installer](https://determinate.systems/posts/graphical-nix-installer/). The [official installer](https://nixos.org/download#nix-install-macos) is fine too, but it doesn't survive OS upgrades and it doesn't generate an installation receipt, which makes it harder to uninstall if you need to uninstall it for whatever reason. I also find it comforting to have a receipt in general. [^3]

## Where to go from there

You're more than welcome to stop here and use the newfound powers Nix bestowed upon you. But if you want to go further, you may check out [nix-darwin](https://github.com/LnL7/nix-darwin) and [home-manager](https://github.com/nix-community/home-manager), which some use to manage their system more declaratively. I find it a bit too complicated for my tastes. You can also use Nix to manage dependencies of your projects; I find [devenv](https://devenv.sh) useful for that purpose and hope to write more about it in the future.

---

I hope I made a strong case for the benefits of using Nix as a package manager for a macOS system. This is only my workflow and others are using Nix for their convenience in unique and creative ways. Here are some posts praising Nix that I read and can recommend:

- [My first steps with Nix on Mac OSX as Homebrew replacement](https://sandstorm.de/de/blog/post/my-first-steps-with-nix-on-mac-osx-as-homebrew-replacement.html) by Sebastian Kurfürst
- [Using Nix on macOS](https://checkoway.net/musings/nix/) by Stephen Checkoway
- [Setting up Nix on macOS](https://nixcademy.com/2024/01/15/nix-on-macos/) by Jacek Galowicz
- [Some notes on using nix](https://jvns.ca/blog/2023/02/28/some-notes-on-using-nix/) by Julia Evans
- [Use Nix as Package Manager in macOS](https://ntzyz.space/post/use-nix-as-package-manager-in-macos/) by ntzyz
- [MacOS Nix Setup (an alternative to Homebrew)](https://wickedchicken.github.io/post/macos-nix-setup/) by Mike Stipicevic
- [Setting up Nix on macOS](https://davi.sh/til/nix/nix-macos-setup/) by Davis Haupt
- [Declarative macOS Configuration Using nix-darwin And home-manager](https://xyno.space/post/nix-darwin-introduction) by Lucy

I hope you'll find Nix as charming and empowering as I do. Let me know if you run into any troubles or just want to share how much you love it!

_Thanks to [Aycan](https://twitter.com/aycanirican) for reviewing a draft of this post._

[^1]: Which I'll just call Linux for brevity for the rest of the article
[^2]: [Picus Security](https://www.picussecurity.com), one of the best workplaces I worked at with the best teammates
[^3]: Also Determinate Nix Installer enables "experimental" features like nix command and flakes that I would be enabling anyway
