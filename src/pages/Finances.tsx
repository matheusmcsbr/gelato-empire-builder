
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, CreditCard, Receipt } from 'lucide-react';

const Finances: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gelato-chocolate">Financial Management</h1>
        <p className="text-muted-foreground">Track revenue, expenses, and financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Monthly Revenue</p>
                <p className="gelato-stat">$42,845.90</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>8% from last month</span>
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Monthly Expenses</p>
                <p className="gelato-stat">$28,623.45</p>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>5% from last month</span>
                </p>
              </div>
              <div className="bg-destructive/10 p-3 rounded-full">
                <Receipt className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Net Profit</p>
                <p className="gelato-stat">$14,222.45</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>12% from last month</span>
                </p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="gelato-stat-label">Average Order Value</p>
                <p className="gelato-stat">$15.75</p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>3% from last month</span>
                </p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Receipt className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-12">
              The detailed financial reports and analysis section is under development. Check back soon for comprehensive financial tools.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finances;
