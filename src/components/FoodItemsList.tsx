
import { useState } from "react";
import { FoodItem, FoodStatus } from "../types/food";
import { FoodItemCard } from "./FoodItemCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodItemDetail } from "./FoodItemDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FoodItemsListProps {
  items: FoodItem[];
  onDeleteItem: (itemId: string) => void;
}

export const FoodItemsList = ({ items, onDeleteItem }: FoodItemsListProps) => {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Get unique categories from the items
  const categories = Array.from(new Set(items.map(item => item.category)));
  
  // Filter items based on search term and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Sort items by expiry date (soonest first)
  const sortedItems = [...filteredItems].sort((a, b) => 
    a.expiryDate.getTime() - b.expiryDate.getTime()
  );
  
  const handleViewItem = (item: FoodItem) => {
    setSelectedItem(item);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Input
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <div className="grid grid-cols-2 gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="fresh">Fresh</SelectItem>
                <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {sortedItems.length} of {items.length} items
          </p>
          <Button variant="outline" size="sm" className="text-sm">
            + Add New Item
          </Button>
        </div>
      </div>
      
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map(item => (
            <FoodItemCard 
              key={item.id} 
              item={item} 
              onView={handleViewItem}
              onDelete={onDeleteItem}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No food items found matching your filters.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      
      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedItem && (
            <FoodItemDetail 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
              onDelete={() => {
                onDeleteItem(selectedItem.id);
                setSelectedItem(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
