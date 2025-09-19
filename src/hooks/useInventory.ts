import { useState, useEffect } from 'react';
import { InventoryItem, StockTransaction, StockAlert } from '../types/Inventory';
import { CookieRecipe, Ingredient } from '../types/Recipe';

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory-items');
    const savedTransactions = localStorage.getItem('inventory-transactions');
    const savedAlerts = localStorage.getItem('inventory-alerts');

    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('inventory-items', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('inventory-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('inventory-alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Generate alerts based on inventory levels
  useEffect(() => {
    const newAlerts: StockAlert[] = [];
    const now = new Date();

    inventory.forEach(item => {
      const alertId = `${item.id}-${Date.now()}`;

      // Low stock alert
      if (item.currentStock <= item.minimumStock && item.currentStock > 0) {
        newAlerts.push({
          id: `low-${alertId}`,
          inventoryItemId: item.id,
          itemName: item.name,
          type: 'low_stock',
          message: `${item.name} is running low (${item.currentStock} ${item.unit} remaining)`,
          severity: item.currentStock === 0 ? 'critical' : 'high',
          timestamp: now,
          acknowledged: false
        });
      }

      // Out of stock alert
      if (item.currentStock <= 0) {
        newAlerts.push({
          id: `out-${alertId}`,
          inventoryItemId: item.id,
          itemName: item.name,
          type: 'low_stock',
          message: `${item.name} is out of stock`,
          severity: 'critical',
          timestamp: now,
          acknowledged: false
        });
      }

      // Expiry alerts
      if (item.expiryDate) {
        const daysUntilExpiry = Math.ceil((new Date(item.expiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry < 0) {
          newAlerts.push({
            id: `expired-${alertId}`,
            inventoryItemId: item.id,
            itemName: item.name,
            type: 'expired',
            message: `${item.name} has expired`,
            severity: 'critical',
            timestamp: now,
            acknowledged: false
          });
        } else if (daysUntilExpiry <= 3) {
          newAlerts.push({
            id: `expiring-${alertId}`,
            inventoryItemId: item.id,
            itemName: item.name,
            type: 'expiring_soon',
            message: `${item.name} expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
            severity: daysUntilExpiry <= 1 ? 'high' : 'medium',
            timestamp: now,
            acknowledged: false
          });
        }
      }
    });

    // Only add new alerts that don't already exist
    const existingAlertKeys = alerts.map(a => `${a.type}-${a.inventoryItemId}`);
    const filteredNewAlerts = newAlerts.filter(alert => 
      !existingAlertKeys.includes(`${alert.type}-${alert.inventoryItemId}`)
    );

    if (filteredNewAlerts.length > 0) {
      setAlerts(prev => [...prev, ...filteredNewAlerts]);
    }
  }, [inventory]);

  const addItem = (item: InventoryItem) => {
    setInventory(prev => [...prev, item]);
  };

  const updateItem = (updatedItem: InventoryItem) => {
    setInventory(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteItem = (itemId: string) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
    setTransactions(prev => prev.filter(t => t.inventoryItemId !== itemId));
    setAlerts(prev => prev.filter(a => a.inventoryItemId !== itemId));
  };

  const addTransaction = (transaction: StockTransaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  // Function to automatically deduct ingredients when a recipe is made
  const processRecipeUsage = (recipe: CookieRecipe, targetQuantity: number) => {
    const scalingFactor = targetQuantity / recipe.batchSize;
    const now = new Date();

    // Process main ingredients
    recipe.ingredients.forEach(ingredient => {
      const inventoryItem = inventory.find(item => 
        item.name.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (inventoryItem) {
        const usedQuantity = ingredient.amount * scalingFactor;
        
        // Create transaction record
        const transaction: StockTransaction = {
          id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          inventoryItemId: inventoryItem.id,
          type: 'outbound',
          quantity: usedQuantity,
          unit: ingredient.unit,
          reason: `Used in recipe: ${recipe.name}`,
          timestamp: now,
          recipeId: recipe.id,
          recipeName: recipe.name,
          targetQuantity: targetQuantity
        };

        addTransaction(transaction);

        // Update inventory
        const updatedItem = {
          ...inventoryItem,
          currentStock: Math.max(0, inventoryItem.currentStock - usedQuantity)
        };
        updateItem(updatedItem);
      }
    });

    // Process sub-recipe ingredients
    recipe.subRecipes.forEach(subRecipe => {
      subRecipe.ingredients.forEach(ingredient => {
        const inventoryItem = inventory.find(item => 
          item.name.toLowerCase() === ingredient.name.toLowerCase()
        );

        if (inventoryItem) {
          const usedQuantity = ingredient.amount * scalingFactor;
          
          const transaction: StockTransaction = {
            id: `subrecipe-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            inventoryItemId: inventoryItem.id,
            type: 'outbound',
            quantity: usedQuantity,
            unit: ingredient.unit,
            reason: `Used in sub-recipe: ${subRecipe.name} (${recipe.name})`,
            timestamp: now,
            recipeId: recipe.id,
            recipeName: recipe.name,
            targetQuantity: targetQuantity
          };

          addTransaction(transaction);

          const updatedItem = {
            ...inventoryItem,
            currentStock: Math.max(0, inventoryItem.currentStock - usedQuantity)
          };
          updateItem(updatedItem);
        }
      });
    });
  };

  // Function to check if recipe can be made with current stock
  const canMakeRecipe = (recipe: CookieRecipe, targetQuantity: number): { canMake: boolean; missingIngredients: string[] } => {
    const scalingFactor = targetQuantity / recipe.batchSize;
    const missingIngredients: string[] = [];

    // Check main ingredients
    recipe.ingredients.forEach(ingredient => {
      const inventoryItem = inventory.find(item => 
        item.name.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (!inventoryItem || inventoryItem.currentStock < (ingredient.amount * scalingFactor)) {
        missingIngredients.push(ingredient.name);
      }
    });

    // Check sub-recipe ingredients
    recipe.subRecipes.forEach(subRecipe => {
      subRecipe.ingredients.forEach(ingredient => {
        const inventoryItem = inventory.find(item => 
          item.name.toLowerCase() === ingredient.name.toLowerCase()
        );

        if (!inventoryItem || inventoryItem.currentStock < (ingredient.amount * scalingFactor)) {
          missingIngredients.push(`${ingredient.name} (${subRecipe.name})`);
        }
      });
    });

    return {
      canMake: missingIngredients.length === 0,
      missingIngredients: [...new Set(missingIngredients)] // Remove duplicates
    };
  };

  return {
    inventory,
    transactions,
    alerts,
    addItem,
    updateItem,
    deleteItem,
    addTransaction,
    acknowledgeAlert,
    processRecipeUsage,
    canMakeRecipe
  };
}