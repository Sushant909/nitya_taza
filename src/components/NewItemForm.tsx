
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FoodItem, FoodCategory, PackagingType } from "@/types/food";
import { predictExpiryDate } from "@/utils/expiryPredictor";

interface NewItemFormProps {
  onAddItem: (item: Omit<FoodItem, "id" | "dateAdded" | "expiryDate" | "status">) => void;
  onCancel: () => void;
}

export const NewItemForm = ({ onAddItem, onCancel }: NewItemFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<FoodCategory>("produce");
  const [temperature, setTemperature] = useState(4);
  const [humidity, setHumidity] = useState(60);
  const [packagingType, setPackagingType] = useState<PackagingType>("plastic");
  const [notes, setNotes] = useState("");
  const [lastUpdateField, setLastUpdateField] = useState<string | null>(null);
  
  // Calculate predicted expiry date based on current form values only when name exists
  const predictedExpiry = name.trim() ? predictExpiryDate({
    temperature,
    humidity,
    packagingType,
    foodCategory: category,
  }) : null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    onAddItem({
      name,
      category,
      temperature,
      humidity,
      packagingType,
      notes: notes || undefined,
    });
    
    // Reset form
    setName("");
    setCategory("produce");
    setTemperature(4);
    setHumidity(60);
    setPackagingType("plastic");
    setNotes("");
    setLastUpdateField(null);
  };
  
  // Highlight which field was last changed
  const handleFieldUpdate = (fieldName: string) => {
    setLastUpdateField(fieldName);
    // Reset highlight after 1.5 seconds
    setTimeout(() => setLastUpdateField(null), 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Food Item Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleFieldUpdate('name');
          }}
          placeholder="Enter food item name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Food Category</Label>
        <Select 
          value={category} 
          onValueChange={(value) => {
            setCategory(value as FoodCategory);
            handleFieldUpdate('category');
          }}
        >
          <SelectTrigger className={lastUpdateField === 'category' ? 'ring-2 ring-primary' : ''}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dairy">Dairy</SelectItem>
            <SelectItem value="meat">Meat</SelectItem>
            <SelectItem value="produce">Produce</SelectItem>
            <SelectItem value="grains">Grains</SelectItem>
            <SelectItem value="canned">Canned Goods</SelectItem>
            <SelectItem value="frozen">Frozen</SelectItem>
            <SelectItem value="beverages">Beverages</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="packaging">Packaging Type</Label>
        <Select 
          value={packagingType} 
          onValueChange={(value) => {
            setPackagingType(value as PackagingType);
            handleFieldUpdate('packaging');
          }}
        >
          <SelectTrigger className={lastUpdateField === 'packaging' ? 'ring-2 ring-primary' : ''}>
            <SelectValue placeholder="Select packaging" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plastic">Plastic</SelectItem>
            <SelectItem value="paper">Paper</SelectItem>
            <SelectItem value="glass">Glass</SelectItem>
            <SelectItem value="metal">Metal</SelectItem>
            <SelectItem value="vacuum">Vacuum Sealed</SelectItem>
            <SelectItem value="none">No Packaging</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="temperature">Storage Temperature (°C)</Label>
          <span className="text-sm">{temperature}°C</span>
        </div>
        <Slider
          id="temperature"
          min={-20}
          max={30}
          step={1}
          value={[temperature]}
          onValueChange={(values) => {
            setTemperature(values[0]);
            handleFieldUpdate('temperature');
          }}
          className={lastUpdateField === 'temperature' ? 'has-[.thumb-highlight]:ring-4 has-[.thumb-highlight]:ring-primary/30' : ''}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="humidity">Humidity (%)</Label>
          <span className="text-sm">{humidity}%</span>
        </div>
        <Slider
          id="humidity"
          min={10}
          max={95}
          step={5}
          value={[humidity]}
          onValueChange={(values) => {
            setHumidity(values[0]);
            handleFieldUpdate('humidity');
          }}
          className={lastUpdateField === 'humidity' ? 'has-[.thumb-highlight]:ring-4 has-[.thumb-highlight]:ring-primary/30' : ''}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes"
        />
      </div>
      
      {name.trim() && (
        <div className="p-3 bg-muted/50 rounded-md text-sm">
          <p className="font-medium">Predicted Expiry:</p>
          <p className="font-medium text-primary">{predictedExpiry?.toLocaleDateString()}</p>
          <p className="text-xs mt-1 text-muted-foreground">
            Based on {category}, {packagingType} packaging, {temperature}°C, {humidity}% humidity
          </p>
          {lastUpdateField && (
            <p className="text-xs italic mt-1">
              Prediction updated based on {lastUpdateField} change
            </p>
          )}
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name.trim()}>Add Food Item</Button>
      </div>
    </form>
  );
};
