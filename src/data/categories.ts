import { Category } from '../types/Recipe';
import { BrandSettings } from '../types/Brand';

export const defaultCategories: Category[] = [
  {
    id: 'cookies',
    name: 'Cookies',
    description: 'Artisan cookie recipes'
  },
  {
    id: 'large-cheesecakes',
    name: 'Large Cheesecakes',
    description: 'Full-size cheesecake recipes'
  },
  {
    id: 'mini-cheesecakes',
    name: 'Mini Cheesecakes',
    description: 'Individual portion cheesecakes'
  },
  {
    id: 'caramels',
    name: 'Caramels',
    description: 'Caramel and toffee products'
  }
];

export const defaultBrandSettings: BrandSettings = {
  id: 'default',
  companyName: 'Kitchen Recipe Calculator',
  logoWidth: 32,
  logoHeight: 32,
  primaryColor: '#2563eb', // blue-600
  secondaryColor: '#7c3aed', // purple-600
  accentColor: '#059669', // green-600
  backgroundColor: '#f8fafc', // slate-50
  textColor: '#1f2937', // gray-800
  headerBackgroundColor: '#ffffff',
  cardBackgroundColor: '#ffffff',
  borderColor: '#e5e7eb',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  fontFamily: 'Inter, system-ui, sans-serif',
  headingFontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '16px',
  headingFontWeight: '600',
  bodyFontWeight: '400',
  headerTitle: 'Kitchen Recipe Calculator',
  headerSubtitle: 'Scale recipes to exact quantities',
  footerText: '',
  customCSS: '',
  borderRadius: '8px',
  shadowIntensity: 'medium',
  buttonStyle: 'rounded',
  cardStyle: 'elevated'
};