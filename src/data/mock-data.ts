
import { FoodItem } from "../types/food";

// Helper function to generate dates for the mock data
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Function to determine status based on expiry date
export const getStatusFromDate = (expiryDate: Date): "fresh" | "expiring-soon" | "expired" => {
  const now = new Date();
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry < 0) {
    return "expired";
  } else if (daysUntilExpiry <= 3) {
    return "expiring-soon";
  } else {
    return "fresh";
  }
};

// Mock food items
export const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Milk",
    category: "dairy",
    dateAdded: daysFromNow(-5),
    expiryDate: daysFromNow(2),
    temperature: 4,
    humidity: 65,
    packagingType: "plastic",
    status: "expiring-soon"
  },
  {
    id: "2",
    name: "Apples",
    category: "produce",
    dateAdded: daysFromNow(-3),
    expiryDate: daysFromNow(7),
    temperature: 20,
    humidity: 70,
    packagingType: "none",
    status: "fresh"
  },
  {
    id: "3",
    name: "Chicken Breast",
    category: "meat",
    dateAdded: daysFromNow(-2),
    expiryDate: daysFromNow(1),
    temperature: 2,
    humidity: 80,
    packagingType: "plastic",
    status: "expiring-soon"
  },
  {
    id: "4",
    name: "Yogurt",
    category: "dairy",
    dateAdded: daysFromNow(-10),
    expiryDate: daysFromNow(-1),
    temperature: 4,
    humidity: 65,
    packagingType: "plastic",
    status: "expired"
  },
  {
    id: "5",
    name: "Bread",
    category: "grains",
    dateAdded: daysFromNow(-4),
    expiryDate: daysFromNow(3),
    temperature: 22,
    humidity: 50,
    packagingType: "plastic",
    status: "expiring-soon"
  },
  {
    id: "6",
    name: "Bananas",
    category: "produce",
    dateAdded: daysFromNow(-2),
    expiryDate: daysFromNow(4),
    temperature: 20,
    humidity: 60,
    packagingType: "none",
    status: "fresh"
  },
  {
    id: "7",
    name: "Canned Beans",
    category: "canned",
    dateAdded: daysFromNow(-60),
    expiryDate: daysFromNow(300),
    temperature: 22,
    humidity: 50,
    packagingType: "metal",
    status: "fresh"
  },
  {
    id: "8",
    name: "Orange Juice",
    category: "beverages",
    dateAdded: daysFromNow(-7),
    expiryDate: daysFromNow(5),
    temperature: 4,
    humidity: 65,
    packagingType: "plastic",
    status: "fresh"
  }
];

// Update the status based on the current date
export const getMockFoodItems = (): FoodItem[] => {
  return mockFoodItems.map(item => ({
    ...item,
    status: getStatusFromDate(item.expiryDate)
  }));
};

// Calculate the total food waste statistics
export const getFoodWasteStats = () => {
  const items = getMockFoodItems();
  const total = items.length;
  const expired = items.filter(item => item.status === "expired").length;
  const expiringSoon = items.filter(item => item.status === "expiring-soon").length;
  const fresh = items.filter(item => item.status === "fresh").length;
  
  const wastePercentage = total > 0 ? Math.round((expired / total) * 100) : 0;
  const atRiskPercentage = total > 0 ? Math.round((expiringSoon / total) * 100) : 0;
  
  return {
    total,
    expired,
    expiringSoon,
    fresh,
    wastePercentage,
    atRiskPercentage
  };
};
