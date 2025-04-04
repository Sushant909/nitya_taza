
import { useState } from "react";
import { FoodItem } from "../types/food";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { getDaysUntilExpiry } from "@/utils/expiryPredictor";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FoodItemCardProps {
  item: FoodItem;
  onView: (item: FoodItem) => void;
  onDelete: (itemId: string) => void;
}

export const FoodItemCard = ({ item, onView, onDelete }: FoodItemCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Format dates for display
  const formattedExpiryDate = item.expiryDate.toLocaleDateString();
  const expiryDistance = formatDistanceToNow(item.expiryDate, { addSuffix: true });
  
  // Get days until expiry
  const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
  
  // Colors and animations based on status
  const getStatusStyles = () => {
    switch(item.status) {
      case "fresh":
        return {
          bg: "bg-fresh/10 hover:bg-fresh/20",
          border: "border-fresh",
          text: "text-fresh-dark",
          badgeBg: "bg-fresh",
          animation: ""
        };
      case "expiring-soon":
        return {
          bg: "bg-warning/10 hover:bg-warning/20",
          border: "border-warning",
          text: "text-warning-dark",
          badgeBg: "bg-warning",
          animation: "animate-pulse-soft"
        };
      case "expired":
        return {
          bg: "bg-expired/10 hover:bg-expired/20",
          border: "border-expired",
          text: "text-expired-dark",
          badgeBg: "bg-expired",
          animation: ""
        };
      default:
        return {
          bg: "bg-card hover:bg-secondary",
          border: "border-border",
          text: "text-foreground",
          badgeBg: "bg-secondary",
          animation: ""
        };
    }
  };
  
  const styles = getStatusStyles();
  
  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete(item.id);
  };
  
  return (
    <>
      <Card 
        className={`transition-all duration-300 ${styles.bg} border ${styles.border} ${isHovering ? 'shadow-md' : 'shadow-sm'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
            <Badge className={`${styles.badgeBg} ${styles.animation}`}>
              {item.status === "fresh" ? "Fresh" : 
               item.status === "expiring-soon" ? "Expiring Soon" : "Expired"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Expiry:</span>
              <span className={daysUntilExpiry <= 0 ? "text-expired-dark" : daysUntilExpiry <= 3 ? "text-warning-dark" : ""}>
                {formattedExpiryDate}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className={styles.text}>{expiryDistance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Storage:</span>
              <span>{item.temperature}°C, {item.humidity}% humidity</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            className="text-sm hover:bg-background"
            onClick={() => onView(item)}
          >
            View Details
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{item.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
