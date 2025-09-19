export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  minimumStock: number;
  maximumStock: number;
  costPerUnit: number;
  supplier?: string;
  lastRestocked: Date;
  expiryDate?: Date;
  location?: string;
  category: 'dairy' | 'flour' | 'sugar' | 'chocolate' | 'nuts' | 'fruits' | 'spices' | 'other';
  isActive: boolean;
}

export interface StockTransaction {
  id: string;
  inventoryItemId: string;
  type: 'inbound' | 'outbound' | 'adjustment' | 'waste';
  quantity: number;
  unit: string;
  reason: string;
  cost?: number;
  supplier?: string;
  batchNumber?: string;
  expiryDate?: Date;
  timestamp: Date;
  userId?: string;
  recipeId?: string; // For tracking recipe usage
  recipeName?: string;
  targetQuantity?: number; // How many items were made
}

export interface StockAlert {
  id: string;
  inventoryItemId: string;
  itemName: string;
  type: 'low_stock' | 'expired' | 'expiring_soon' | 'overstock';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
}

export interface InventoryReport {
  totalItems: number;
  lowStockItems: number;
  expiredItems: number;
  totalValue: number;
  recentTransactions: StockTransaction[];
  alerts: StockAlert[];
}