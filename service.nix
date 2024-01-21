{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.services.homepage-rs;
  homepage-rs = pkgs.callPackage ./default.nix { inherit pkgs; };
in
{
  options.services.homepage-nix = {
    enable = mkEnableOption "homepage-nix service";

    port = mkOption {
      type = types.int;
      default = 8080;
      description = "Port on which homepage-nix should listen.";
    };

    staticDir = mkOption {
      type = types.str;
      default = "/var/lib/homepage-rs/static";
      description = "Directory for static files served by homepage-nix.";
    };

  };

  config = mkIf cfg.enable {
    systemd.services.homepage-rs = {
      description = "homepage-rs Service";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      serviceConfig = {
        ExecStart = "${homepage-rs}/bin/homepage-rs --port ${toString cfg.port} --static-dir ${cfg.staticDir}";
        Restart = "always";
      };
    };
  };
}

