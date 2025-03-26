#!/bin/bash

# Digital Ocean Droplet deployment script
# Prerequisites: 
# 1. Digital Ocean CLI (doctl) installed and authenticated
# 2. SSH key added to Digital Ocean
# 3. Docker installed on your local machine

# Configuration
DROPLET_NAME="react-app-droplet"
DROPLET_REGION="nyc1"  # NYC1, SFO2, etc.
DROPLET_SIZE="s-1vcpu-1gb"  # Smallest size, adjust as needed
SSH_KEY_ID="your-ssh-key-id"  # Get this from doctl compute ssh-key list
DOCKER_IMAGE_NAME="your-app-name"
DOCKER_TAG="latest"

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "Error: doctl is not installed. Please install the Digital Ocean CLI."
    echo "Visit: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    exit 1
fi

# Check if authenticated with Digital Ocean
if ! doctl account get &> /dev/null; then
    echo "Error: Not authenticated with Digital Ocean."
    echo "Please run: doctl auth init"
    exit 1
fi

# Build Docker image
echo "Building Docker image..."
npm run docker:build:do

# Create Droplet if it doesn't exist
if ! doctl compute droplet get $DROPLET_NAME &> /dev/null; then
    echo "Creating new Droplet: $DROPLET_NAME"
    doctl compute droplet create $DROPLET_NAME \
        --image docker-20-04 \
        --region $DROPLET_REGION \
        --size $DROPLET_SIZE \
        --ssh-keys $SSH_KEY_ID \
        --wait
else
    echo "Droplet $DROPLET_NAME already exists."
fi

# Get Droplet IP
DROPLET_IP=$(doctl compute droplet get $DROPLET_NAME --format PublicIPv4 --no-header)
echo "Droplet IP: $DROPLET_IP"

# Save Docker image to tar file
echo "Saving Docker image to tar file..."
docker save $DOCKER_IMAGE_NAME:$DOCKER_TAG > app_image.tar

# Copy Docker image to Droplet
echo "Copying Docker image to Droplet..."
scp app_image.tar root@$DROPLET_IP:/root/

# Load and run Docker image on Droplet
echo "Loading and running Docker image on Droplet..."
ssh root@$DROPLET_IP << EOF
    # Load Docker image
    docker load < /root/app_image.tar
    
    # Stop and remove existing container if it exists
    docker stop app-container || true
    docker rm app-container || true
    
    # Run new container
    docker run -d --name app-container -p 80:80 -p 443:443 \
        -e VITE_SUPABASE_URL=${VITE_SUPABASE_URL} \
        -e VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY} \
        -e VITE_APP_URL=${VITE_APP_URL} \
        --restart always \
        $DOCKER_IMAGE_NAME:$DOCKER_TAG
    
    # Clean up
    rm /root/app_image.tar
EOF

# Clean up local tar file
rm app_image.tar

echo "Deployment completed successfully!"
echo "Your application is now running at: http://$DROPLET_IP"
echo ""
echo "To set up a domain name, add an A record pointing to $DROPLET_IP"
echo "Then, you can set up SSL with Certbot using:"
echo "ssh root@$DROPLET_IP"
echo "apt-get update && apt-get install -y certbot python3-certbot-nginx"
echo "certbot --nginx -d yourdomain.com -d www.yourdomain.com"