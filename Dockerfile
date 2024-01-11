# Runtime stage
FROM nixos/nix:latest
WORKDIR /app

# Enable Nix experimental features


# Copy the built binary and other necessary files from the builder stage
COPY . .

# Expose port 8080
EXPOSE 8080

# Run the application
RUN nix run /app --extra-experimental-features nix-command --extra-experimental-features flakes

