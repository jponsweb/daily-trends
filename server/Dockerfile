FROM node:10-slim AS server

# Create a directory where our app will be placed
RUN mkdir -p /src/app

# Change directory so that our commands run inside this new directory
WORKDIR /src/app

# Copy dependency definitions
COPY package.json /src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]