# GitHub Pages Deployment Guide

## Quick Setup

### 1. Update Repository Name
In `vite.config.js`, replace `your-repo-name` with your actual GitHub repository name:
```js
base: process.env.NODE_ENV === 'production' ? '/your-actual-repo-name/' : '/',
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Setup for GitHub Pages deployment"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: / (root)
6. Click **Save**

### 4. Deploy
- **Option A**: Use GitHub Actions (automatic)
  - The workflow will automatically build and deploy when you push to main
  - Check Actions tab for deployment status
  
- **Option B**: Manual deployment
  ```bash
  npm run build
  # Then manually upload dist/ folder contents to GitHub Pages
  ```

## Your Site URL
Your portfolio will be available at:
`https://nate-chambers.github.io/your-repo-name/`

## Troubleshooting
- **404 errors**: Make sure base path in vite.config.js matches your repo name
- **Build failures**: Check Actions tab for error details
- **Assets not loading**: Verify all paths are relative and base path is correct

## Custom Domain (Optional)
If you want a custom domain:
1. Add CNAME record pointing to `yourusername.github.io`
2. In repository settings, add custom domain
3. Enable HTTPS enforcement
