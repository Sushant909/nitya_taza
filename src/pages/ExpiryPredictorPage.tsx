
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewItemForm } from "@/components/NewItemForm";
import { Button } from "@/components/ui/button";
import { ArrowRight, FastForward, RefreshCw } from "lucide-react";
import { predictExpiryDate, generateStorageAdvice } from "@/utils/expiryPredictor";
import { FoodCategory, PackagingType } from "@/types/food";

const ExpiryPredictorPage = () => {
  const [prediction, setPrediction] = useState<{
    expiryDate: Date;
    advice: string;
    name: string;
    category: FoodCategory;
    temperature: number;
    humidity: number;
    packagingType: PackagingType;
  } | null>(null);
  
  const [showForm, setShowForm] = useState(true);
  
  const handlePredict = (item: any) => {
    const expiryDate = predictExpiryDate({
      temperature: item.temperature,
      humidity: item.humidity,
      packagingType: item.packagingType,
      foodCategory: item.category,
    });
    
    const advice = generateStorageAdvice(
      item.category,
      item.temperature,
      item.humidity,
      item.packagingType
    );
    
    setPrediction({
      expiryDate,
      advice,
      name: item.name,
      category: item.category,
      temperature: item.temperature,
      humidity: item.humidity,
      packagingType: item.packagingType,
    });
    
    setShowForm(false);
  };
  
  const resetForm = () => {
    setPrediction(null);
    setShowForm(true);
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Expiry Predictor</h1>
        <p className="text-muted-foreground">
          Predict how long your food will last based on storage conditions
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {showForm ? "Enter Food Details" : "Expiry Prediction Results"}
              </CardTitle>
              <CardDescription>
                {showForm 
                  ? "Fill in the details about your food item to get an expiry prediction" 
                  : "Based on the information you provided"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showForm ? (
                <NewItemForm 
                  onAddItem={handlePredict}
                  onCancel={() => {}}
                />
              ) : prediction && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">{prediction.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="capitalize">{prediction.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Packaging</p>
                        <p className="capitalize">{prediction.packagingType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <p>{prediction.temperature}°C</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                        <p>{prediction.humidity}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Predicted Expiry Date</h3>
                    <div className="text-3xl font-bold text-primary">
                      {prediction.expiryDate.toLocaleDateString()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This prediction is based on the storage conditions you provided
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Storage Advice</h3>
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p>{prediction.advice}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button onClick={resetForm} variant="outline" className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Another Item
                    </Button>
                    <Button className="flex-1">
                      <FastForward className="mr-2 h-4 w-4" />
                      Add to Inventory
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mb-2">
                  1
                </div>
                <h3 className="font-medium">Enter Food Details</h3>
                <p className="text-sm text-muted-foreground">
                  Provide information about your food item, including its category and storage conditions.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mb-2">
                  2
                </div>
                <h3 className="font-medium">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI model analyzes the data and calculates shelf life based on scientific research.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mb-2">
                  3
                </div>
                <h3 className="font-medium">Get Your Results</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a predicted expiry date and personalized storage advice to extend shelf life.
                </p>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.fda.gov/food/buy-store-serve-safe-food/food-storage-tips" target="_blank" rel="noreferrer">
                    Learn More About Food Storage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpiryPredictorPage;
