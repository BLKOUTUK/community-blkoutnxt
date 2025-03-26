# Pushing Your Project to BLKOUT GitHub Repository

This guide will help you push your project to the BLKOUT GitHub repository using the provided scripts.

## Repository Information

- Repository URL: https://github.com/BLKOUTUK/community-blkoutnxt.git

## Pushing to the Repository

### For macOS/Linux Users

1. Open your terminal
2. Navigate to your project directory
3. Run the following command:

```bash
npm run github:push:blkout
```

4. Follow the prompts:
   - Choose whether to pull from the repository first (recommended if others have made changes)
   - Enter a commit message describing your changes
   - Enter a branch name (or press Enter for the default "main")

### For Windows Users

1. Open Command Prompt or PowerShell
2. Navigate to your project directory
3. Run the following command:

```bash
npm run github:push:blkout:win
```

4. Follow the prompts:
   - Choose whether to pull from the repository first (recommended if others have made changes)
   - Enter a commit message describing your changes
   - Enter a branch name (or press Enter for the default "main")

## Handling Common Issues

### Authentication Issues

If you encounter authentication issues:

1. Make sure you have the correct permissions for the repository
2. You might need to set up a personal access token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with appropriate permissions
   - Use this token instead of your password when prompted

3. Or set up SSH keys for easier authentication:
   - Generate SSH keys: `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - Add the public key to your GitHub account
   - Update the remote URL to use SSH: `git remote set-url origin git@github.com:BLKOUTUK/community-blkoutnxt.git`

### Merge Conflicts

If you encounter merge conflicts when pulling from the repository:

1. Resolve the conflicts in your code editor
2. Add the resolved files: `git add .`
3. Commit the resolved conflicts: `git commit -m "Resolve merge conflicts"`
4. Continue with your push

## Manual Push (Alternative Method)

If you prefer to push manually, follow these steps:

1. Initialize a Git repository (if not already done):
   ```bash
   git init
   ```

2. Add the remote repository:
   ```bash
   git remote add origin https://github.com/BLKOUTUK/community-blkoutnxt.git
   ```

3. Pull from the existing repository (optional, but recommended):
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

## Next Steps

After pushing your code to GitHub, you can:

1. Create pull requests for your changes
2. Review and comment on others' pull requests
3. Track issues and feature requests
4. Collaborate with other contributors

For more information, refer to the [GitHub documentation](https://docs.github.com/).