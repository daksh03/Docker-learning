FROM node

WORKDIR /Docker/Volumes

# Copy package.json first to install dependencies
COPY package.json ./

# Install dependencies and nodemon globally
RUN npm install && npm install -g nodemon

# Copy the rest of the application code
COPY . .

ARG DEFAULT_PORT=80

ENV PORT=$DEFAULT_PORT

# Expose port (You can modify this in the .env if needed)
EXPOSE $PORT

# Use nodemon with the --legacy-watch flag for better compatibility with Docker
CMD ["nodemon", "--legacy-watch", "server.js"]
