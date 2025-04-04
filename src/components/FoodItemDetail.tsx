
import { FoodItem } from "../types/food";
import { Button } from "@/components/ui/button";
import { generateStorageAdvice } from "@/utils/expiryPredictor";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Package, Trash2 } from "lucide-react";

interface FoodItemDetailProps {
  item: FoodItem;
  onClose: () => void;
  onDelete: () => void;
}

export const FoodItemDetail = ({ item, onClose, onDelete }: FoodItemDetailProps) => {
  // Get storage advice
  const advice = generateStorageAdvice(
    item.category,
    item.temperature,
    item.humidity,
    item.packagingType
  );
  
  // Calculate days until expiry
  const daysUntilExpiry = Math.ceil(
    (item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Status badge style
  const getBadgeStyle = () => {
    switch(item.status) {
      case "fresh":
        return "bg-fresh text-white";
      case "expiring-soon":
        return "bg-warning text-white";
      case "expired":
        return "bg-expired text-white";
      default:
        return "bg-secondary";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <Badge className={getBadgeStyle()}>
          {item.status === "fresh" ? "Fresh" : 
           item.status === "expiring-soon" ? "Expiring Soon" : "Expired"}
        </Badge>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
          <p className="capitalize">{item.category}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Packaging</h3>
          <p className="capitalize">{item.packagingType}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Storage Temperature</h3>
          <p>{item.temperature}°C</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Humidity</h3>
          <p>{item.humidity}%</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Date Information</h3>
        </div>
        <div className="ml-7 space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date Added</p>
              <p>{format(item.dateAdded, "PPP")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiry Date</p>
              <p className={daysUntilExpiry <= 0 ? "text-expired-dark" : daysUntilExpiry <= 3 ? "text-warning-dark" : ""}>
                {format(item.expiryDate, "PPP")}
              </p>
            </div>
          </div>
          <p className="text-sm mt-2">
            {daysUntilExpiry > 0 ? 
              `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}` : 
              `Expired ${Math.abs(daysUntilExpiry)} day${Math.abs(daysUntilExpiry) !== 1 ? 's' : ''} ago`}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-medium">Storage Advice</h3>
        </div>
        <div className="ml-7 p-3 bg-muted/50 rounded-md">
          <p className="text-sm">{advice}</p>
        </div>
      </div>
      
      {item.notes && (
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
          <p className="text-sm">{item.notes}</p>
        </div>
      )}
      
      <div className="flex space-x-2 pt-2">
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="destructive" 
          className="flex items-center gap-1"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};
