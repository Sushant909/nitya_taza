
export type FoodStatus = "fresh" | "expiring-soon" | "expired";

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  dateAdded: Date;
  expiryDate: Date;
  temperature: number;
  humidity: number;
  packagingType: string;
  notes?: string;
  status: FoodStatus;
}

export type FoodCategory = 
  | "dairy" 
  | "meat" 
  | "produce" 
  | "grains" 
  | "canned" 
  | "frozen" 
  | "beverages" 
  | "snacks" 
  | "other";

export type PackagingType = 
  | "plastic" 
  | "paper" 
  | "glass" 
  | "metal" 
  | "vacuum" 
  | "none";
