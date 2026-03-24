# Start from an official Node.js image based on Alpine Linux.
# We call this stage "builder" because we will use it only to install dependencies
# and run the frontend build process.
FROM node:20-alpine AS builder

# Set the working directory inside the container to /app.
# After this, commands run as if /app is the current folder.
WORKDIR /app

# Copy package.json and package-lock.json first.
# The pattern package*.json matches both files.
# This is good Docker practice because dependency install can be cached.
COPY package*.json ./

# Run npm install inside the builder image.
# This installs all dependencies needed for the build.
RUN npm install

# Copy the rest of the project files into /app.
COPY . .

# Run the build script from package.json.
# In your app, this is the Tailwind/frontend build step.
RUN npm run build

# Start a second stage using a lightweight Nginx image.
# This becomes the final image that will actually serve your app.
FROM nginx:alpine

# Copy the built app from the builder stage into Nginx's web root.
# /usr/share/nginx/html is the default folder Nginx serves static files from.
COPY --from=builder /app /usr/share/nginx/html

# Document that the container listens on port 80.
# Nginx serves HTTP traffic on port 80 inside the container.
EXPOSE 80