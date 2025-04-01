
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, MapPin, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const Planning: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gelato-chocolate">Store Planning</h1>
        <p className="text-muted-foreground">Plan and manage your gelato empire expansion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="mr-2 h-5 w-5 text-primary" />
              New Store Setup Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 flex-shrink-0 rounded-full border border-green-500 bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-500 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium">Location Research</p>
                  <p className="text-sm text-muted-foreground">Identify high-traffic areas with target demographics</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 flex-shrink-0 rounded-full border border-green-500 bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-500 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium">Business Plan</p>
                  <p className="text-sm text-muted-foreground">Create detailed financial projections and market analysis</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-400 text-xs">3</span>
                </div>
                <div>
                  <p className="font-medium">Secure Funding</p>
                  <p className="text-sm text-muted-foreground">Obtain necessary capital through loans or investors</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-400 text-xs">4</span>
                </div>
                <div>
                  <p className="font-medium">Legal Requirements</p>
                  <p className="text-sm text-muted-foreground">Register business, obtain permits and food licenses</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center mr-3">
                  <span className="text-gray-400 text-xs">5</span>
                </div>
                <div>
                  <p className="font-medium">Equipment Purchase</p>
                  <p className="text-sm text-muted-foreground">Order gelato machines, freezers, and display cases</p>
                </div>
              </li>
            </ul>
            <Button className="w-full mt-6">View Complete Checklist</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-secondary" />
              Location Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg h-40 flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map view coming soon</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Top Potential Locations:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b pb-2">
                    <span>Downtown - Main Street</span>
                    <span className="text-green-600">98% match</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>Westside Shopping Plaza</span>
                    <span className="text-green-600">92% match</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span>University District</span>
                    <span className="text-amber-600">84% match</span>
                  </li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">View Location Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-accent-foreground" />
              Expansion Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Stores</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Store className="h-4 w-4 mr-1 text-primary" />
                    <span>3</span>
                  </div>
                </div>
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Staff</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Users className="h-4 w-4 mr-1 text-secondary" />
                    <span>24</span>
                  </div>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Revenue</div>
                  <div className="text-2xl font-bold flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-accent-foreground" />
                    <span>145K</span>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">Target</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Q4</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">View Expansion Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment & Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Essential Equipment</h3>
              <ul className="space-y-2">
                <li className="flex justify-between border-b pb-2">
                  <span>Commercial Gelato Machine</span>
                  <span>$12,000 - $25,000</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Display Case (8 flavors)</span>
                  <span>$4,500 - $8,000</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Blast Freezer</span>
                  <span>$3,200 - $6,000</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Storage Freezer</span>
                  <span>$2,800 - $5,500</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>POS System</span>
                  <span>$1,500 - $3,000</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Recommended Suppliers</h3>
              <ul className="space-y-2">
                <li className="flex justify-between border-b pb-2">
                  <span>Italian Imports Co.</span>
                  <span className="text-green-600">Premium</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Gelato Equipment USA</span>
                  <span className="text-green-600">Reliable</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Local Dairy Farms</span>
                  <span className="text-amber-600">Regional</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Sweet Supplies Inc.</span>
                  <span className="text-green-600">Wholesale</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Fresh Farms Produce</span>
                  <span className="text-green-600">Organic</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Planning;
