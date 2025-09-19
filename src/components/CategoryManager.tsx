import React, { useState } from 'react';
import { Category } from '../types/Recipe';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  recipes: any[]; // To check if category is in use
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  recipes
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const getCategoryRecipeCount = (categoryId: string): number => {
    return recipes.filter(recipe => recipe.categoryId === categoryId).length;
  };

  const handleStartEdit = (category: Category) => {
    setIsEditing(category.id);
    setEditForm({ name: category.name, description: category.description || '' });
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditForm({ name: '', description: '' });
  };

  const handleSave = () => {
    if (isAdding) {
      const newCategory: Category = {
        id: generateId(editForm.name),
        name: editForm.name,
        description: editForm.description || undefined
      };
      onAddCategory(newCategory);
      setIsAdding(false);
    } else if (isEditing) {
      const updatedCategory: Category = {
        id: isEditing,
        name: editForm.name,
        description: editForm.description || undefined
      };
      onUpdateCategory(updatedCategory);
      setIsEditing(null);
    }
    setEditForm({ name: '', description: '' });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({ name: '', description: '' });
  };

  const handleDelete = (categoryId: string) => {
    const recipeCount = getCategoryRecipeCount(categoryId);
    if (recipeCount > 0) {
      alert(`Cannot delete category. It contains ${recipeCount} recipe${recipeCount > 1 ? 's' : ''}.`);
      return;
    }

    if (deleteConfirm === categoryId) {
      onDeleteCategory(categoryId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(categoryId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Manage Categories</h3>
        <button
          onClick={handleStartAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {isAdding && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Category name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!editForm.name.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 rounded-lg p-4">
            {isEditing === category.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description (optional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!editForm.name.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">{category.name}</h4>
                  {category.description && (
                    <p className="text-sm text-gray-600">{category.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {getCategoryRecipeCount(category.id)} recipe{getCategoryRecipeCount(category.id) !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartEdit(category)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={getCategoryRecipeCount(category.id) > 0}
                    className={`p-2 rounded transition-colors ${
                      getCategoryRecipeCount(category.id) > 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : deleteConfirm === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 hover:bg-red-200 text-red-600'
                    }`}
                    title={
                      getCategoryRecipeCount(category.id) > 0
                        ? 'Cannot delete - category contains recipes'
                        : deleteConfirm === category.id
                        ? 'Click again to confirm'
                        : 'Delete Category'
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;