---
title: "Experimenting with local LLMs on macOS"
date: "2025-09-08T11:49:25.214Z"
description: "A developer's guide to downloading and running LLMs on macOS, for experimentation and privacy."
---

<style>
@keyframes wave {
  0% {
      transform: translateY(calc(var(--height) * -1));
  }
  100% {
      transform: translateY(var(--height));
  }
}

.wavy {
    --height: 2px;

    span {
        display: inline-block;
        animation: 500ms ease-in-out alternate infinite wave both;
        animation-delay: calc(100ms * var(--index));
    }

    // please css let me access the index T.T
    :nth-child(1) {
        --index: 0;
    }
    :nth-child(2) {
        --index: 1;
    }
    :nth-child(3) {
        --index: 2;
    }
    :nth-child(4) {
        --index: 3;
    }
    :nth-child(5) {
        --index: 4;
    }
    :nth-child(6) {
        --index: 5;
    }
    :nth-child(7) {
        --index: 6;
    }
    :nth-child(8) {
        --index: 7;
    }
    :nth-child(9) {
        --index: 8;
    }
}
</style>

So, this blog post will be about LLMs, and everyone has <span class="wavy"><span>o</span><span>p</span><span>i</span><span>n</span><span>i</span><span>o</span><span>n</span><span>s</span> about that. To be upfront about it, I'm a skeptic (bordering on hater), yet I like experimenting with stuff so I download and run them locally on my Mac. And I'll teach you how to do it too, if you'd like!

![classic orihime with leek meme, but with multicolored "you're absolutely correct" overlaid on top of it](./orihime_leek.jpeg)

Some call them fancy autocomplete, some argue that they are sentient and should have rights. The truth is somewhere in between. Yes, they perform next word prediction, but it's so complex that there's nontrivial emergent behavior. No, they don't have creativity or a mind. I believe one day we can create sentient machines, but not in this current iteration, maybe not before we go extinct.

