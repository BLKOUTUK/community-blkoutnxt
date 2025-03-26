# React + Vite + Supabase Application

A modern web application built with React, Vite, Tailwind CSS, and Supabase.

## Features

- React 18 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS with Shadcn UI components
- Supabase for authentication and database
- React Router for client-side routing
- React Query for data fetching
- Form handling with React Hook Form and Zod validation
- Docker support for containerization
- CI/CD with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your Supabase credentials.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:prod` - Build for production with optimizations
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

### Docker Development

- `npm run docker:build` - Build the Docker image
- `npm run docker:run` - Run the Docker container
- `npm run deploy:docker` - Build and run with Docker Compose

## Deployment Options

### 1. Docker Deployment

Build and run the Docker container:

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run
```

Or use Docker Compose:

```bash
npm run deploy:docker
```

### 2. Digital Ocean Deployment

#### Option A: Digital Ocean App Platform

The simplest way to deploy to Digital Ocean:

1. Install Digital Ocean CLI: `brew install doctl` (macOS) or follow [installation instructions](https://docs.digitalocean.com/reference/doctl/how-to/install/)
2. Authenticate with Digital Ocean: `doctl auth init`
3. Run the deployment script:

```bash
npm run deploy:digitalocean
```

This will:
- Create an `app.yaml` configuration file if it doesn't exist
- Deploy your application to Digital Ocean App Platform

#### Option B: Digital Ocean Droplet with Docker

For more control over your deployment:

1. Install Digital Ocean CLI and authenticate as above
2. Add your SSH key to Digital Ocean
3. Update the SSH key ID in `scripts/deploy-digitalocean-droplet.sh`
4. Run the deployment script:

```bash
npm run deploy:digitalocean-droplet
```

This will:
- Create a new Droplet if it doesn't exist
- Build and deploy your Docker container to the Droplet
- Set up your application to run on port 80

### 3. AWS Deployment

Deploy to AWS S3 and CloudFront:

1. Configure AWS CLI with your credentials
2. Update the S3 bucket name and CloudFront distribution ID in `scripts/deploy-aws.sh`
3. Run the deployment script:

```bash
npm run deploy:aws
```

### 4. Netlify Deployment

Deploy to Netlify:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Authenticate with Netlify: `netlify login`
3. Update the site ID in `scripts/deploy-netlify.sh`
4. Run the deployment script:

```bash
npm run deploy:netlify
```

### 4. GitHub Actions CI/CD

The repository includes a GitHub Actions workflow that:

1. Builds and tests the application on every push and pull request
2. Deploys to production when changes are merged to the main branch

To use GitHub Actions:

1. Add the following secrets to your GitHub repository:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_APP_URL`

2. Update the deployment step in `.github/workflows/ci-cd.yml` with your preferred deployment method.

## Project Structure

```
├── .github/workflows    # GitHub Actions workflows
├── public/              # Static assets
├── scripts/             # Deployment scripts
├── src/
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── integrations/    # Third-party integrations
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── supabase/            # Supabase configuration and functions
├── .env.example         # Example environment variables
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Docker configuration
├── nginx.conf           # Nginx configuration for Docker
└── vite.config.ts       # Vite configuration
```

## Best Practices

- Keep environment variables in `.env` files and never commit them to the repository
- Use TypeScript for type safety
- Follow the component structure and naming conventions
- Write tests for critical functionality
- Use ESLint for code quality

## License

This project is licensed under the MIT License - see the LICENSE file for details.