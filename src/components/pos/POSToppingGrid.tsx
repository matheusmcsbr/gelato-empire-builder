
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Topping {
  id: string;
  name: string;
  price: number;
  color: string;
  image?: string;
}

const toppings: Topping[] = [
  { id: 'choco-chips', name: 'Chocolate Chips', price: 0.75, color: 'bg-gelato-chocolate' },
  { id: 'sprinkles', name: 'Sprinkles', price: 0.5, color: 'bg-gradient-to-r from-pink-300 via-blue-300 to-yellow-300' },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 0.75, color: 'bg-white border border-gray-200' },
  { id: 'caramel-sauce', name: 'Caramel Sauce', price: 0.75, color: 'bg-amber-300' },
  { id: 'choco-sauce', name: 'Chocolate Sauce', price: 0.75, color: 'bg-gelato-chocolate' },
  { id: 'nuts', name: 'Nuts', price: 1.0, color: 'bg-amber-700' },
  { id: 'berries', name: 'Fresh Berries', price: 1.25, color: 'bg-red-400' },
  { id: 'cookies', name: 'Cookie Crumbs', price: 0.75, color: 'bg-amber-200' },
];

export const POSToppingGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {toppings.map((topping) => (
        <Card key={topping.id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center flex flex-col items-center h-32 justify-center">
            <div className={`w-16 h-16 rounded-full ${topping.color} mb-2`}></div>
            <p className="font-medium text-sm">{topping.name}</p>
            <p className="text-xs text-muted-foreground">${topping.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
