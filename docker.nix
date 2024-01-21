{ pkgs ? import <nixpkgs> { } }:
let
  homepageRs = pkgs.callPackage ./default.nix { };
in
pkgs.dockerTools.buildImage {
  name = "homepage-rs-nix";
  tag = "latest";

  copyToRoot = [
    homepageRs
  ];

  runAsRoot = ''
      	mkdir -p /static
    	'';

  config = {
    Cmd = [ "${homepageRs}/bin/homepage-rs" ];
    ExposedPorts = {
      "8080/tcp" = { };
    };
    Volumes = {
      "/static" = { };
    };
  };
}
