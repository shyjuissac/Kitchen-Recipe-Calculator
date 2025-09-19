# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Extract the downloaded files** to your desired directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to the URL shown (usually http://localhost:5173)

## First Time Setup

1. **Login with demo account**:
   - Manager: `manager` / `manager123`
   - Staff: `staff` / `staff123`

2. **Customize your setup**:
   - Go to Admin Panel (managers only)
   - Update branding in the Branding tab
   - Add your own recipes and categories
   - Set up inventory items

3. **Import existing data** (optional):
   - Use the Import/Export tab in Admin Panel
   - Upload a previously exported JSON file

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service

3. **Configure server** to serve `index.html` for all routes (see DEPLOYMENT.md)

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Build Errors
Make sure you have Node.js 18+ installed:
```bash
node --version
npm --version
```

### Browser Compatibility
- Use modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Enable JavaScript
- Clear browser cache if experiencing issues

### Data Not Saving
- Check browser storage permissions
- Ensure you're not in incognito/private mode
- Try a different browser

## Support

This is a self-contained application. All data is stored locally in your browser.

For technical issues:
1. Check browser console for errors (F12)
2. Try clearing browser data
3. Test in a different browser
4. Restart the development server