# Runtime stage
FROM nixos/nix:latest
WORKDIR /app
# Copy the built binary from the builder stage
COPY . .
# Ensure the binary is executable
CMD ["nix run ."]
