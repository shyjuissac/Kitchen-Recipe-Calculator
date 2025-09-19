import React from 'react';
import { Category } from '../types/Recipe';
import { Package } from 'lucide-react';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 flex-shrink-0" />
        Select Product Category
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base touch-target ${
            selectedCategory === null
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base touch-target ${
              selectedCategory?.id === category.id
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold leading-tight">{category.name}</div>
              {category.description && (
                <div className="text-xs opacity-75 hidden sm:block">{category.description}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;