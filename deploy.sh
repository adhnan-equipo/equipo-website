#!/bin/bash

# Exit on any error
set -e

# Set environment variables
echo "Setting up environment variables..."
export NODE_ENV=production

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Export the static files
echo "Exporting static files..."
npx next export

# Deploy to Firebase
echo "Deploying to Firebase..."
npx firebase deploy

echo "Deployment completed successfully!"