import React from 'react';
import { Calculator } from 'lucide-react';

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  selectedRecipeName?: string;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange, selectedRecipeName }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onQuantityChange(Math.max(0, value));
  };

  const incrementQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    onQuantityChange(Math.max(0, quantity - 1));
  };

  const quickQuantities = [12, 24, 36, 48, 60, 100];

  return (
    <div className="mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
        How many do you need?
        {selectedRecipeName && <span className="text-blue-600 hidden sm:inline truncate">({selectedRecipeName})</span>}
      </h2>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-bold text-lg sm:text-xl transition-colors touch-target flex-shrink-0"
            disabled={quantity <= 0}
          >
            −
          </button>
          
          <div className="flex-1 min-w-0">
            <input
              type="number"
              value={quantity || ''}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              className="w-full text-xl sm:text-2xl lg:text-3xl font-bold text-center py-2 sm:py-3 px-2 sm:px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              min="0"
            />
            <p className="text-center text-sm sm:text-base mt-1">Making {quantity} {quantity === 1 ? 'item' : 'items'}</p>
          </div>
          
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg font-bold text-lg sm:text-xl transition-colors touch-target flex-shrink-0"
          >
            +
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs sm:text-sm text-gray-600 mr-1 sm:mr-2 flex-shrink-0">Quick:</span>
          {quickQuantities.map((qty) => (
            <button
              key={qty}
              onClick={() => onQuantityChange(qty)}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors touch-target ${
                quantity === qty
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {qty}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;