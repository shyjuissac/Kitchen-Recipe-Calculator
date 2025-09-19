import React, { useState } from 'react';
import { CookieRecipe, Category } from '../types/Recipe';
import { BrandSettings } from '../types/Brand';
import { InventoryItem, StockTransaction, StockAlert } from '../types/Inventory';
import { Download, Upload, FileText, AlertCircle, CheckCircle, Copy } from 'lucide-react';

interface DataManagerProps {
  recipes: CookieRecipe[];
  categories: Category[];
  brandSettings: BrandSettings;
  inventory: InventoryItem[];
  transactions: StockTransaction[];
  alerts: StockAlert[];
  onImportData: (data: any) => void;
}

const DataManager: React.FC<DataManagerProps> = ({
  recipes,
  categories,
  brandSettings,
  inventory,
  transactions,
  alerts,
  onImportData
}) => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const [exportFormat, setExportFormat] = useState<'complete' | 'recipes-only' | 'inventory-only'>('complete');

  const generateExportData = (format: string) => {
    const timestamp = new Date().toISOString();
    const baseData = {
      exportDate: timestamp,
      version: '1.0',
      appName: 'Kitchen Recipe Calculator'
    };

    switch (format) {
      case 'recipes-only':
        return {
          ...baseData,
          type: 'recipes-only',
          recipes,
          categories
        };
      case 'inventory-only':
        return {
          ...baseData,
          type: 'inventory-only',
          inventory,
          transactions,
          alerts
        };
      case 'complete':
      default:
        return {
          ...baseData,
          type: 'complete',
          recipes,
          categories,
          brandSettings,
          inventory,
          transactions,
          alerts
        };
    }
  };

  const handleExport = () => {
    try {
      const data = generateExportData(exportFormat);
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `recipe-calculator-${exportFormat}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setImportStatus('success');
      setImportMessage('Data exported successfully!');
      setTimeout(() => setImportStatus('idle'), 3000);
    } catch (error) {
      setImportStatus('error');
      setImportMessage('Failed to export data. Please try again.');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        // Validate the data structure
        if (!jsonData.version || !jsonData.appName) {
          throw new Error('Invalid file format');
        }

        onImportData(jsonData);
        setImportStatus('success');
        setImportMessage('Data imported successfully!');
        setTimeout(() => setImportStatus('idle'), 3000);
      } catch (error) {
        setImportStatus('error');
        setImportMessage('Invalid file format. Please select a valid export file.');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const copyToClipboard = async () => {
    try {
      const data = generateExportData(exportFormat);
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setImportStatus('success');
      setImportMessage('Data copied to clipboard!');
      setTimeout(() => setImportStatus('idle'), 3000);
    } catch (error) {
      setImportStatus('error');
      setImportMessage('Failed to copy to clipboard.');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  const getDataSummary = () => {
    return {
      recipes: recipes.length,
      categories: categories.length,
      inventoryItems: inventory.length,
      transactions: transactions.length,
      alerts: alerts.filter(a => !a.acknowledged).length
    };
  };

  const summary = getDataSummary();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Data Management
        </h3>

        {/* Status Message */}
        {importStatus !== 'idle' && (
          <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            importStatus === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {importStatus === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {importMessage}
          </div>
        )}

        {/* Data Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Current Data Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-lg">{summary.recipes}</div>
              <div className="text-gray-600">Recipes</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600 text-lg">{summary.categories}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 text-lg">{summary.inventoryItems}</div>
              <div className="text-gray-600">Inventory Items</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600 text-lg">{summary.transactions}</div>
              <div className="text-gray-600">Transactions</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-600 text-lg">{summary.alerts}</div>
              <div className="text-gray-600">Active Alerts</div>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Download className="w-4 h-4 text-green-500" />
            Export Data
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Export Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="complete">Complete Backup (All Data)</option>
                <option value="recipes-only">Recipes & Categories Only</option>
                <option value="inventory-only">Inventory Data Only</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download File
              </button>
              
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
            </div>

            <div className="text-xs text-gray-500">
              {exportFormat === 'complete' && 'Exports all recipes, categories, inventory, transactions, alerts, and brand settings.'}
              {exportFormat === 'recipes-only' && 'Exports only recipes and categories - perfect for sharing recipe collections.'}
              {exportFormat === 'inventory-only' && 'Exports inventory items, transactions, and alerts only.'}
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-500" />
            Import Data
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Export File
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <strong>Important:</strong> Importing data will merge with your existing data. 
                  Items with the same ID will be updated. Consider exporting your current data first as a backup.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">How to Use Import/Export</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Backup:</strong> Export "Complete Backup" regularly to save all your data</li>
          <li>• <strong>Share Recipes:</strong> Export "Recipes Only" to share with other kitchens</li>
          <li>• <strong>Transfer Data:</strong> Export from one device, import on another</li>
          <li>• <strong>Restore:</strong> Import a backup file to restore previous data</li>
          <li>• <strong>Collaborate:</strong> Team members can share recipe collections</li>
        </ul>
      </div>
    </div>
  );
};

export default DataManager;