
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart2, Package, Clock, Award, Smile, Users, Github } from "lucide-react";

const HomePage = () => {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Keep your food fresh,
              <span className="text-fresh-dark block"> waste less.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your food items, predict expiry dates with AI, and reduce your food waste with
              NiTyA_tAzA - your smart food management companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/inventory">
                <Button size="lg" className="w-full sm:w-auto">
                  View Inventory
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/add-item">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Add New Item
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-fresh-light via-fresh to-fresh-dark animated-gradient">
              <div className="grid grid-cols-2 grid-rows-2 ">
                <img className="bg-cover"
                  src="https://tse1.mm.bing.net/th/id/OIP.53HWJgROn3Sb1ULv8s2hlQHaLH?w=474&h=474&c=7" />
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.khbwvR5qqoce-PzHn5-WBQHaHa&w=474&h=474&c=7" />
                <img 
                  src="https://tse2.mm.bing.net/th?id=OIP.FpgQnBGfR6SCBpyvg65k1wHaE8&w=316&h=316&c=7" />
                <img className="bg-cover"
                  src="https://tse3.mm.bing.net/th?id=OIP.ZGYXd0X-ZCCvj4qnvmkHtQHaEi&w=290&h=290&c=7" />
            </div>

              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Smart Food Management</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="feature-card">
            <div className="flex flex-col items-center text-center p-4 space-y-4">
              <div className="p-3 rounded-full bg-fresh/10 text-fresh-dark">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Food Inventory</h3>
              <p className="text-muted-foreground">
                Keep track of all food items in your kitchen with detailed information on expiry dates.
              </p>
              <Link to="/inventory" className="mt-auto">
                <Button variant="ghost" className="gap-1">
                  View Inventory
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="feature-card">
            <div className="flex flex-col items-center text-center p-4 space-y-4">
              <div className="p-3 rounded-full bg-warning/10 text-warning-dark">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Expiry Prediction</h3>
              <p className="text-muted-foreground">
                AI-powered prediction of food expiry based on storage conditions and packaging type.
              </p>
              <Link to="/expiry-predictor" className="mt-auto">
                <Button variant="ghost" className="gap-1">
                  Try Predictor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="feature-card">
            <div className="flex flex-col items-center text-center p-4 space-y-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Waste Analytics</h3>
              <p className="text-muted-foreground">
                Track your food waste metrics and get insights on how to improve your consumption habits.
              </p>
              <Link to="/statistics" className="mt-auto">
                <Button variant="ghost" className="gap-1">
                  View Statistics
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="rounded-2xl bg-muted p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose NiTyA_tAzA?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-background">
                <Award className="h-5 w-5 text-fresh-dark" />
              </div>
              <div>
                <h3 className="font-semibold">Reduce Food Waste</h3>
                <p className="text-sm text-muted-foreground">
                  Save money and reduce environmental impact by properly tracking your food items.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-full p-2 bg-background">
                <Smile className="h-5 w-5 text-warning-dark" />
              </div>
              <div>
                <h3 className="font-semibold">Easy to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive interface that makes food management a breeze for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Contributors</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Aisha Khan", role: "Lead Developer", image: "https://i.pravatar.cc/150?img=1" },
            { name: "Rajiv Patel", role: "UX Designer", image: "https://i.pravatar.cc/150?img=2" },
            { name: "Maya Singh", role: "Data Scientist", image: "https://i.pravatar.cc/150?img=3" },
            { name: "Vikram Malhotra", role: "Product Manager", image: "https://i.pravatar.cc/150?img=4" },
          ].map((contributor, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={contributor.image} 
                    alt={contributor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{contributor.name}</h3>
                <p className="text-sm text-muted-foreground">{contributor.role}</p>
                <div className="flex space-x-2 mt-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
