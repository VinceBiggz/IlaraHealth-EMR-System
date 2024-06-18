// frontend/src/types.ts
export interface InventoryItem {
  item_id: number;
  name: string;
  quantity: number;
  low_stock_threshold: number;
}
