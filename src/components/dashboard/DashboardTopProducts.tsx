
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface TopProduct {
  flavor: string;
  sales: number;
  color: string;
}

const topProducts: TopProduct[] = [
  { flavor: 'Stracciatella', sales: 84, color: 'bg-gelato-vanilla' },
  { flavor: 'Pistachio', sales: 71, color: 'bg-gelato-pistachio' },
  { flavor: 'Strawberry', sales: 65, color: 'bg-gelato-strawberry' },
  { flavor: 'Chocolate', sales: 58, color: 'bg-gelato-chocolate' },
  { flavor: 'Blueberry', sales: 42, color: 'bg-gelato-blueberry' },
];

export const DashboardTopProducts: React.FC = () => {
  // Find the max sales value for percentage calculation
  const maxSales = Math.max(...topProducts.map(product => product.sales));

  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.flavor} className="space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${product.color} mr-2`}></div>
              <span>{product.flavor}</span>
            </div>
            <span className="text-sm font-medium">{product.sales} units</span>
          </div>
          <Progress value={(product.sales / maxSales) * 100} className={product.color} />
        </div>
      ))}
    </div>
  );
};
