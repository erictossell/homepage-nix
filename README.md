## Homepage

There are lots of these, but this one is mine.

Goals, generate all of the static content with `rust` or `nix`. 

### What is this?

An overly-complicated way to generate a single-page website with an overly simple `rust` backend provided on a `docker` image that is built with `nix`. 

The front end is a mixture of `tailwind` and very vanilla `javascript` all stored in the `/static` directory. 

### Install on NixOS with Flakes

```nix
  inputs.homepage-nix.url = "github:etossell/homepage-nix";
```

```nix
{ homepage-nix, system, ... }:
{
  imports = [
    homepage-nix.nixosModules.${system}.default;
  ];
  services.homepage-nix = {
    enable = true;
    port = 8080;
    staticDir = "/path/to/your/static";
  };
}
```

### Use it with Docker

The `docker` image is available on [`docker-hub`](https://hub.docker.com) as [`etossell/homepage-nix`](https://hub.docker.com/r/etossell/homepage-nix). 

You can build the image from source with `nix-build docker.nix` and then load it into `docker` with `docker load < result`.

Pull it from docker-hub with `docker pull etossell/homepage-nix:latest`.

Run it with `docker run -p 8080:8080 -v ./<path/to/your/static>:/static etossell/homepage-nix:latest`.

### Why?

I wanted to reduce the memory usage on all of my personal sites, and I wanted to learn more about `rust` and `nix`. 

The result is a very very small `memory` footprint (~2-4MB) for my mostly idle sites. The `docker` image itself is only ~55.3MB.

> :warning: **Packages in `nixpkgs` are not typically built to reduce size on disk. Take careful consideration using `pkgs.<nixpkgs-name-here>`.**

#### Nix Flake Show

```bash
git+file:///home/eriim/repos/nix/homepage-nix
├───devShells
│   ├───aarch64-darwin
│   │   └───default: development environment 'nix-shell'
│   ├───aarch64-linux
│   │   └───default: development environment 'nix-shell'
│   ├───x86_64-darwin
│   │   └───default: development environment 'nix-shell'
│   └───x86_64-linux
│       └───default: development environment 'nix-shell'
├───formatter
│   ├───aarch64-darwin: package 'nixpkgs-fmt-1.3.0'
│   ├───aarch64-linux: package 'nixpkgs-fmt-1.3.0'
│   ├───x86_64-darwin: package 'nixpkgs-fmt-1.3.0'
│   └───x86_64-linux: package 'nixpkgs-fmt-1.3.0'
├───nixosModules
│   ├───aarch64-darwin: NixOS module
│   ├───aarch64-linux: NixOS module
│   ├───x86_64-darwin: NixOS module
│   └───x86_64-linux: NixOS module
└───packages
    ├───aarch64-darwin
    │   └───default: package 'homepage-nix-0.2.0'
    ├───aarch64-linux
    │   └───default: package 'homepage-nix-0.2.0'
    ├───x86_64-darwin
    │   └───default: package 'homepage-nix-0.2.0'
    └───x86_64-linux
        └───default: package 'homepage-nix-0.2.0'
```
