import React, { useState } from 'react';
import { BrandSettings } from '../types/Brand';
import { Palette, Save, RotateCcw, Upload, Eye, Code, Type, Layout, Paintbrush } from 'lucide-react';

interface BrandManagerProps {
  brandSettings: BrandSettings;
  onUpdateBrand: (settings: BrandSettings) => void;
}

const BrandManager: React.FC<BrandManagerProps> = ({ brandSettings, onUpdateBrand }) => {
  const [formData, setFormData] = useState<BrandSettings>(brandSettings);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState<'basic' | 'colors' | 'typography' | 'layout' | 'advanced'>('basic');

  const handleSave = () => {
    onUpdateBrand(formData);
    setPreviewMode(false);
  };

  const handleReset = () => {
    setFormData(brandSettings);
    setPreviewMode(false);
  };

  const colorPresets = [
    { name: 'Ocean Blue', primary: '#2563eb', secondary: '#7c3aed', accent: '#059669', bg: '#f8fafc' },
    { name: 'Forest Green', primary: '#059669', secondary: '#0d9488', accent: '#f59e0b', bg: '#f0fdf4' },
    { name: 'Sunset Orange', primary: '#ea580c', secondary: '#dc2626', accent: '#7c3aed', bg: '#fff7ed' },
    { name: 'Royal Purple', primary: '#7c3aed', secondary: '#c026d3', accent: '#2563eb', bg: '#faf5ff' },
    { name: 'Professional Gray', primary: '#374151', secondary: '#6b7280', accent: '#2563eb', bg: '#f9fafb' },
    { name: 'Warm Cream', primary: '#92400e', secondary: '#b45309', accent: '#059669', bg: '#fffbeb' }
  ];

  const fontOptions = [
    'Inter, system-ui, sans-serif',
    'Roboto, sans-serif',
    'Open Sans, sans-serif',
    'Lato, sans-serif',
    'Poppins, sans-serif',
    'Montserrat, sans-serif',
    'Playfair Display, serif',
    'Merriweather, serif',
    'Source Sans Pro, sans-serif',
    'Nunito, sans-serif'
  ];

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setFormData(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.bg
    }));
  };

  const previewStyles = previewMode ? {
    '--primary-color': formData.primaryColor,
    '--secondary-color': formData.secondaryColor,
    '--accent-color': formData.accentColor,
    '--bg-color': formData.backgroundColor,
    '--text-color': formData.textColor,
    '--header-bg-color': formData.headerBackgroundColor,
    '--card-bg-color': formData.cardBackgroundColor,
    '--border-color': formData.borderColor,
    '--font-family': formData.fontFamily,
    '--heading-font-family': formData.headingFontFamily,
    '--font-size': formData.fontSize,
    '--border-radius': formData.borderRadius
  } as React.CSSProperties : {};

  const sections = [
    { id: 'basic', name: 'Basic Info', icon: Layout },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'advanced', name: 'Advanced', icon: Code }
  ];

  return (
    <div className="space-y-6" style={previewStyles}>
      {previewMode && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Eye className="w-4 h-4" />
            <span className="font-medium">Preview Mode Active</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            This is how your branding will look. Save to apply changes permanently.
          </p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Section Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600 bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Basic Information */}
          {activeSection === 'basic' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Header Title</label>
                  <input
                    type="text"
                    value={formData.headerTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, headerTitle: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Header Subtitle</label>
                  <input
                    type="text"
                    value={formData.headerSubtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, headerSubtitle: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Footer Text (optional)</label>
                  <input
                    type="text"
                    value={formData.footerText || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, footerText: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Logo URL</label>
                <input
                  type="url"
                  value={formData.logo || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Logo Width (px)</label>
                  <input
                    type="number"
                    value={formData.logoWidth || 32}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoWidth: parseInt(e.target.value) || 32 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Logo Height (px)</label>
                  <input
                    type="number"
                    value={formData.logoHeight || 32}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoHeight: parseInt(e.target.value) || 32 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Colors */}
          {activeSection === 'colors' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Scheme</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'primaryColor', label: 'Primary Color', desc: 'Main brand color' },
                  { key: 'secondaryColor', label: 'Secondary Color', desc: 'Accent brand color' },
                  { key: 'accentColor', label: 'Accent Color', desc: 'Highlight color' },
                  { key: 'backgroundColor', label: 'Background', desc: 'Page background' },
                  { key: 'headerBackgroundColor', label: 'Header Background', desc: 'Header area' },
                  { key: 'cardBackgroundColor', label: 'Card Background', desc: 'Content cards' },
                  { key: 'textColor', label: 'Text Color', desc: 'Main text' },
                  { key: 'borderColor', label: 'Border Color', desc: 'Element borders' },
                  { key: 'successColor', label: 'Success Color', desc: 'Success messages' },
                  { key: 'warningColor', label: 'Warning Color', desc: 'Warning messages' },
                  { key: 'errorColor', label: 'Error Color', desc: 'Error messages' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">{label}</label>
                    <p className="text-xs text-gray-500">{desc}</p>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData[key as keyof BrandSettings] as string}
                        onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData[key as keyof BrandSettings] as string}
                        onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-3">Color Presets</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }}></div>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }}></div>
                        <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: preset.bg }}></div>
                      </div>
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography */}
          {activeSection === 'typography' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Typography</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Body Font Family</label>
                  <select
                    value={formData.fontFamily}
                    onChange={(e) => setFormData(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font.split(',')[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Heading Font Family</label>
                  <select
                    value={formData.headingFontFamily}
                    onChange={(e) => setFormData(prev => ({ ...prev, headingFontFamily: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font.split(',')[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Base Font Size</label>
                  <select
                    value={formData.fontSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, fontSize: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="14px">Small (14px)</option>
                    <option value="16px">Medium (16px)</option>
                    <option value="18px">Large (18px)</option>
                    <option value="20px">Extra Large (20px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Heading Font Weight</label>
                  <select
                    value={formData.headingFontWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, headingFontWeight: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Body Font Weight</label>
                  <select
                    value={formData.bodyFontWeight}
                    onChange={(e) => setFormData(prev => ({ ...prev, bodyFontWeight: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Layout */}
          {activeSection === 'layout' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Layout & Style</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Border Radius</label>
                  <select
                    value={formData.borderRadius}
                    onChange={(e) => setFormData(prev => ({ ...prev, borderRadius: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="0px">None (0px)</option>
                    <option value="4px">Small (4px)</option>
                    <option value="8px">Medium (8px)</option>
                    <option value="12px">Large (12px)</option>
                    <option value="16px">Extra Large (16px)</option>
                    <option value="24px">Rounded (24px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Shadow Intensity</label>
                  <select
                    value={formData.shadowIntensity}
                    onChange={(e) => setFormData(prev => ({ ...prev, shadowIntensity: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Button Style</label>
                  <select
                    value={formData.buttonStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonStyle: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="rounded">Rounded</option>
                    <option value="square">Square</option>
                    <option value="pill">Pill</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Card Style</label>
                  <select
                    value={formData.cardStyle}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardStyle: e.target.value as any }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="flat">Flat</option>
                    <option value="elevated">Elevated</option>
                    <option value="outlined">Outlined</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Advanced */}
          {activeSection === 'advanced' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Customization</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Custom CSS</label>
                <p className="text-xs text-gray-500 mb-2">Add custom CSS to override default styles</p>
                <textarea
                  value={formData.customCSS || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCSS: e.target.value }))}
                  placeholder="/* Custom CSS */
.custom-button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

:root {
  --custom-spacing: 1.5rem;
}"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows={10}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Exit Preview' : 'Preview Changes'}
          </button>
          
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          
          <button
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Saved
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandManager;