# BLKOUTNXT Community Platform

A modern web application for the BLKOUTNXT community, built with React, Vite, and Supabase. This platform serves as a central hub for black queer men, allies, and organisations to connect and engage with the community.

## Features

- Modern React 18 with TypeScript for type safety
- Vite for fast development and optimized builds
- Tailwind CSS with Shadcn UI components for beautiful, accessible interfaces
- Supabase for authentication, database, and serverless functions
- SendFox integration for email communications and automations
- React Router for client-side routing
- React Query for efficient data fetching
- Form handling with React Hook Form and Zod validation
- Docker support for containerization
- CI/CD with GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- Git
- Supabase CLI (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BLKOUTUK/community-blkoutnxt.git
   cd community-blkoutnxt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

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

### Supabase Functions

The project includes several Supabase Edge Functions:

- `handle-signup`: Manages user signup process and SendFox integration
- `send-email`: Handles email communications
- `sync-to-sheets`: Syncs data with Google Sheets

To deploy functions:
```bash
supabase functions deploy <function-name>
```

## Deployment

The application can be deployed to various platforms. See the following guides for detailed instructions:

- [Docker Deployment](deployment-docker.md)
- [Digital Ocean Deployment](deployment-digitalocean.md)
- [AWS Deployment](deployment-aws.md)
- [Netlify Deployment](deployment-netlify.md)

### Quick Deployment Scripts

- `npm run deploy:docker` - Deploy using Docker Compose
- `npm run deploy:digitalocean` - Deploy to Digital Ocean App Platform
- `npm run deploy:aws` - Deploy to AWS S3 and CloudFront
- `npm run deploy:netlify` - Deploy to Netlify

## Project Structure

```
├── .github/workflows    # GitHub Actions workflows
├── public/              # Static assets
├── scripts/             # Deployment and utility scripts
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
│   ├── functions/       # Edge functions
│   └── migrations/      # Database migrations
├── .env.example         # Example environment variables
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Docker configuration
└── vite.config.ts       # Vite configuration
```

## Contributing

Please read our contributing guidelines and follow the code of conduct. We welcome contributions from the community!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the BLKOUTNXT team or open an issue in the GitHub repository.