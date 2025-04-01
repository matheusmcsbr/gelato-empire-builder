
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Flavor {
  id: string;
  name: string;
  color: string;
  basePrice: number;
}

interface Size {
  name: 'Small' | 'Medium' | 'Large';
  priceMultiplier: number;
}

interface CartItemInput {
  name: string;
  size: 'Small' | 'Medium' | 'Large';
  price: number;
  toppings: string[];
}

interface POSFlavorGridProps {
  onAddToCart: (item: CartItemInput) => void;
}

const flavors: Flavor[] = [
  { id: 'stracciatella', name: 'Stracciatella', color: 'bg-gelato-vanilla', basePrice: 4.5 },
  { id: 'chocolate', name: 'Chocolate', color: 'bg-gelato-chocolate', basePrice: 4.5 },
  { id: 'strawberry', name: 'Strawberry', color: 'bg-gelato-strawberry', basePrice: 4.5 },
  { id: 'pistachio', name: 'Pistachio', color: 'bg-gelato-pistachio', basePrice: 5.0 },
  { id: 'blueberry', name: 'Blueberry', color: 'bg-gelato-blueberry', basePrice: 4.5 },
  { id: 'mint', name: 'Mint Chocolate Chip', color: 'bg-gelato-mint', basePrice: 5.0 },
  { id: 'caramel', name: 'Caramel Swirl', color: 'bg-gelato-vanilla', basePrice: 5.0 },
  { id: 'coffee', name: 'Coffee', color: 'bg-brown-400', basePrice: 4.5 },
  { id: 'vanilla', name: 'Vanilla Bean', color: 'bg-gelato-vanilla', basePrice: 4.0 },
  { id: 'lemon', name: 'Lemon Sorbet', color: 'bg-yellow-200', basePrice: 4.5 },
  { id: 'raspberry', name: 'Raspberry Sorbet', color: 'bg-red-300', basePrice: 4.5 },
  { id: 'coconut', name: 'Coconut', color: 'bg-gray-100', basePrice: 5.0 },
];

const sizes: Size[] = [
  { name: 'Small', priceMultiplier: 1 },
  { name: 'Medium', priceMultiplier: 1.5 },
  { name: 'Large', priceMultiplier: 2 },
];

const toppings = [
  { id: 'choco-chips', name: 'Chocolate Chips', price: 0.75 },
  { id: 'sprinkles', name: 'Sprinkles', price: 0.5 },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 0.75 },
  { id: 'caramel-sauce', name: 'Caramel Sauce', price: 0.75 },
  { id: 'choco-sauce', name: 'Chocolate Sauce', price: 0.75 },
  { id: 'nuts', name: 'Nuts', price: 1.0 },
];

export const POSFlavorGrid: React.FC<POSFlavorGridProps> = ({ onAddToCart }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFlavorClick = (flavor: Flavor) => {
    setSelectedFlavor(flavor);
    setSelectedSize('Medium');
    setSelectedToppings([]);
    setIsDialogOpen(true);
  };

  const handleToppingChange = (toppingName: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingName)
        ? prev.filter(t => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const handleAddToCart = () => {
    if (!selectedFlavor) return;

    const sizeMultiplier = sizes.find(s => s.name === selectedSize)?.priceMultiplier || 1;
    const toppingsPrice = selectedToppings.reduce((total, toppingName) => {
      const topping = toppings.find(t => t.name === toppingName);
      return total + (topping?.price || 0);
    }, 0);

    const totalPrice = (selectedFlavor.basePrice * sizeMultiplier) + toppingsPrice;

    onAddToCart({
      name: selectedFlavor.name,
      size: selectedSize,
      price: totalPrice,
      toppings: selectedToppings
    });

    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flavors.map((flavor) => (
          <Card key={flavor.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center flex flex-col items-center h-32 justify-center" onClick={() => handleFlavorClick(flavor)}>
              <div className={`w-16 h-16 rounded-full ${flavor.color} mb-2 border-2 border-gray-200`}></div>
              <p className="font-medium text-sm">{flavor.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {selectedFlavor?.name}</DialogTitle>
            <DialogDescription>
              Choose size and optional toppings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="mb-3 font-medium">Size</h3>
              <RadioGroup value={selectedSize} onValueChange={(value) => setSelectedSize(value as 'Small' | 'Medium' | 'Large')}>
                <div className="flex space-x-4">
                  {sizes.map((size) => (
                    <div key={size.name} className="flex items-center space-x-2">
                      <RadioGroupItem value={size.name} id={`size-${size.name.toLowerCase()}`} />
                      <Label htmlFor={`size-${size.name.toLowerCase()}`}>
                        {size.name} (${selectedFlavor ? (selectedFlavor.basePrice * size.priceMultiplier).toFixed(2) : '0.00'})
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Toppings</h3>
              <div className="grid grid-cols-2 gap-4">
                {toppings.map((topping) => (
                  <div key={topping.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={topping.id} 
                      checked={selectedToppings.includes(topping.name)}
                      onCheckedChange={() => handleToppingChange(topping.name)}
                    />
                    <Label htmlFor={topping.id}>
                      {topping.name} (+${topping.price.toFixed(2)})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add to Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
