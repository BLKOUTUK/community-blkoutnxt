## Docker Deployment Instructions

Your application includes Docker configuration for containerized deployment. Here's how to use it:

### Local Docker Deployment

1. Build the Docker image:
   ```bash
   npm run docker:build
   # or directly:
   docker build -t app-name .
   ```

2. Run the Docker container locally:
   ```bash
   npm run docker:run
   # or directly:
   docker run -p 8080:80 app-name
   ```

   This will start your application in a Docker container, accessible at http://localhost:8080.

### Docker Compose Deployment

For a more complex setup with multiple services:

1. Deploy using Docker Compose:
   ```bash
   npm run deploy:docker
   # or directly:
   docker-compose up -d --build
   ```

   This will build and start all services defined in your docker-compose.yml file.

### Deploying to Container Registries

To deploy your Docker image to a container registry:

1. Build the image:
   ```bash
   docker build -t app-name .
   ```

2. Tag the image for your registry:
   ```bash
   # For Docker Hub
   docker tag app-name username/app-name:latest

   # For Google Container Registry
   docker tag app-name gcr.io/project-id/app-name:latest

   # For AWS ECR
   docker tag app-name aws_account_id.dkr.ecr.region.amazonaws.com/app-name:latest
   ```

3. Push the image to the registry:
   ```bash
   # For Docker Hub
   docker push username/app-name:latest

   # For Google Container Registry
   docker push gcr.io/project-id/app-name:latest

   # For AWS ECR
   docker push aws_account_id.dkr.ecr.region.amazonaws.com/app-name:latest
   ```

### DigitalOcean Container Registry

For DigitalOcean's container registry:

1. Build the DigitalOcean-specific image:
   ```bash
   npm run docker:build:do
   # or directly:
   docker build -t app-name -f Dockerfile.digitalocean .
   ```

2. Tag and push to DigitalOcean Container Registry:
   ```bash
   # Tag the image
   docker tag app-name registry.digitalocean.com/your-registry/app-name:latest

   # Push to DigitalOcean
   docker push registry.digitalocean.com/your-registry/app-name:latest
   ```