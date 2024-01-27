{ pkgs ? import <nixpkgs> { } }:
let
  homepageNix = pkgs.callPackage ./default.nix { };
in
pkgs.dockerTools.buildImage {
  name = "homepage-nix";
  tag = "latest";

  copyToRoot = [
    homepageNix
  ];

  runAsRoot = ''
      	mkdir -p /static
    	'';

  config = {
    Cmd = [ "${homepageNix}/bin/homepage-nix" "--port" "5000" "--static-dir" "/static" ];
    ExposedPorts = {
      "8080/tcp" = { };
    };
    Volumes = {
      "/static" = { };
    };
  };
}
