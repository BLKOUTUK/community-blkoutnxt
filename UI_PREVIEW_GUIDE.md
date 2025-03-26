# UI Preview Guide

This guide explains different ways to preview the UI components before deploying your application.

## 1. Local Development Server

The simplest way to preview your UI is to run the development server:

```bash
npm run dev
```

This will start a local development server (typically at http://localhost:5173) with hot module reloading.

## 2. Dedicated Preview Page

We've created a dedicated preview page that showcases all the UI components with mock data:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   ```
   http://localhost:5173/preview
   ```

This page includes:
- Community Showcase component
- Notification system
- Personalized Entry Points
- Call-to-Action variants
- Signup Form
- Engagement metrics

All components on this page use mock data, so you don't need a database connection to preview them.

## 3. Production Build Preview

To see how your UI will look in production:

```bash
npm run build
npm run preview
```

This builds the application for production and serves it locally.

## 4. Component-Specific Preview

For individual components, you can:

1. Navigate to the preview page
2. Use the tabs to select specific component categories
3. View different variants and states of each component

## 5. Mobile Preview

To preview how your UI looks on mobile devices:

1. Run the development server
2. Open your browser's developer tools (F12 or right-click > Inspect)
3. Enable device emulation (usually an icon that looks like a phone/tablet)
4. Select different device sizes to see how your UI adapts

## 6. Setting Up Storybook (Optional)

For more advanced component development and testing, you can set up Storybook:

See the `setup-storybook.md` file for detailed instructions.

## Environment Variables for Preview

The preview page works without any environment variables, as it uses mock data. However, if you want to connect to your actual data sources:

1. Create a `.env.local` file with your API keys:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_AIRTABLE_API_KEY=your_airtable_api_key
   VITE_AIRTABLE_BASE_ID=your_airtable_base_id
   ```

2. Restart your development server

## Troubleshooting Preview Issues

If you encounter issues with the preview:

1. **Components not rendering**: Check the console for errors
2. **Styling issues**: Make sure Tailwind is properly configured
3. **Mock data not appearing**: Verify that the mock data is correctly defined in the Preview component
4. **Authentication errors**: The preview page doesn't require authentication, but if you're testing authenticated features, you may need to log in first