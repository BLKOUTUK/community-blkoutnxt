## Netlify Deployment Instructions

To deploy your application to Netlify:

1. Make sure you have the Netlify CLI installed:
   ```bash
   npm install -g netlify-cli
   ```

2. Authenticate with Netlify:
   ```bash
   netlify login
   ```

3. Update the Netlify site ID in the deployment script:
   - Open `scripts/deploy-netlify.sh`
   - Replace `your-netlify-site-id` with your actual Netlify site ID

4. Run the deployment script:
   ```bash
   npm run deploy:netlify
   ```

This will build your application and deploy it to Netlify. If you're on the main branch, it will deploy to production. Otherwise, it will create a preview deployment.

### Alternative: Deploy directly from the Netlify dashboard

1. Build your application:
   ```bash
   npm run build
   ```

2. Go to the Netlify dashboard and drag-and-drop your `dist` folder to deploy manually.

### Alternative: Connect to GitHub repository

For continuous deployment:

1. Push your code to GitHub
2. In the Netlify dashboard, go to "Sites" > "Add new site" > "Import an existing project"
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"