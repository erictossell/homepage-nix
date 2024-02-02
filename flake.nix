{
  inputs = {
    naersk.url = "github:nix-community/naersk/master";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils, naersk }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        naersk-lib = pkgs.callPackage naersk { };
      in
      {
        formatter = pkgs.nixpkgs-fmt;

        packages = {
          homepage-nix = naersk-lib.buildPackage { src = ./.; };

        };

        nixosModules = {
          homepage-nix = ./service.nix;
          default = self.nixosModules.homepage-nix;
        };

        devShells = {
          default = with pkgs; mkShell {
            buildInputs = [ cargo rustc rustfmt pre-commit rustPackages.clippy nodejs ];
            RUST_SRC_PATH = rustPlatform.rustLibSrc;
          };
        };
      });

}

