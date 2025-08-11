# Use the official Node.js image as base
FROM node:22.17.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the React app runs on
EXPOSE 5173

# Command to start the React app using Vite (or Create React App)
CMD ["npm", "run", "dev", "--", "--host"]
