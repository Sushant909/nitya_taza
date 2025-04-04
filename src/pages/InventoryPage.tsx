
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FoodItemsList } from "@/components/FoodItemsList";
import { DashboardStats } from "@/components/DashboardStats";
import { NewItemForm } from "@/components/NewItemForm";
import { Button } from "@/components/ui/button";
import { FoodItem } from "@/types/food";
import { getMockFoodItems, getStatusFromDate } from "@/data/mock-data";
import { predictExpiryDate } from "@/utils/expiryPredictor";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

const InventoryPage = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(getMockFoodItems());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Calculate stats based on current food items instead of using static function
  const calculateStats = () => {
    const total = foodItems.length;
    const expired = foodItems.filter(item => item.status === "expired").length;
    const expiringSoon = foodItems.filter(item => item.status === "expiring-soon").length;
    const fresh = foodItems.filter(item => item.status === "fresh").length;
    
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
  
  // Get dynamic stats
  const stats = calculateStats();
  
  const handleAddItem = (
    newItem: Omit<FoodItem, "id" | "dateAdded" | "expiryDate" | "status">
  ) => {
    // Calculate expiry date
    const expiryDate = predictExpiryDate({
      temperature: newItem.temperature,
      humidity: newItem.humidity,
      packagingType: newItem.packagingType,
      foodCategory: newItem.category,
    });
    
    // Create new item
    const item: FoodItem = {
      ...newItem,
      id: uuidv4(),
      dateAdded: new Date(),
      expiryDate,
      status: getStatusFromDate(expiryDate),
    };
    
    // Add to state
    setFoodItems([...foodItems, item]);
    setIsAddDialogOpen(false);
    
    // Show success toast
    toast({
      title: "Food item added",
      description: `${item.name} was added to your inventory.`,
    });
  };
  
  const handleDeleteItem = (itemId: string) => {
    // Filter out the item with the matching id
    setFoodItems(foodItems.filter(item => item.id !== itemId));
    
    // Show success toast
    toast({
      title: "Food item deleted",
      description: "The item was removed from your inventory.",
    });
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Inventory</h1>
        <p className="text-muted-foreground">
          Keep track of your food items and their expiry dates
        </p>
      </header>
      
      <div className="mb-8">
        <DashboardStats
          total={stats.total}
          fresh={stats.fresh}
          expiringSoon={stats.expiringSoon}
          expired={stats.expired}
          wastePercentage={stats.wastePercentage}
          atRiskPercentage={stats.atRiskPercentage}
        />
      </div>
      
      <div className="bg-card border rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Food Items</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
        
        <FoodItemsList items={foodItems} onDeleteItem={handleDeleteItem} />
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Food Item</DialogTitle>
          </DialogHeader>
          <NewItemForm
            onAddItem={handleAddItem}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;
