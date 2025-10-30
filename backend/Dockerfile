# ----------------------
# 1. Base Image
# ----------------------
FROM node:18-alpine

# Create working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
