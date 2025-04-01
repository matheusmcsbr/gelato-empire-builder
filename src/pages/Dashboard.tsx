
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  BarChart, 
  DollarSign,
  Calendar,
  Package
} from 'lucide-react';
import { DashboardSalesChart } from '@/components/dashboard/DashboardSalesChart';
import { DashboardTopProducts } from '@/components/dashboard/DashboardTopProducts';
import { DashboardStoreStatus } from '@/components/dashboard/DashboardStoreStatus';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gelato-chocolate">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Gelato Empire management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Today's Sales</p>
                <p className="gelato-stat">$1,284.56</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>12% from yesterday</span>
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Customers Today</p>
                <p className="gelato-stat">147</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>8% from yesterday</span>
                </p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Weekly Revenue</p>
                <p className="gelato-stat">$8,954.20</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>14% from last week</span>
                </p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Low Stock Items</p>
                <p className="gelato-stat">3</p>
                <p className="text-xs text-destructive flex items-center mt-1">
                  <Package size={14} className="mr-1" />
                  <span>Requires attention</span>
                </p>
              </div>
              <div className="bg-destructive/10 p-3 rounded-full">
                <Package className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily sales performance for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardSalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Top Selling Flavors</CardTitle>
            <CardDescription>This week's bestsellers</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardTopProducts />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <Calendar size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Inventory Restocking</p>
                  <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <Calendar size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Staff Meeting</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5">
                  <Calendar size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Supplier Payment Due</p>
                  <p className="text-sm text-muted-foreground">May 15, 2023</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Store Status</CardTitle>
            <CardDescription>Current performance across locations</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardStoreStatus />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
