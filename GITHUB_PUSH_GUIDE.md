# Pushing Your Project to GitHub

This guide will help you push your project to GitHub using the provided scripts.

## Prerequisites

1. [Install Git](https://git-scm.com/downloads) on your computer if you haven't already
2. Have access to an existing GitHub repository or [create a new one](https://github.com/new)

## Pushing to an Existing GitHub Repository

### For macOS/Linux Users

1. Open your terminal
2. Navigate to your project directory
3. Run the following command:

```bash
npm run github:push
```

4. Follow the prompts:
   - Enter the GitHub repository URL (e.g., `https://github.com/yourusername/your-repo-name.git`)
   - Choose whether to pull from the repository first
   - Enter a commit message
   - Enter a branch name (or press Enter for the default "main")

### For Windows Users

1. Open Command Prompt or PowerShell
2. Navigate to your project directory
3. Run the following command:

```bash
npm run github:push:win
```

4. Follow the prompts:
   - Enter the GitHub repository URL (e.g., `https://github.com/yourusername/your-repo-name.git`)
   - Choose whether to pull from the repository first
   - Enter a commit message
   - Enter a branch name (or press Enter for the default "main")

## Manual Push (Alternative Method)

If you prefer to push manually, follow these steps:

1. Initialize a Git repository (if not already done):
   ```bash
   git init
   ```

2. Add the remote repository:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```

3. Pull from the existing repository (optional, but recommended for existing repos):
   ```bash
   git pull origin main --allow-unrelated-histories
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Commit your changes:
   ```bash
   git commit -m "Your commit message"
   ```

6. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Handling Common Issues

### Dealing with Merge Conflicts

If you encounter merge conflicts when pulling from an existing repository:

1. Resolve the conflicts in your code editor
2. Add the resolved files:
   ```bash
   git add .
   ```
3. Commit the resolved conflicts:
   ```bash
   git commit -m "Resolve merge conflicts"
   ```
4. Continue with your push

### Authentication Issues

If you encounter authentication issues:

1. Make sure you have the correct permissions for the repository
2. Consider using a personal access token instead of a password
3. Set up SSH keys for easier authentication

## Setting Up GitHub Actions

The repository already includes a GitHub Actions workflow file (`.github/workflows/ci-cd.yml`) that will:

1. Build and test your application on every push and pull request
2. Deploy to production when changes are merged to the main branch

To use GitHub Actions:

1. Go to your repository on GitHub
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `VITE_APP_URL`: Your application URL

4. Update the deployment step in `.github/workflows/ci-cd.yml` with your preferred deployment method.

## Next Steps

After pushing your code to GitHub, you can:

1. Set up branch protection rules
2. Configure GitHub Actions for CI/CD
3. Add collaborators to your repository
4. Set up project boards for task management
5. Enable GitHub Pages for documentation

For more information, refer to the [GitHub documentation](https://docs.github.com/).