FROM mcr.microsoft.com/playwright:v1.56.1-jammy

# Set working directory
WORKDIR /pw-tests

# Copy application files
COPY . /pw-tests

# Install dependencies
RUN npm ci

# Run tests
CMD ["npm", "run", "test"]
