# Deployment Guide

## Quick Deploy Options

### 1. Netlify (Recommended)
1. Drag and drop the `dist/` folder to netlify.com/drop
2. Or connect your Git repository for automatic deployments

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

### 3. GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source as GitHub Actions
4. Use the provided workflow file

### 4. Any Static Host
1. Run `npm run build`
2. Upload contents of `dist/` folder
3. Configure server to serve `index.html` for all routes

## Server Configuration

For SPA routing, configure your server to serve `index.html` for all routes:

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Node.js/Express
```javascript
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
```

## Environment Variables

No environment variables required - the app runs entirely client-side.

## Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Custom Server

The included `server.cjs` provides a simple Node.js server:

```bash
node server.cjs
```

This serves the built files and handles SPA routing automatically.