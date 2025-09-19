# Kitchen Recipe Calculator

A professional recipe scaling application designed for commercial kitchens and food service operations.

## Features

- **Recipe Management**: Add, edit, and organize recipes with categories
- **Intelligent Scaling**: Calculate exact ingredient quantities for any batch size
- **Sub-Recipe Support**: Handle complex recipes with multiple components
- **Inventory Management**: Track ingredients, stock levels, and costs
- **User Authentication**: Role-based access (Manager/Kitchen Staff)
- **Brand Customization**: Customize colors, fonts, and branding
- **Data Import/Export**: Backup and share recipe collections
- **Mobile Responsive**: Works perfectly on tablets and phones

## Quick Start

### Option 1: Development Server (Recommended)
```bash
npm install
npm run dev
```

### Option 2: Production Build + Custom Server
```bash
npm install
npm run build
node server.cjs
```

Then open http://localhost:8080 in your browser.

## Demo Accounts

- **Manager**: username: `manager`, password: `manager123`
  - Full access to all features including admin panel
- **Kitchen Staff**: username: `staff`, password: `staff123`
  - Recipe viewing and calculation only

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── data/               # Default recipes and categories
└── App.tsx             # Main application component

public/                 # Static assets (images)
dist/                   # Built production files
server.cjs              # Custom Node.js server
```

## Key Components

- **Recipe Calculator**: Scale recipes to exact quantities
- **Admin Panel**: Manage recipes, categories, inventory, and branding
- **Inventory System**: Track ingredients and stock levels
- **Brand Manager**: Customize appearance and branding
- **Data Manager**: Import/export functionality

## Technologies Used

- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Local Storage for data persistence
- Vite for development and building

## Deployment

The app can be deployed to any static hosting service:

1. Run `npm run build`
2. Upload the `dist/` folder contents
3. Configure server to serve `index.html` for all routes (SPA)

## Data Management

- All data is stored locally in browser storage
- Use the Import/Export feature to backup and share data
- Supports complete backups or recipe-only exports

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## License

This is a custom application built for kitchen operations.