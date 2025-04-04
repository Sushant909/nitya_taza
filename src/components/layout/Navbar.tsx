
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, Package, Clock, PlusCircle, Menu, X } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { path: "/inventory", label: "Inventory", icon: <Package className="w-4 h-4" /> },
    { path: "/statistics", label: "Statistics", icon: <BarChart2 className="w-4 h-4" /> },
    { path: "/expiry-predictor", label: "Expiry Predictor", icon: <Clock className="w-4 h-4" /> },
  ];
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NiTyA_tAzA</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
          <Link to="/add-item">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden flex-1 justify-end">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-2 grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center py-3 px-4 rounded-md ${
                  isActive(link.path) 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link to="/add-item" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
