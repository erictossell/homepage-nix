# Build stage
FROM nixos/nix:latest as builder

# Enable experimental features for Nix (for flake support)
RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

COPY . .

# Build the application using flake.nix
# Capture build output for debugging with increased verbosity
RUN nix build --show-trace -vvv > build.log 2>&1 || cat build.log

RUN ls -la

# Runtime stage
FROM nixos/nix:latest

# Copy the built binary from the builder stage
COPY --from=builder /result/bin/homepage-rs /homepage-rs

# Ensure the binary is executable
RUN chmod +x /homepage-rs

CMD ["/homepage-rs"]

