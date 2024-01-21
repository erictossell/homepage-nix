{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.services.homepage-rs;
  homepage-rs = pkgs.callPackage ./default.nix { inherit pkgs; };
in {
  options.services.homepage-rs = {
    enable = mkEnableOption "homepage-rs service";

    port = mkOption {
      type = types.int;
      default = 8080;
      description = "Port on which homepage-rs should listen.";
    };
  };

  config = mkIf cfg.enable {
    systemd.services.homepage-rs = {
      description = "homepage-rs Service";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      serviceConfig = {
        ExecStart = "${homepage-rs}/bin/homepage-rs";
        Restart = "always";
      };
    };
  };
}

