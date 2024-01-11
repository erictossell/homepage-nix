{ pkgs ? import <nixpkgs> { } }:

pkgs.dockerTools.buildImage {
  name = "homepage-rs-oci";
  tag = "latest";

  contents = [ (pkgs.callPackage ./default.nix { }) ];

  config = {
    Cmd = [ "${pkgs.callPackage ./default.nix {}}" ];
    ExposedPorts = {
      "8080/tcp" = { };
    };
  };
}
