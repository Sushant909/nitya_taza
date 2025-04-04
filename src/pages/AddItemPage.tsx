
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewItemForm } from "@/components/NewItemForm";
import { FoodItem } from "@/types/food";
import { getStatusFromDate } from "@/data/mock-data";
import { predictExpiryDate } from "@/utils/expiryPredictor";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  ShoppingCart,
  Refrigerator,
  Apple,
  Coffee
} from "lucide-react";

const AddItemPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    
    // Show success toast
    toast({
      title: "Food item added",
      description: `${item.name} was added to your inventory.`,
    });
    
    // Navigate to inventory page
    navigate("/inventory");
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Add New Food Item</h1>
        <p className="text-muted-foreground mt-2">
          Add a new food item to your inventory and get an expiry prediction
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enter Food Details</CardTitle>
              <CardDescription>
                Fill in the details about your food item to track it and predict its expiry date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewItemForm 
                onAddItem={handleAddItem}
                onCancel={() => navigate(-1)}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Recently Purchased?</h3>
                  <p className="text-sm text-muted-foreground">
                    For best results, add items on the day you purchase them.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Refrigerator className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Check Storage Conditions</h3>
                  <p className="text-sm text-muted-foreground">
                    Accurate temperature and humidity information leads to better predictions.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <Apple className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Select Correct Category</h3>
                  <p className="text-sm text-muted-foreground">
                    Different food categories have different shelf life patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coffee className="mr-2 h-5 w-5" />
                Did You Know?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The average household wastes approximately 30% of the food they purchase. 
                Using a food tracker like FreshTrack can help reduce your food waste by up to 25%!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
