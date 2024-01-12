## Home-page

There are lots of these, but this one is mine.

### What is this?

An overly-complicated way to generate a single-page website with a `rust` backend provided on a `docker` image that is built with `nix`. The front end is a mixture of `tailwind` and very vanilla `javascript`.

### Why?

I wanted to reduce the memory usage on all of my personal sites, and I wanted to learn more about `rust` and `nix`. 

The result is a very very small `memory` footprint (~2-4MB) for my mostly idle sites. The `docker` image itself is only 55.3MB. Using a simple `node-js` or `python` equivalent typically runs at ~25-30MB of memory.

### How to use it?

The `docker` image is available on `docker-hub` as `etossell/homepage-nix`. The `docker` image is built with `nix` and `docker` and is available on `github` as `erictossell/homepage-rs`.

You can build the image from source with `nix-build` and then load it into `docker` with `docker load < result`.

Pull it from docker-hub with `docker pull etossell/homepage-nix:0.1.0`.


