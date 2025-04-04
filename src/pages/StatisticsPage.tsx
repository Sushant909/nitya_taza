
import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/DashboardStats";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getMockFoodItems, getFoodWasteStats } from "@/data/mock-data";

const StatisticsPage = () => {
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "year">("week");
  
  // Get stats
  const stats = getFoodWasteStats();
  const foodItems = getMockFoodItems();
  
  // Generate mock data for charts
  const generateTimeSeriesData = () => {
    const days = timeFrame === "week" ? 7 : timeFrame === "month" ? 30 : 12;
    const labels = timeFrame === "year" 
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : Array.from({ length: days }, (_, i) => 
          timeFrame === "week" 
            ? `Day ${i + 1}` 
            : `Day ${i + 1}`
        );
    
    return labels.map(label => {
      const fresh = Math.floor(Math.random() * 10) + 1;
      const expiringSoon = Math.floor(Math.random() * 5);
      const expired = Math.floor(Math.random() * 3);
      
      return {
        name: label,
        fresh,
        expiringSoon,
        expired,
        total: fresh + expiringSoon + expired
      };
    });
  };
  
  // Create pie chart data
  const pieChartData = [
    { name: "Fresh", value: stats.fresh, color: "#4ADE80" },
    { name: "Expiring Soon", value: stats.expiringSoon, color: "#FBBF24" },
    { name: "Expired", value: stats.expired, color: "#EF4444" }
  ];
  
  // Data for category distribution
  const categoryData = Array.from(
    foodItems.reduce((acc, item) => {
      acc.set(item.category, (acc.get(item.category) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).map(([name, value]) => ({ name, value }));
  
  const timeSeriesData = generateTimeSeriesData();
  
  return (
    <div className="container py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Waste Statistics</h1>
        <p className="text-muted-foreground">
          Track your food waste metrics and identify opportunities to reduce waste
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
      
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Food Freshness Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Waste Reduction Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Plan Your Meals</h3>
                  <p className="text-sm text-muted-foreground">
                    Planning meals in advance helps you buy only what you need and reduces the chance of food spoiling before use.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">First In, First Out (FIFO)</h3>
                  <p className="text-sm text-muted-foreground">
                    Place newer products behind older ones to ensure you use the older products first.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Proper Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    Store food items at their optimal temperature and humidity levels to maximize shelf life.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Understand Date Labels</h3>
                  <p className="text-sm text-muted-foreground">
                    "Best before" doesn't always mean "bad after" - use your judgment and the app's recommendations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Food Status Over Time</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant={timeFrame === "week" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFrame("week")}
                >
                  Week
                </Button>
                <Button 
                  variant={timeFrame === "month" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFrame("month")}
                >
                  Month
                </Button>
                <Button 
                  variant={timeFrame === "year" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setTimeFrame("year")}
                >
                  Year
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeSeriesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fresh" stackId="a" fill="#4ADE80" name="Fresh" />
                    <Bar dataKey="expiringSoon" stackId="a" fill="#FBBF24" name="Expiring Soon" />
                    <Bar dataKey="expired" stackId="a" fill="#EF4444" name="Expired" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Food Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 100,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      scale="band" 
                      tick={{ className: "capitalize" }}
                    />
                    <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsPage;
