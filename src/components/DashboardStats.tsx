
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardStatsProps {
  total: number;
  fresh: number;
  expiringSoon: number;
  expired: number;
  wastePercentage: number;
  atRiskPercentage: number;
}

export const DashboardStats = ({
  total,
  fresh,
  expiringSoon,
  expired,
  wastePercentage,
  atRiskPercentage
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Items in your inventory
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Fresh Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fresh-dark">{fresh}</div>
          <div className="mt-2">
            <Progress value={(fresh / total) * 100} className="h-2 bg-muted" indicatorClassName="bg-fresh" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((fresh / total) * 100)}% of your inventory
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning-dark">{expiringSoon}</div>
          <div className="mt-2">
            <Progress value={atRiskPercentage} className="h-2 bg-muted" indicatorClassName="bg-warning" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {atRiskPercentage}% at risk of spoilage
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Food Waste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expired-dark">{expired}</div>
          <div className="mt-2">
            <Progress value={wastePercentage} className="h-2 bg-muted" indicatorClassName="bg-expired" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {wastePercentage}% waste rate
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