Now that we're out of the science fiction territory, let's talk about their strengths. [Laurie has a great post about it](https://seldo.com/posts/what-ive-learned-about-writing-ai-apps-so-far), which I highly recommend, but in summary they are generally good at summarizing text, regurgitating home maintenance advice from reddit, or telling you that you have cancer.

I also use them for brain-dumping. I find it hard to keep a journal, because I find it boring, but when you're pretending to be writing to someone, it's easier. If you have friends, that's much better, but some topics are too personal and a friend may not be available at 4 AM.

I mostly ignore its responses, because it's for me to unload, not to listen to a machine spew slop. I suggest you do the same, because we're anthropomorphization machines and I'd rather not experience [AI psychosis](https://www.bbc.com/news/articles/c24zdel5j18o). It's better if you don't give it a chance to convince you it's real. I could use a system prompt so it doesn't follow up with dumb questions (or "YoU'Re AbSoLuTeLy CoRrEcT"s), but I never bothered as I already don't read it.

Lastly, I'm interested in them because it's tech and I like tech. [I don't believe they make you that much productive](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), and I never let them write for me. When I ask it something, I always fact-check, they are known to hallucinate (or bullshit, if you prefer) and I've experienced this too many times to trust it. Most importantly, just avoid asking questions that can't be easily verified, there's enough fake news around anyway.

You may be asking, "Well I can do everything you said with ChatGPT free tier, why bother running them locally?" There are a few reasons, and I've already mentioned them briefly:

1. I like experimenting with things. It's marvelous that you can download this 12 GB file and your computer talks to you marginally better than [ELIZA](https://en.wikipedia.org/wiki/ELIZA)! Joking aside, we accepted the concept of LLMs too quickly, when the truth is that we never expected computers to figure out human speech before robots were walking among us. So it feels a bit magical when my computer has better grammar than I do, and I can summon one whenever I want without a supercomputer.

2. People have secrets and some secrets shouldn't leave your computer. Companies are not well equipped to keep your sensitive data, and current trends show that they can [retain your data](https://www.theverge.com/news/681280/openai-storing-deleted-chats-nyt-lawsuit) or [use it for training](https://www.theverge.com/anthropic/767507/anthropic-user-data-consumers-ai-models-training-privacy). I feel like a local LLM is a better choice for these use cases.

3. I don't feel comfortable giving money to the AI companies. Every single one of them has done some kind of unethical thing, and the way the AI race is going, a hypothetical ethical one will be left behind. They intentionally hype AI, destroy the environment, and plagiarize people's hard work. I'm thankful for the open-weight models they provide and will keep using them, luckily they can't take that away from me.

If you still want to run an LLM on your macOS[^1], let's get started. There are two options that I recommend, one is open-source and the other is easier to use, as all things are. I only cover macOS because that's what I have; if that's not your platform, you can still follow this guide with platform-specific tweaks, or find another guide.

## [Llama.cpp](https://github.com/ggml-org/llama.cpp)

It's created by Georgi Gerganov and works really well with a ton of configuration options. It supports a lot of platforms, can download models, and has a basic web UI for convenience. You can [install it with Nix](../how-i-use-nix-on-macos) using the following command: `nix profile install nixpkgs#llama-cpp`. For other installation methods, check [their instructions](https://github.com/ggml-org/llama.cpp/blob/master/docs/install.md).

To download and run a small and good enough model for experimentation, I recommend Gemma 3 4B QAT, which you can do with the following command:

```bash
$ llama-server -hf ggml-org/gemma-3-4b-it-qat-GGUF
```

If you open your web browser and navigate to `http://127.0.0.1:8080`, you'll see a very bare bones web UI that's eerily similar to ChatGPT, but that should be enough. You can experiment with it and exit the server once you're done.

## [LM Studio](https://lmstudio.ai)

This is the closed-source but easier to use one. It has a superb UI that lets you browse models, manage downloads, organize chats, and even tells you if a model can run on your machine. It has guardrails so you don't crash your system by loading a model that's too large. I like using it a lot, but enshittification is always a risk with closed-source for-profit software.

You can download a DMG from its website and install it as usual. LM Studio has two runtimes on macOS, `llama.cpp` which we covered earlier, and [MLX](https://github.com/ml-explore/mlx), which is an ML engine developed by Apple and runs a bit faster, but offers less configuration in the UI. (I didn't try running MLX directly, maybe it's configurable but not exposed.)

I will not provide a walkthrough because this is not a product tour and the UI is pretty user-friendly anyway. I can give you some tips and tricks though.

- You can switch the model mid-conversation, it won't have any problem
- You can branch off the current conversation, which is good for experimentation
- You can regenerate the assistant message, like ChatGPT
- You can edit your own messages, also like ChatGPT, but you can also edit assistant messages, which allows you to put words into its mouth
- You can create presets for system prompts and reuse them for different personas
- There are a lot of model settings you can configure; for example, you can customize the context overflow behavior when the context grows larger than the context window (the default is to truncate the middle, so first and last messages are kept, which is a good default)

## How to choose a good LLM for your use case

Right now there are a lot of open-weight models around, almost all AI companies have released one. There are a few things you need to pay attention to when choosing a model. These things take a lot of disk space so be mindful of filling your disk!

### Model size

You may have plenty of free space on your drive, but for the LLM to work you need to load it into memory. So your RAM is the bottleneck. Since the operating system also needs memory to work, if you have 16 GB RAM, like me, then models should be less than 12 GB. Loading larger models may cause you to run out of memory, your system will be unresponsive, and you'll have to perform a hard reboot. Larger models will also run slower.[^2]

### Runtime

If you're using `llama.cpp` directly, or as the runtime in LM Studio, you need GGUF models. If you're using the MLX runtime in LM Studio, you need MLX models. As mentioned before, MLX models run slightly faster, but GGUF models provide more configuration, and since they can run on many platforms they are ubiquitous and better tested.

### Quantization

Most LLMs are trained at [16-bit precision](https://en.wikipedia.org/wiki/Bfloat16_floating-point_format), but you can downcast (or quantize) the weights to lower precision and they still perform well up to some point. The sweet point is around 4 bits, which is noted as `Q4`. LM Studio defaults to this.

Quantization is a rabbit hole; different kernels are used for quantization, which is included in the notation, such as `Q4_K_M`, which is a bit too much for me and I decided against learning it. Just download the default and be done with it.

### Vision models

Some models can tokenize image inputs and can "see" what's inside them. This feels pretty magical; they can read text, recognize objects, and determine the mood or [art style](https://gist.github.com/frontsideair/0b0e681ef8c4c2eaaed1deeeb804f358). You can use them as basic OCRs but in my experience dedicated OCRs perform better at serious tasks, LLMs tend to make shit up when they can't read.

### Reasoning

Some models can "think" before generating an answer, which is sometimes called "inference time scaling"[^3]. The general wisdom is that smaller reasoning models can compete with larger non-reasoning models, which is reflected in benchmarks. The downside is that it takes longer to get an answer. So you need to decide if you want a larger but smarter model, or a smaller one that reasons. Keep in mind that reasoning sometimes takes minutes, and fills up the context pretty quickly.

### Tool use

Some models are taught to emit special tokens that can call tools specified in the system prompt with the correct arguments. LM Studio has a UI for adding MCP servers and managing the capabilities provided by them.

By default, LM Studio asks you to confirm each tool call request, which is great for security. Tool calls are commonly used for [data exfiltration attacks](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), which is as bad as it sounds.

LM Studio by default comes with a JavaScript MCP, powered by [Deno](https://deno.com), which provides the LLM the ability to execute code in a sandbox. This is really powerful, you can make it perform hard calculations, analyze data, even generate random numbers. I created a [number guessing game](https://gist.github.com/frontsideair/68d3eb675471ca4bc0388b4a3a32ac3d), which works better than expected.

You can also plug in a web search MCP to give it up-to-date knowledge retrieval capabilities. Since small models have limited world knowledge, this makes them work remarkably well for applicable use cases. I have used [Exa](https://exa.ai)'s free tier for this, which worked well.

Lastly, if you want a model to have long-term memory, there are a ton of MCPs that can do that. But keeping with the theme of keeping things local, I found [MCP server for Obsidian](https://github.com/MarkusPfundstein/mcp-obsidian) to be a good candidate.

One thing to keep in mind regarding MCPs is that since they have to teach the model about themselves, they pollute the context pretty quickly, so be sure to only enable those you need.

### Aside: Agents

["Agents are models using tools in a loop."](https://simonwillison.net/2025/May/22/tools-in-a-loop/) So a model that has both reasoning and tool use capabilities hits a sweet spot, and is commonly called an "agent". These can call tools repeatedly while reasoning, and provide a complete answer. The truth is far from perfect, in my experience, but it's still a cool concept.

### Finding a good model

LM Studio has a built-in UI for finding models, which shows runtime, quantization, model capabilities, and size in a user-friendly way. For `llama.cpp`, you can check [Hugging Face for GGUF models](https://huggingface.co/models?library=gguf&sort=trending).

You may not find a model that hits all the capability boxes, so it's better to download a variety of models and experiment with them. Here are some of my favorites, in no particular order:

- [Gemma 3 12B QAT](https://huggingface.co/google/gemma-3-12b-it-qat-q4_0-gguf): for visual intelligence and it's generally a good non-reasoning model that's fast and produces good text
- [Qwen3 4B 2507 Thinking](https://huggingface.co/Qwen/Qwen3-4B-Thinking-2507): This is the updated version of Qwen3 4B, which also has a non-reasoning variant; it's really small, fast, and good quality for its size
- [GPT-OSS 20B](https://huggingface.co/openai/gpt-oss-20b): The largest and most capable model that can run on my machine, has three levels of reasoning; it's rather slow but very capable, smartest of all
- [Phi-4 (14B)](https://huggingface.co/microsoft/phi-4): It was my favorite before GPT-OSS, now has reasoning and reasoning plus variants, but I haven't used it lately

## Final words

Small models may not replace frontier models in terms of speed or quality, but I still see utility in them. Running them locally is also a good test bed for understanding how they work and learning to work around their weaknesses.

Let me part with a final tip: LM Studio shows you how much of the context window is being used. So you may find it useful to ask for it to summarize the conversation so far, when the context window gets close to being filled. This way you can help it remember important information that it would otherwise forget.[^4]

Have fun with your brand new genie in your computer!

_Thanks to [Jull](https://monkeykode.com/us#jull-weber) for reviewing an early draft, and my girlfriend for the leekspin hero image._

[^1]: With an M-series, [Apple Silicon](https://en.wikipedia.org/wiki/Apple_silicon) chipset, Intel chips are pretty old at this point and wouldn't run LLMs well
[^2]:
    You may be wondering about performance and if it will be usable. When you generate a model response, two things happen in sequence; prompt processing and token generation. Prompt processing is tokenizing the entire chat history, is done in parallel, and compute bound. Token generation is sequential, and is memory bandwidth bound. Both of these things get slower as the context size increases.
    <br/>
    Also, counterintuitively, these models don't run on the [Neural Engine](https://en.wikipedia.org/wiki/Neural_Engine). Both `llama.cpp` and MLX run on the GPU, using Metal shaders. I'm not entirely sure why though.

[^3]: It's called that because the common wisdom is that models reason with tokens, and a smaller model can generate a higher quality response if it generates more tokens. To protect the user from the burden of reading through more slop, these reasoning tokens are usually hidden from the user.
[^4]: This is called _compaction_ and, coding tools such as [Claude Code](https://docs.anthropic.com/en/docs/claude-code/costs#reduce-token-usage) can do this automatically, or provide a command for you to trigger it manually.
