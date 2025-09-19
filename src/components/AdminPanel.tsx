import React, { useState } from 'react';
import { CookieRecipe, Category } from '../types/Recipe';
import { BrandSettings } from '../types/Brand';
import { InventoryItem, StockTransaction, StockAlert } from '../types/Inventory';
import { Settings, Plus, Edit, Trash2, Save, X, Package } from 'lucide-react';
import RecipeForm from './RecipeForm';
import CategoryManager from './CategoryManager';
import BrandManager from './BrandManager';
import InventoryManager from './InventoryManager';
import DataManager from './DataManager';

interface AdminPanelProps {
  recipes: CookieRecipe[];
  categories: Category[];
  onAddRecipe: (recipe: CookieRecipe) => void;
  onUpdateRecipe: (recipe: CookieRecipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  brandSettings: BrandSettings;
  onUpdateBrand: (settings: BrandSettings) => void;
  inventory: InventoryItem[];
  transactions: StockTransaction[];
  alerts: StockAlert[];
  onAddInventoryItem: (item: InventoryItem) => void;
  onUpdateInventoryItem: (item: InventoryItem) => void;
  onDeleteInventoryItem: (itemId: string) => void;
  onAddTransaction: (transaction: StockTransaction) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onImportData: (data: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  recipes,
  categories,
  onAddRecipe,
  onUpdateRecipe,
  onDeleteRecipe,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  brandSettings,
  onUpdateBrand,
  inventory,
  transactions,
  alerts,
  onAddInventoryItem,
  onUpdateInventoryItem,
  onDeleteInventoryItem,
  onAddTransaction,
  onAcknowledgeAlert,
  onImportData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'recipes' | 'categories' | 'inventory' | 'branding' | 'data'>('recipes');
  const [editingRecipe, setEditingRecipe] = useState<CookieRecipe | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleAddNew = () => {
    setEditingRecipe(null);
    setShowForm(true);
  };

  const handleEdit = (recipe: CookieRecipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleSave = (recipe: CookieRecipe) => {
    if (editingRecipe) {
      onUpdateRecipe(recipe);
    } else {
      onAddRecipe(recipe);
    }
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleDelete = (recipeId: string) => {
    if (deleteConfirm === recipeId) {
      onDeleteRecipe(recipeId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(recipeId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
        title="Admin Panel"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  if (showForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <RecipeForm
              recipe={editingRecipe}
              categories={categories}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Management Panel</h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'recipes'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Recipes
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'inventory'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('branding')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'branding'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Branding
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'data'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Import/Export
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'recipes' ? (
            <>
              <button
                onClick={handleAddNew}
                className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Recipe
              </button>

              <div className="overflow-y-auto max-h-[50vh]">
                <div className="space-y-4">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                        <p className="text-sm text-gray-600">
                          {getCategoryName(recipe.categoryId)} • Makes {recipe.batchSize} {recipe.batchSize === 1 ? 'item' : 'items'}
                          {recipe.subRecipes.length > 0 && (
                            <span className="ml-2 text-orange-600">
                              • {recipe.subRecipes.length} sub-recipe{recipe.subRecipes.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(recipe)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded transition-colors"
                          title="Edit Recipe"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className={`p-2 rounded transition-colors ${
                            deleteConfirm === recipe.id
                              ? 'bg-red-600 text-white'
                              : 'bg-red-100 hover:bg-red-200 text-red-600'
                          }`}
                          title={deleteConfirm === recipe.id ? 'Click again to confirm' : 'Delete Recipe'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : activeTab === 'categories' ? (
            <div className="overflow-y-auto max-h-[60vh]">
              <CategoryManager
                categories={categories}
                recipes={recipes}
                onAddCategory={onAddCategory}
                onUpdateCategory={onUpdateCategory}
                onDeleteCategory={onDeleteCategory}
              />
            </div>
          ) : activeTab === 'inventory' ? (
            <div className="overflow-y-auto max-h-[60vh]">
              <InventoryManager
                inventory={inventory}
                transactions={transactions}
                alerts={alerts}
                onAddItem={onAddInventoryItem}
                onUpdateItem={onUpdateInventoryItem}
                onDeleteItem={onDeleteInventoryItem}
                onAddTransaction={onAddTransaction}
                onAcknowledgeAlert={onAcknowledgeAlert}
              />
            </div>
          ) : activeTab === 'branding' ? (
            <div className="overflow-y-auto max-h-[60vh]">
              <BrandManager
                brandSettings={brandSettings}
                onUpdateBrand={onUpdateBrand}
              />
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[60vh]">
              <DataManager
                recipes={recipes}
                categories={categories}
                brandSettings={brandSettings}
                inventory={inventory}
                transactions={transactions}
                alerts={alerts}
                onImportData={onImportData}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;