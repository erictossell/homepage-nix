{ pkgs ? import <nixpkgs> { } }:
let manifest = (pkgs.lib.importTOML ./Cargo.toml).package;
in
pkgs.rustPlatform.buildRustPackage rec {
  pname = manifest.name;
  inherit (manifest) version;
  cargoLock.lockFile = ./Cargo.lock;
  src = pkgs.lib.cleanSource ./.;

  postInstall = ''
    mkdir -p $out/share/${pname}
    cp -r ${src}/static $out/share/${pname}/
  '';

}

