# Node version
FROM node:12.18.3 as build 

# Working directory
WORKDIR /app

# Copy dependencies
COPY . .

# Install dependencies
RUN npm i

# Expose port
EXPOSE 3000

# Serve
CMD ["npm", "start"]