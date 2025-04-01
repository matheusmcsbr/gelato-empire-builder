
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MinusCircle, Trash2, CreditCard, DollarSign, Receipt } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { POSFlavorGrid } from '@/components/pos/POSFlavorGrid';
import { POSToppingGrid } from '@/components/pos/POSToppingGrid';

interface CartItem {
  id: string;
  name: string;
  size: 'Small' | 'Medium' | 'Large';
  price: number;
  quantity: number;
  toppings: string[];
}

const PointOfSale: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [cashReceived, setCashReceived] = useState<string>('');

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      quantity: 1
    };
    
    setCart([...cart, newItem]);
    toast.success(`Added ${item.name} to cart`);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax rate
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutOpen(true);
  };

  const handlePaymentComplete = () => {
    setCheckoutOpen(false);
    toast.success("Payment processed successfully!");
    
    // Reset cart and state
    setCart([]);
    setPaymentMethod('card');
    setCashReceived('');
  };

  const getChange = () => {
    if (!cashReceived) return 0;
    const received = parseFloat(cashReceived);
    return received > getTotal() ? received - getTotal() : 0;
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-gelato-chocolate mb-6">Point of Sale</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="flavors">
                <TabsList className="mb-6">
                  <TabsTrigger value="flavors">Gelato Flavors</TabsTrigger>
                  <TabsTrigger value="toppings">Toppings</TabsTrigger>
                </TabsList>
                <TabsContent value="flavors">
                  <POSFlavorGrid onAddToCart={addToCart} />
                </TabsContent>
                <TabsContent value="toppings">
                  <POSToppingGrid />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Current Order</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Cart is empty. Add some delicious gelato!
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.size}</div>
                        {item.toppings.length > 0 && (
                          <div className="text-xs text-muted-foreground">
                            + {item.toppings.join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle size={16} />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <PlusCircle size={16} />
                        </Button>
                        <div className="w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-destructive hover:text-destructive/80"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="space-y-2 py-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full bg-gelato-mint hover:bg-gelato-pistachio text-black"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Total amount: ${getTotal().toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-4 mb-4">
              <Button 
                variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </Button>
              <Button 
                variant={paymentMethod === 'cash' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setPaymentMethod('cash')}
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Cash
              </Button>
            </div>
            
            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm" htmlFor="cash-received">Cash Received</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cash-received"
                      type="number"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                {parseFloat(cashReceived) > 0 && (
                  <div>
                    <p className="text-sm font-medium">Change Due</p>
                    <p className="text-2xl font-bold">${getChange().toFixed(2)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentComplete}>
              <Receipt className="mr-2 h-4 w-4" />
              Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PointOfSale;
