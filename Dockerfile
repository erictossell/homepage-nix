# Build stage
FROM nixos/nix:latest as builder
WORKDIR /builder

# Enable experimental features for Nix (for flake support)
RUN nix-env -iA nixpkgs.nixFlakes
RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

COPY . /builder
# Build the application using flake.nix
RUN nix build .#homepage-rs --show-trace

# Runtime stage
FROM nixos/nix:latest
WORKDIR /app
# Copy the built binary from the builder stage
COPY --from=builder /app/result/bin/homepage-rs /app/homepage-rs
# Ensure the binary is executable
RUN chmod +x /app/
CMD ["/app/homepage-rs"]
