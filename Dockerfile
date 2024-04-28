# Use an official Node runtime as a parent image
FROM node:18 as react-build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY react/package*.json ./

# Install dependencies
RUN npm install

# Bundle app source inside Docker image
COPY react/ .

# Build your React app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=react-build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define command to run the app
CMD ["nginx", "-g", "daemon off;"]
