## DigitalOcean Deployment Instructions

### Option 1: Deploy to DigitalOcean App Platform

1. Make sure you have the DigitalOcean CLI (doctl) installed and authenticated:
   ```bash
   # Install doctl (varies by OS, example for macOS with Homebrew)
   brew install doctl

   # Authenticate with DigitalOcean
   doctl auth init
   ```

2. Create an app.yaml configuration file if you don't have one:
   ```bash
   # Run the script once to generate the template
   bash scripts/deploy-digitalocean.sh
   ```

3. Edit the generated app.yaml file with your specific GitHub repository details and environment variables.

4. Update the APP_ID and APP_NAME in the deployment script:
   - Open `scripts/deploy-digitalocean.sh`
   - Replace `your-app-id` with your actual DigitalOcean App ID
   - Replace `your-app-name` with your actual app name

5. Run the deployment script again:
   ```bash
   npm run deploy:digitalocean
   ```

### Option 2: Deploy to DigitalOcean Droplet

If you prefer to deploy to a DigitalOcean Droplet (virtual machine):

1. Make sure you have configured your Droplet and have SSH access.

2. Run the DigitalOcean Droplet deployment script:
   ```bash
   npm run deploy:digitalocean-droplet
   ```

### Option 3: Deploy using Docker

You can also deploy your application using Docker:

1. Build the Docker image:
   ```bash
   npm run docker:build:do
   ```

2. Deploy using Docker Compose:
   ```bash
   npm run deploy:docker
   ```

This will build and run your application in a Docker container, which can be deployed to any environment that supports Docker.