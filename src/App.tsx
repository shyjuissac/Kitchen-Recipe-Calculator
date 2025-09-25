import React, { useState } from 'react';
import defaultRecipes from './data/recipes';
import { defaultCategories, defaultBrandSettings } from './data/categories';
import { CookieRecipe, Category } from './types/Recipe';
import CategorySelector from './components/CategorySelector';
import RecipeSelector from './components/RecipeSelector';
import QuantityInput from './components/QuantityInput';
import RecipeCard from './components/RecipeCard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useInventory } from './hooks/useInventory';
import AdminPanel from './components/AdminPanel';
import LoginForm from './components/LoginForm';
import UserMenu from './components/UserMenu';
import { useAuth } from './hooks/useAuth';
import { ChefHat, Calculator } from 'lucide-react';
import Orders from "./components/Orders";
import Revenue from "./components/Revenue";

 
 
 

function App() {
  const { isAuthenticated, user, loading, login, logout, isManager, isKitchenStaff, isShyju } = useAuth();
  const [recipes, setRecipes] = useLocalStorage<CookieRecipe[]>('cookie-recipes', defaultRecipes);
  const [categories, setCategories] = useLocalStorage<Category[]>('recipe-categories', defaultCategories);
  const [brandSettings, setBrandSettings] = useLocalStorage('brand-settings', defaultBrandSettings);
  
  const {
    inventory,
    transactions,
    alerts,
    addItem: addInventoryItem,
    updateItem: updateInventoryItem,
    deleteItem: deleteInventoryItem,
    addTransaction,
    acknowledgeAlert,
    processRecipeUsage,
    canMakeRecipe
  } = useInventory();
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<CookieRecipe | null>(null);
  const [targetQuantity, setTargetQuantity] = useState<number>(0);

  const scalingFactor = selectedRecipe && targetQuantity > 0 
    ? targetQuantity / selectedRecipe.batchSize 
    : 0;

  const showResults = selectedRecipe && targetQuantity > 0;

  // Recipe management functions
  const handleAddRecipe = (recipe: CookieRecipe) => {
    setRecipes(prev => [...prev, recipe]);
  };

  const handleUpdateRecipe = (updatedRecipe: CookieRecipe) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  // Category management functions
  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
  };

  // Import/Export functionality
  const handleImportData = (importedData: any) => {
    try {
      if (importedData.type === 'complete' || importedData.type === 'recipes-only') {
        if (importedData.recipes) {
          // Merge recipes (update existing, add new)
          setRecipes(prev => {
            const existingIds = prev.map(r => r.id);
            const newRecipes = importedData.recipes.filter((r: CookieRecipe) => !existingIds.includes(r.id));
            const updatedRecipes = prev.map(existing => {
              const imported = importedData.recipes.find((r: CookieRecipe) => r.id === existing.id);
              return imported || existing;
            });
            return [...updatedRecipes, ...newRecipes];
          });
        }
        
        if (importedData.categories) {
          // Merge categories
          setCategories(prev => {
            const existingIds = prev.map(c => c.id);
            const newCategories = importedData.categories.filter((c: Category) => !existingIds.includes(c.id));
            const updatedCategories = prev.map(existing => {
              const imported = importedData.categories.find((c: Category) => c.id === existing.id);
              return imported || existing;
            });
            return [...updatedCategories, ...newCategories];
          });
        }
      }

      if (importedData.type === 'complete') {
        if (importedData.brandSettings) {
          setBrandSettings(importedData.brandSettings);
        }
        
        // Note: Inventory data would be handled by the useInventory hook
        // For now, we'll store it in localStorage directly
        if (importedData.inventory) {
          localStorage.setItem('inventory-items', JSON.stringify(importedData.inventory));
        }
        if (importedData.transactions) {
          localStorage.setItem('inventory-transactions', JSON.stringify(importedData.transactions));
        }
        if (importedData.alerts) {
          localStorage.setItem('inventory-alerts', JSON.stringify(importedData.alerts));
        }
      }

      if (importedData.type === 'inventory-only') {
        if (importedData.inventory) {
          localStorage.setItem('inventory-items', JSON.stringify(importedData.inventory));
        }
        if (importedData.transactions) {
          localStorage.setItem('inventory-transactions', JSON.stringify(importedData.transactions));
        }
        if (importedData.alerts) {
          localStorage.setItem('inventory-alerts', JSON.stringify(importedData.alerts));
        }
      }

      // Refresh the page to load the new data
      window.location.reload();
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} loading={loading} />;
  }

  return (
    
    <div>
      <h1>WooCommerce Dashboard</h1>
      <Revenue />
      <Orders />
    </div>
    
    
    
    <div
      className="min-h-screen"
      style={{ 
        background: brandSettings.backgroundColor,
        fontFamily: brandSettings.fontFamily,
        color: brandSettings.textColor,
        fontSize: brandSettings.fontSize
      }}
    >
      {/* Custom CSS Injection */}
      {brandSettings.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: brandSettings.customCSS }} />
      )}

      {/* Header */}
      <header
        className="shadow-sm border-b safe-area-top sticky top-0 z-40"
        style={{ 
          backgroundColor: brandSettings.headerBackgroundColor,
          borderColor: brandSettings.borderColor
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div 
              className="p-1.5 sm:p-2 flex-shrink-0"
              style={{ 
                background: `linear-gradient(to right, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                borderRadius: brandSettings.borderRadius
              }}
            >
              {brandSettings.logo ? (
                <img 
                  src={brandSettings.logo} 
                  alt={brandSettings.companyName}
                  className="object-contain"
                  style={{ 
                    width: `${brandSettings.logoWidth}px`, 
                    height: `${brandSettings.logoHeight}px` 
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <ChefHat 
                className={`text-white ${brandSettings.logo ? 'hidden' : ''}`}
                style={{ 
                  width: `${Math.min(brandSettings.logoWidth, 28)}px`, 
                  height: `${Math.min(brandSettings.logoHeight, 28)}px` 
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl truncate" style={{ color: brandSettings.textColor, fontFamily: brandSettings.headingFontFamily, fontWeight: brandSettings.headingFontWeight }}>
                {brandSettings.headerTitle}
              </h1>
              <p className="text-sm sm:text-base hidden sm:block" style={{ color: `${brandSettings.textColor}99` }}>{brandSettings.headerSubtitle}</p>
            </div>
            <UserMenu user={user!} onLogout={logout} isManager={isManager()} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 safe-area-left safe-area-right">
        {/* Category Selection */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Recipe Selection */}
        <RecipeSelector
          recipes={recipes}
          categories={categories}
          selectedRecipe={selectedRecipe}
          onSelectRecipe={setSelectedRecipe}
          selectedCategory={selectedCategory}
        />

        {/* Quantity Input */}
        {selectedRecipe && (
          <QuantityInput
            quantity={targetQuantity}
            onQuantityChange={setTargetQuantity}
            selectedRecipeName={selectedRecipe.name}
          />
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div 
              className="text-white p-6 shadow-lg"
              style={{ 
                background: `linear-gradient(to right, ${brandSettings.accentColor}, ${brandSettings.primaryColor})`,
                borderRadius: brandSettings.borderRadius
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-6 h-6" />
                <h2 className="text-xl" style={{ fontFamily: brandSettings.headingFontFamily, fontWeight: brandSettings.headingFontWeight }}>Recipe Summary</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                <div>
                  <span className="opacity-90">Recipe:</span>
                  <div style={{ fontWeight: brandSettings.headingFontWeight }}>{selectedRecipe.name}</div>
                </div>
                <div>
                  <span className="opacity-90">Target Quantity:</span>
                  <div style={{ fontWeight: brandSettings.headingFontWeight }}>{targetQuantity} {targetQuantity === 1 ? 'item' : 'items'}</div>
                </div>
                <div>
                  <span className="opacity-90">Scaling Factor:</span>
                  <div style={{ fontWeight: brandSettings.headingFontWeight }}>{scalingFactor.toFixed(2)}x</div>
                </div>
              </div>
            </div>

            {/* Recipe Details */}
            <RecipeCard
              recipe={selectedRecipe}
              targetQuantity={targetQuantity}
              scalingFactor={scalingFactor}
            />
          </div>
        )}

        {/* Instructions when no recipe selected */}
        {!selectedRecipe && (
          <div className="text-center py-12">
            <div 
              className="p-8 shadow-sm border max-w-md mx-auto"
              style={{ 
                backgroundColor: brandSettings.cardBackgroundColor,
                borderColor: brandSettings.borderColor,
                borderRadius: brandSettings.borderRadius
              }}
            >
              <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl mb-2" style={{ fontFamily: brandSettings.headingFontFamily, fontWeight: brandSettings.headingFontWeight, color: brandSettings.textColor }}>Get Started</h3>
              <p className="text-gray-600">
                Select a recipe above to begin calculating ingredients for your desired quantity.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Admin Panel */}
      {isManager() && (
        <AdminPanel
          recipes={recipes}
          categories={categories}
          onAddRecipe={handleAddRecipe}
          onUpdateRecipe={handleUpdateRecipe}
          onDeleteRecipe={handleDeleteRecipe}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          brandSettings={brandSettings}
          onUpdateBrand={setBrandSettings}
          inventory={inventory}
          transactions={transactions}
          alerts={alerts}
          onAddInventoryItem={addInventoryItem}
          onUpdateInventoryItem={updateInventoryItem}
          onDeleteInventoryItem={deleteInventoryItem}
          onAddTransaction={addTransaction}
          onAcknowledgeAlert={acknowledgeAlert}
          onImportData={handleImportData}
        />
      )}

      {/* Footer */}
      {brandSettings.footerText && (
        <footer className="text-center py-6 border-t" style={{ borderColor: brandSettings.borderColor }}>
          <p className="text-sm" style={{ color: `${brandSettings.textColor}99` }}>
            {brandSettings.footerText}
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;