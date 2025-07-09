FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the frontend source
COPY . .

# Expose Vite dev server port
EXPOSE 5173

CMD ["npm", "run", "dev"]