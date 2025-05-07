FROM node:20-alpine

# Set working directory to root (project root)
WORKDIR /

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy everything else
COPY . .

# Expose both backend and metrics server ports
EXPOSE 5000 9100

# Start both servers with npm
CMD ["npm", "start"]
