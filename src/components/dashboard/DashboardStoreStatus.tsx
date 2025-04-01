
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StoreData {
  name: string;
  location: string;
  status: 'Open' | 'Closed';
  revenue: number;
  change: number;
  lastUpdated: string;
}

const storeData: StoreData[] = [
  {
    name: 'Little Italy',
    location: 'Downtown',
    status: 'Open',
    revenue: 2458.32,
    change: 12.5,
    lastUpdated: '10 minutes ago'
  },
  {
    name: 'Gelato Central',
    location: 'Midtown',
    status: 'Open',
    revenue: 1854.17,
    change: -3.2,
    lastUpdated: '25 minutes ago'
  },
  {
    name: 'Sweet Scoop',
    location: 'Westside',
    status: 'Closed',
    revenue: 0,
    change: 0,
    lastUpdated: '8 hours ago'
  }
];

export const DashboardStoreStatus: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Store</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Today's Revenue</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {storeData.map((store) => (
            <tr key={store.name} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4 font-medium">{store.name}</td>
              <td className="py-3 px-4">{store.location}</td>
              <td className="py-3 px-4">
                <Badge variant={store.status === 'Open' ? 'default' : 'secondary'}>
                  {store.status}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="font-medium">${store.revenue.toFixed(2)}</span>
                  {store.change !== 0 && (
                    <div className={`flex items-center ml-2 ${store.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {store.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="ml-1 text-xs">{Math.abs(store.change)}%</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground">{store.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
