# Use an official Node.js image as a base image
FROM node:20 

# Declaring env
# ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Build the application for productio
RUN npm run build --production

# Copy the build files to the working directory
COPY build/ ./

# Install `serve` to run the application
RUN npm install -g serve

# Make port 5000 available outside the container
EXPOSE 5000

# Run the application for development
# CMD ["npm", "start"]

# Run the application
CMD serve -s build
