import React from 'react';
import { CookieRecipe, Category } from '../types/Recipe';
import { Cookie, Image } from 'lucide-react';

interface RecipeSelectorProps {
  recipes: CookieRecipe[];
  categories: Category[];
  selectedRecipe: CookieRecipe | null;
  onSelectRecipe: (recipe: CookieRecipe) => void;
  selectedCategory: Category | null;
}

const RecipeSelector: React.FC<RecipeSelectorProps> = ({ 
  recipes, 
  categories,
  selectedRecipe, 
  onSelectRecipe,
  selectedCategory 
}) => {
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const filteredRecipes = selectedCategory 
    ? recipes.filter(recipe => recipe.categoryId === selectedCategory.id)
    : recipes;

  if (filteredRecipes.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Cookie className="w-6 h-6 text-amber-500" />
          Select Recipe
        </h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            {selectedCategory 
              ? `No recipes found in ${selectedCategory.name} category.`
              : 'No recipes available.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
        <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
        Select Recipe
        {selectedCategory && (
          <span className="text-purple-600 hidden sm:inline">({selectedCategory.name})</span>
        )}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredRecipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe)}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md overflow-hidden touch-target ${
              selectedRecipe?.id === recipe.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex-shrink-0">
                {recipe.photo ? (
                  <img
                    src={recipe.photo}
                    alt={recipe.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center ${recipe.photo ? 'hidden' : ''}`}>
                  <Image className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base leading-tight">{recipe.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600">Makes {recipe.batchSize} {recipe.batchSize === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-1 truncate">
              {getCategoryName(recipe.categoryId)}
            </p>
            {recipe.subRecipes.length > 0 && (
              <p className="text-xs text-orange-600 mt-1 hidden sm:block">
                {recipe.subRecipes.length} sub-recipe{recipe.subRecipes.length > 1 ? 's' : ''}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeSelector;