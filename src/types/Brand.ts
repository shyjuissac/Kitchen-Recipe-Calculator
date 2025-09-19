export interface BrandSettings {
  id: string;
  companyName: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoWidth?: number;
  logoHeight?: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headerBackgroundColor: string;
  cardBackgroundColor: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  headerBackgroundColor: string;
  cardBackgroundColor: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  fontFamily: string;
  headingFontFamily: string;
  fontSize: string;
  headingFontWeight: string;
  bodyFontWeight: string;
  headingFontFamily: string;
  fontSize: string;
  headingFontWeight: string;
  bodyFontWeight: string;
  headerTitle: string;
  headerSubtitle: string;
  footerText?: string;
  customCSS?: string;
  borderRadius: string;
  shadowIntensity: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  cardStyle: 'flat' | 'elevated' | 'outlined';
  footerText?: string;
  customCSS?: string;
  borderRadius: string;
  shadowIntensity: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  cardStyle: 'flat' | 'elevated' | 'outlined';
}

export const defaultBrandSettings: BrandSettings = {
  id: 'default',
  companyName: 'Kitchen Recipe Calculator',
  logoWidth: 32,
  logoHeight: 32,
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
  footerText: '',
  customCSS: '',
  borderRadius: '8px',
  shadowIntensity: 'medium',
  buttonStyle: 'rounded',
  cardStyle: 'elevated'
};