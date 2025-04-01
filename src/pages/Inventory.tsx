
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Edit, Package, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { InventoryItemForm } from '@/components/inventory/InventoryItemForm';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minLevel: number;
  supplierName: string;
  costPerUnit: number;
  lastOrdered: string;
  expiryDate?: string;
}

const Inventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const ingredients: InventoryItem[] = [
    {
      id: '1',
      name: 'Whole Milk',
      category: 'Dairy',
      quantity: 25,
      unit: 'L',
      minLevel: 10,
      supplierName: 'Local Dairy Co.',
      costPerUnit: 2.50,
      lastOrdered: '2023-05-01',
      expiryDate: '2023-05-15',
    },
    {
      id: '2',
      name: 'Heavy Cream',
      category: 'Dairy',
      quantity: 15,
      unit: 'L',
      minLevel: 8,
      supplierName: 'Local Dairy Co.',
      costPerUnit: 4.75,
      lastOrdered: '2023-05-01',
      expiryDate: '2023-05-12',
    },
    {
      id: '3',
      name: 'Sugar',
      category: 'Dry Goods',
      quantity: 40,
      unit: 'kg',
      minLevel: 15,
      supplierName: 'Sweet Supplies Inc.',
      costPerUnit: 1.20,
      lastOrdered: '2023-04-15',
    },
    {
      id: '4',
      name: 'Cocoa Powder',
      category: 'Dry Goods',
      quantity: 6,
      unit: 'kg',
      minLevel: 5,
      supplierName: 'Sweet Supplies Inc.',
      costPerUnit: 8.50,
      lastOrdered: '2023-04-15',
    },
    {
      id: '5',
      name: 'Fresh Strawberries',
      category: 'Fruits',
      quantity: 5,
      unit: 'kg',
      minLevel: 8,
      supplierName: 'Fresh Farms Produce',
      costPerUnit: 6.99,
      lastOrdered: '2023-05-03',
      expiryDate: '2023-05-08',
    },
    {
      id: '6',
      name: 'Pistachio Paste',
      category: 'Flavorings',
      quantity: 3,
      unit: 'kg',
      minLevel: 2,
      supplierName: 'Italian Imports',
      costPerUnit: 24.99,
      lastOrdered: '2023-04-20',
    },
  ];

  const supplies: InventoryItem[] = [
    {
      id: '7',
      name: 'Cups (Small)',
      category: 'Containers',
      quantity: 250,
      unit: 'pieces',
      minLevel: 100,
      supplierName: 'Packaging Plus',
      costPerUnit: 0.10,
      lastOrdered: '2023-04-10',
    },
    {
      id: '8',
      name: 'Cups (Medium)',
      category: 'Containers',
      quantity: 320,
      unit: 'pieces',
      minLevel: 150,
      supplierName: 'Packaging Plus',
      costPerUnit: 0.15,
      lastOrdered: '2023-04-10',
    },
    {
      id: '9',
      name: 'Cups (Large)',
      category: 'Containers',
      quantity: 180,
      unit: 'pieces',
      minLevel: 100,
      supplierName: 'Packaging Plus',
      costPerUnit: 0.20,
      lastOrdered: '2023-04-10',
    },
    {
      id: '10',
      name: 'Spoons',
      category: 'Utensils',
      quantity: 450,
      unit: 'pieces',
      minLevel: 200,
      supplierName: 'Packaging Plus',
      costPerUnit: 0.05,
      lastOrdered: '2023-04-10',
    },
    {
      id: '11',
      name: 'Napkins',
      category: 'Supplies',
      quantity: 800,
      unit: 'pieces',
      minLevel: 300,
      supplierName: 'Packaging Plus',
      costPerUnit: 0.02,
      lastOrdered: '2023-04-10',
    },
  ];

  const filteredIngredients = ingredients.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSupplies = supplies.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = [...ingredients, ...supplies].filter(item => item.quantity <= item.minLevel);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gelato-chocolate">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels and order supplies</p>
        </div>
        <Button onClick={() => {
          setSelectedItem(null);
          setIsAddingItem(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertTriangle className="text-amber-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
                <p className="text-sm text-amber-700">
                  {lowStockItems.length} items are below their minimum stock level and need to be reordered.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lowStockItems.map(item => (
                    <Badge key={item.id} variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      {item.name}: {item.quantity} {item.unit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="ingredients">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="supplies">Packaging & Supplies</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryTable 
                items={filteredIngredients} 
                onEditItem={(item) => {
                  setSelectedItem(item);
                  setIsAddingItem(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="supplies">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Packaging & Supplies</CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryTable 
                items={filteredSupplies} 
                onEditItem={(item) => {
                  setSelectedItem(item);
                  setIsAddingItem(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InventoryItemForm 
        isOpen={isAddingItem} 
        onClose={() => setIsAddingItem(false)} 
        editItem={selectedItem}
      />
    </div>
  );
};

export default Inventory;
