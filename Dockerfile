# Use the official Node.js image as a base image # Name this stage as 'builder'
FROM node:20 

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Build the application for production
RUN npm run build

# Install `serve` to run the application
RUN npm install -g serve

# Make port 5000 available outside the container
EXPOSE 5000

# Run the application
CMD serve -s build
