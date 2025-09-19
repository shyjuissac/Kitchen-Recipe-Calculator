import React, { useState, useEffect } from 'react';
import { CookieRecipe, Ingredient, SubRecipe, RecipeFormData, Category } from '../types/Recipe';
import { Plus, Minus, Save, X } from 'lucide-react';

interface RecipeFormProps {
  recipe?: CookieRecipe | null;
  categories: Category[];
  onSave: (recipe: CookieRecipe) => void;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    photo: '',
    categoryId: categories[0]?.id || '',
    batchSize: 5,
    ingredients: [{ name: '', amount: 0, unit: 'g' }],
    subRecipes: [],
    finalBuildElements: [{ name: '', weight: 0, unit: 'g', isSubRecipe: false }],
    instructions: ['']
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        photo: recipe.photo || '',
        categoryId: recipe.categoryId,
        batchSize: recipe.batchSize,
        ingredients: recipe.ingredients,
        subRecipes: recipe.subRecipes,
        finalBuildElements: recipe.finalBuild.elements,
        instructions: recipe.instructions
      });
    }
  }, [recipe]);

  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecipe: CookieRecipe = {
      id: recipe?.id || generateId(formData.name),
      name: formData.name,
      photo: formData.photo || undefined,
      categoryId: formData.categoryId,
      batchSize: formData.batchSize,
      ingredients: formData.ingredients.filter(ing => ing.name && ing.amount > 0),
      subRecipes: formData.subRecipes.filter(sub => sub.name && sub.ingredients.length > 0),
      finalBuild: {
        elements: formData.finalBuildElements.filter(elem => elem.name && elem.weight > 0)
      },
      instructions: formData.instructions.filter(inst => inst.trim())
    };

    onSave(newRecipe);
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: 0, unit: 'g' }]
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      )
    }));
  };

  const addSubRecipe = () => {
    setFormData(prev => ({
      ...prev,
      subRecipes: [...prev.subRecipes, {
        id: '',
        name: '',
        ingredients: [{ name: '', amount: 0, unit: 'g' }],
        yield: { amount: 0, unit: 'g' }
      }]
    }));
  };

  const removeSubRecipe = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subRecipes: prev.subRecipes.filter((_, i) => i !== index)
    }));
  };

  const updateSubRecipe = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      subRecipes: prev.subRecipes.map((sub, i) => 
        i === index ? { ...sub, [field]: value } : sub
      )
    }));
  };

  const addFinalBuildElement = () => {
    setFormData(prev => ({
      ...prev,
      finalBuildElements: [...prev.finalBuildElements, { name: '', weight: 0, unit: 'g', isSubRecipe: false }]
    }));
  };

  const removeFinalBuildElement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      finalBuildElements: prev.finalBuildElements.filter((_, i) => i !== index)
    }));
  };

  const updateFinalBuildElement = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      finalBuildElements: prev.finalBuildElements.map((elem, i) => 
        i === index ? { ...elem, [field]: value } : elem
      )
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => 
        i === index ? value : inst
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (optional)</label>
          <input
            type="url"
            value={formData.photo}
            onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
            placeholder="https://example.com/photo.jpg"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch Size (items)</label>
          <input
            type="number"
            value={formData.batchSize}
            onChange={(e) => setFormData(prev => ({ ...prev, batchSize: parseInt(e.target.value) || 5 }))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            required
          />
        </div>
      </div>

      {/* Main Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Main Ingredients</h3>
          <button
            type="button"
            onClick={addIngredient}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="col-span-6 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount || ''}
                onChange={(e) => updateIngredient(index, 'amount', parseFloat(e.target.value) || 0)}
                className="col-span-3 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
              />
              <select
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="col-span-1 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Recipes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Sub Recipes</h3>
          <button
            type="button"
            onClick={addSubRecipe}
            className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-1 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {formData.subRecipes.map((subRecipe, subIndex) => (
            <div key={subIndex} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="Sub-recipe name"
                  value={subRecipe.name}
                  onChange={(e) => updateSubRecipe(subIndex, 'name', e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeSubRecipe(subIndex)}
                  className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 mb-3">
                {subRecipe.ingredients.map((ingredient, ingIndex) => (
                  <div key={ingIndex} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) => {
                        const newIngredients = [...subRecipe.ingredients];
                        newIngredients[ingIndex] = { ...ingredient, name: e.target.value };
                        updateSubRecipe(subIndex, 'ingredients', newIngredients);
                      }}
                      className="col-span-6 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={ingredient.amount || ''}
                      onChange={(e) => {
                        const newIngredients = [...subRecipe.ingredients];
                        newIngredients[ingIndex] = { ...ingredient, amount: parseFloat(e.target.value) || 0 };
                        updateSubRecipe(subIndex, 'ingredients', newIngredients);
                      }}
                      className="col-span-3 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      step="0.1"
                    />
                    <select
                      value={ingredient.unit}
                      onChange={(e) => {
                        const newIngredients = [...subRecipe.ingredients];
                        newIngredients[ingIndex] = { ...ingredient, unit: e.target.value };
                        updateSubRecipe(subIndex, 'ingredients', newIngredients);
                      }}
                      className="col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                      <option value="piece">piece</option>
                      <option value="tsp">tsp</option>
                      <option value="tbsp">tbsp</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const newIngredients = subRecipe.ingredients.filter((_, i) => i !== ingIndex);
                        updateSubRecipe(subIndex, 'ingredients', newIngredients);
                      }}
                      className="col-span-1 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newIngredients = [...subRecipe.ingredients, { name: '', amount: 0, unit: 'g' }];
                    updateSubRecipe(subIndex, 'ingredients', newIngredients);
                  }}
                  className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded"
                >
                  Add Ingredient
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Yield amount"
                  value={subRecipe.yield.amount || ''}
                  onChange={(e) => updateSubRecipe(subIndex, 'yield', { ...subRecipe.yield, amount: parseFloat(e.target.value) || 0 })}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="0.1"
                />
                <select
                  value={subRecipe.yield.unit}
                  onChange={(e) => updateSubRecipe(subIndex, 'yield', { ...subRecipe.yield, unit: e.target.value })}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="piece">piece</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Build */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Final Build Elements</h3>
          <button
            type="button"
            onClick={addFinalBuildElement}
            className="bg-green-100 hover:bg-green-200 text-green-600 p-1 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {formData.finalBuildElements.map((element, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                placeholder="Element name"
                value={element.name}
                onChange={(e) => updateFinalBuildElement(index, 'name', e.target.value)}
                className="col-span-5 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Weight"
                value={element.weight || ''}
                onChange={(e) => updateFinalBuildElement(index, 'weight', parseFloat(e.target.value) || 0)}
                className="col-span-3 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
              />
              <select
                value={element.unit}
                onChange={(e) => updateFinalBuildElement(index, 'unit', e.target.value)}
                className="col-span-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
              </select>
              <label className="col-span-1 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={element.isSubRecipe || false}
                  onChange={(e) => updateFinalBuildElement(index, 'isSubRecipe', e.target.checked)}
                  className="rounded"
                  title="Is Sub-Recipe"
                />
              </label>
              <button
                type="button"
                onClick={() => removeFinalBuildElement(index)}
                className="col-span-1 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Instructions</h3>
          <button
            type="button"
            onClick={addInstruction}
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-1 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-2">
                {index + 1}
              </span>
              <textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder="Enter instruction step"
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded self-start mt-2"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Recipe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;