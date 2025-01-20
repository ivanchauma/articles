# Use Node.js as the base image for React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
#COPY ./article-frontend/package*.json ./
#RUN npm install

#RUN npm install -D @types/node

# Copy the source code
#COPY ./article-frontend/ .

# Build the React app
#RUN npm run build

# Serve the React app using a simple static server
FROM nginx:alpine

# Copy built assets from the build stage
#COPY --from=build /app/build /usr/share/nginx/html
COPY ./article-frontend/dist /usr/share/nginx/html
# Expose port 80 to serve the frontend
EXPOSE 80