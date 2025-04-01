
import React from 'react';
import { InventoryItem } from '@/pages/Inventory';
import { Edit, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface InventoryTableProps {
  items: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, onEditItem }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Last Ordered</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No items found.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={item.quantity <= item.minLevel ? 'text-destructive font-medium' : ''}>
                      {item.quantity} {item.unit}
                    </span>
                    {item.quantity <= item.minLevel && (
                      <AlertTriangle className="h-4 w-4 text-destructive ml-2" />
                    )}
                  </div>
                  {item.expiryDate && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{item.supplierName}</TableCell>
                <TableCell>${item.costPerUnit.toFixed(2)}/{item.unit}</TableCell>
                <TableCell>{new Date(item.lastOrdered).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => onEditItem(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
