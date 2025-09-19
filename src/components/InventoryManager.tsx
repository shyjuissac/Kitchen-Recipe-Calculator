import React, { useState, useEffect } from 'react';
import { InventoryItem, StockTransaction, StockAlert } from '../types/Inventory';
import { Package, Plus, Minus, AlertTriangle, TrendingUp, TrendingDown, Search, Filter, Calendar, DollarSign, MapPin, User } from 'lucide-react';

interface InventoryManagerProps {
  inventory: InventoryItem[];
  transactions: StockTransaction[];
  alerts: StockAlert[];
  onAddItem: (item: InventoryItem) => void;
  onUpdateItem: (item: InventoryItem) => void;
  onDeleteItem: (itemId: string) => void;
  onAddTransaction: (transaction: StockTransaction) => void;
  onAcknowledgeAlert: (alertId: string) => void;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({
  inventory,
  transactions,
  alerts,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onAddTransaction,
  onAcknowledgeAlert
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'transactions' | 'alerts' | 'reports'>('inventory');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStockForm, setShowStockForm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    currentStock: 0,
    unit: 'g',
    minimumStock: 0,
    maximumStock: 1000,
    costPerUnit: 0,
    category: 'other',
    isActive: true
  });
  const [stockFormData, setStockFormData] = useState({
    type: 'inbound' as 'inbound' | 'outbound' | 'adjustment' | 'waste',
    quantity: 0,
    reason: '',
    cost: 0,
    supplier: '',
    batchNumber: '',
    expiryDate: ''
  });

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'flour', label: 'Flour & Grains' },
    { value: 'sugar', label: 'Sugar & Sweeteners' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'nuts', label: 'Nuts & Seeds' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'spices', label: 'Spices & Flavorings' },
    { value: 'other', label: 'Other' }
  ];

  const units = ['g', 'kg', 'ml', 'l', 'piece', 'tsp', 'tbsp', 'cup'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minimumStock);
  const expiredItems = inventory.filter(item => 
    item.expiryDate && new Date(item.expiryDate) < new Date()
  );
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  const handleAddItem = () => {
    if (!formData.name) return;
    
    const newItem: InventoryItem = {
      id: generateId(),
      name: formData.name,
      currentStock: formData.currentStock || 0,
      unit: formData.unit || 'g',
      minimumStock: formData.minimumStock || 0,
      maximumStock: formData.maximumStock || 1000,
      costPerUnit: formData.costPerUnit || 0,
      supplier: formData.supplier,
      lastRestocked: new Date(),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
      location: formData.location,
      category: formData.category || 'other',
      isActive: true
    };

    onAddItem(newItem);
    setFormData({
      name: '',
      currentStock: 0,
      unit: 'g',
      minimumStock: 0,
      maximumStock: 1000,
      costPerUnit: 0,
      category: 'other',
      isActive: true
    });
    setShowAddForm(false);
  };

  const handleStockTransaction = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item || stockFormData.quantity <= 0) return;

    const transaction: StockTransaction = {
      id: generateId(),
      inventoryItemId: itemId,
      type: stockFormData.type,
      quantity: stockFormData.quantity,
      unit: item.unit,
      reason: stockFormData.reason,
      cost: stockFormData.cost || undefined,
      supplier: stockFormData.supplier || undefined,
      batchNumber: stockFormData.batchNumber || undefined,
      expiryDate: stockFormData.expiryDate ? new Date(stockFormData.expiryDate) : undefined,
      timestamp: new Date()
    };

    onAddTransaction(transaction);

    // Update item stock
    const updatedItem = { ...item };
    if (stockFormData.type === 'inbound') {
      updatedItem.currentStock += stockFormData.quantity;
      updatedItem.lastRestocked = new Date();
    } else {
      updatedItem.currentStock -= stockFormData.quantity;
    }

    onUpdateItem(updatedItem);

    setStockFormData({
      type: 'inbound',
      quantity: 0,
      reason: '',
      cost: 0,
      supplier: '',
      batchNumber: '',
      expiryDate: ''
    });
    setShowStockForm(null);
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= 0) return { status: 'out', color: 'text-red-600 bg-red-100', label: 'Out of Stock' };
    if (item.currentStock <= item.minimumStock) return { status: 'low', color: 'text-orange-600 bg-orange-100', label: 'Low Stock' };
    if (item.currentStock >= item.maximumStock) return { status: 'high', color: 'text-blue-600 bg-blue-100', label: 'Overstock' };
    return { status: 'normal', color: 'text-green-600 bg-green-100', label: 'Normal' };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  };

  const tabs = [
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'transactions', name: 'Transactions', icon: TrendingUp },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle, badge: alerts.filter(a => !a.acknowledged).length },
    { id: 'reports', name: 'Reports', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{inventory.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{lowStockItems.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-600">Expired</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{expiredItems.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-white'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                  {tab.badge && tab.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search ingredients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Ingredient
                </button>
              </div>

              {/* Add Form */}
              {showAddForm && (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Add New Ingredient</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={formData.name || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Current stock"
                        value={formData.currentStock || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentStock: parseFloat(e.target.value) || 0 }))}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select
                        value={formData.unit || 'g'}
                        onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                    <select
                      value={formData.category || 'other'}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Minimum stock"
                      value={formData.minimumStock || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimumStock: parseFloat(e.target.value) || 0 }))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Cost per unit"
                      step="0.01"
                      value={formData.costPerUnit || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, costPerUnit: parseFloat(e.target.value) || 0 }))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Supplier (optional)"
                      value={formData.supplier || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleAddItem}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Add Ingredient
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Inventory List */}
              <div className="space-y-3">
                {filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item);
                  return (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                              {stockStatus.label}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Stock:</span> {item.currentStock} {item.unit}
                            </div>
                            <div>
                              <span className="font-medium">Min:</span> {item.minimumStock} {item.unit}
                            </div>
                            <div>
                              <span className="font-medium">Cost:</span> {formatCurrency(item.costPerUnit)}/{item.unit}
                            </div>
                            <div>
                              <span className="font-medium">Value:</span> {formatCurrency(item.currentStock * item.costPerUnit)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowStockForm(item.id)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded transition-colors"
                            title="Manage Stock"
                          >
                            <Package className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Management Form */}
                      {showStockForm === item.id && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                          <h5 className="font-semibold text-gray-800 mb-3">Manage Stock: {item.name}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <select
                              value={stockFormData.type}
                              onChange={(e) => setStockFormData(prev => ({ ...prev, type: e.target.value as any }))}
                              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="inbound">Stock In</option>
                              <option value="outbound">Stock Out</option>
                              <option value="adjustment">Adjustment</option>
                              <option value="waste">Waste</option>
                            </select>
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={stockFormData.quantity || ''}
                              onChange={(e) => setStockFormData(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Reason"
                              value={stockFormData.reason}
                              onChange={(e) => setStockFormData(prev => ({ ...prev, reason: e.target.value }))}
                              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleStockTransaction(item.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              Update Stock
                            </button>
                            <button
                              onClick={() => setShowStockForm(null)}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <div className="space-y-2">
                {transactions.slice(0, 50).map((transaction) => {
                  const item = inventory.find(i => i.id === transaction.inventoryItemId);
                  const isInbound = transaction.type === 'inbound';
                  return (
                    <div key={transaction.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isInbound ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-800">{item?.name || 'Unknown Item'}</h4>
                            <p className="text-sm text-gray-600">
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} • {transaction.reason}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${isInbound ? 'text-green-600' : 'text-red-600'}`}>
                            {isInbound ? '+' : '-'}{transaction.quantity} {transaction.unit}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Stock Alerts</h3>
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`rounded-lg p-4 border-l-4 ${
                    alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                    alert.severity === 'high' ? 'bg-orange-50 border-orange-500' :
                    alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.severity === 'critical' ? 'text-red-500' :
                          alert.severity === 'high' ? 'text-orange-500' :
                          alert.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <div>
                          <h4 className="font-semibold text-gray-800">{alert.itemName}</h4>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                        </div>
                      </div>
                      {!alert.acknowledged && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Inventory Reports</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Low Stock Items</h4>
                  <div className="space-y-2">
                    {lowStockItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-red-600 font-medium">{item.currentStock} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Top Value Items</h4>
                  <div className="space-y-2">
                    {inventory
                      .sort((a, b) => (b.currentStock * b.costPerUnit) - (a.currentStock * a.costPerUnit))
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="text-green-600 font-medium">
                            {formatCurrency(item.currentStock * item.costPerUnit)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;