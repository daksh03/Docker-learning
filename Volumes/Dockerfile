FROM node

WORKDIR /Docker/Volumes

# Copy package.json first
COPY package.json .

# Install nodemon as a dev dependency
RUN npm install && npm install -g nodemon

# Copy the rest of the application code
COPY . .

EXPOSE 80

# Start the application with nodemon
CMD ["nodemon", "server.js"]
