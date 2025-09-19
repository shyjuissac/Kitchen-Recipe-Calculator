import React from 'react';
import { CookieRecipe, Ingredient, SubRecipe } from '../types/Recipe';
import { Scale, Clock, ChefHat, AlertTriangle, CheckCircle } from 'lucide-react';

interface RecipeCardProps {
  recipe: CookieRecipe;
  targetQuantity: number;
  scalingFactor: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  targetQuantity, 
  scalingFactor
}) => {
  const scaleAmount = (amount: number): number => {
    return Math.round((amount * scalingFactor) * 10) / 10;
  };

  const formatAmount = (amount: number, unit: string): string => {
    const scaled = scaleAmount(amount);
    if (unit === 'piece' && scaled < 1) {
      return `${Math.round(scaled * 100)}% of 1 ${unit}`;
    }
    return `${scaled} ${unit}${scaled !== 1 && unit === 'piece' ? 's' : ''}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
        <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">{recipe.name}</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-blue-100">
          <div className="flex items-center gap-1">
            <Scale className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-sm sm:text-base">Making {targetQuantity} {targetQuantity === 1 ? 'item' : 'items'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm sm:text-base">Scale: {scalingFactor.toFixed(2)}x</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 mobile-scroll">
        {/* Sub-recipes first */}
        {recipe.subRecipes.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              Sub-Recipes (Make First)
            </h3>
            {recipe.subRecipes.map((subRecipe) => (
              <div key={subRecipe.id} className="bg-orange-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2 text-sm sm:text-base">{subRecipe.name}</h4>
                <div className="grid grid-cols-1 gap-2 mb-2">
                  {subRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center text-xs sm:text-sm gap-2">
                      <span className="text-gray-700 flex-1 min-w-0 truncate">{ingredient.name}</span>
                      <span className="font-medium text-orange-700 flex-shrink-0">
                        {formatAmount(ingredient.amount, ingredient.unit)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded mb-2">
                  Yields: {scaleAmount(subRecipe.yield.amount)} {subRecipe.yield.unit}
                </div>
                {subRecipe.instructions && (
                  <p className="text-xs sm:text-sm text-orange-700 italic">{subRecipe.instructions}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Main recipe ingredients */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Main Recipe Ingredients</h3>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg gap-2">
                <span className="text-gray-700 font-medium text-sm sm:text-base flex-1 min-w-0 truncate">{ingredient.name}</span>
                <span className="font-bold text-blue-600 text-sm sm:text-base lg:text-lg flex-shrink-0">
                  {formatAmount(ingredient.amount, ingredient.unit)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final build */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
            Final Assembly (Per {recipe.batchSize === 1 ? 'Item' : 'Cookie'})
          </h3>
          <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
            {recipe.finalBuild.elements.map((element, index) => (
              <div key={index} className="flex justify-between items-center py-1 sm:py-2 gap-2">
                <span className={`text-xs sm:text-sm flex-1 min-w-0 ${element.isSubRecipe ? 'text-orange-700 font-medium' : 'text-gray-700'}`}>
                  {element.name} {element.isSubRecipe && '(from sub-recipe)'}
                </span>
                <span className="font-bold text-green-700 text-xs sm:text-sm flex-shrink-0">
                  {formatAmount(element.weight, element.unit)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-800 mb-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
            Instructions
          </h3>
          <ol className="space-y-2 sm:space-y-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-2 sm:gap-3">
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;