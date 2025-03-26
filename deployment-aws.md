## AWS Deployment Instructions

To deploy your application to AWS:

1. Make sure you have the AWS CLI installed and configured with your credentials:
   ```bash
   # Install AWS CLI
   pip install awscli

   # Configure AWS credentials
   aws configure
   ```

2. Check and update the AWS deployment script as needed:
   - Open `scripts/deploy-aws.sh`
   - Make sure it's configured with your specific AWS settings

3. Run the AWS deployment script:
   ```bash
   npm run deploy:aws
   ```

### Alternative: Manual deployment to AWS S3 and CloudFront

If you want to manually deploy your static site to AWS S3 and CloudFront:

1. Build your application:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` folder to an S3 bucket:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/ --delete
   ```

3. If you're using CloudFront, invalidate the cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

### Alternative: Deploy using AWS Amplify

AWS Amplify provides an easy way to deploy and host React applications:

1. Install the Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure Amplify:
   ```bash
   amplify configure
   ```

3. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

4. Add hosting:
   ```bash
   amplify add hosting
   ```

5. Publish your app:
   ```bash
   amplify publish
   ```