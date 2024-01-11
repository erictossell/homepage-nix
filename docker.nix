{ pkgs ? import <nixpkgs> { } }:
let
  homepageRs = pkgs.callPackage ./default.nix { };
in
pkgs.dockerTools.buildImage {

  name = "homepage-rs-oci";
  tag = "latest";

  contents = [ homepageRs ];

  config = {
    Cmd = [ "${homepageRs}/bin/homepage-rs" ];
    ExposedPorts = {
      "8080/tcp" = { };
    };
  };
}
