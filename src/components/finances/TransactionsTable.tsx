
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Download, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, subDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { exportToExcel } from '@/utils/exportUtils';

// Mock transaction data - this would come from your database in a real app
const generateMockTransactions = () => {
  const transactions = [];
  const products = ['Stracciatella', 'Pistachio', 'Strawberry', 'Chocolate', 'Blueberry', 'Vanilla'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'];
  const statuses = ['Completed', 'Refunded'];
  
  // Generate 100 transactions over the last 30 days
  for (let i = 0; i < 100; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const price = parseFloat((Math.random() * 5 + 3).toFixed(2));
    const date = subDays(new Date(), Math.floor(Math.random() * 30));
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const status = Math.random() > 0.1 ? statuses[0] : statuses[1]; // 10% refunded
    
    transactions.push({
      id: `TRX-${10000 + i}`,
      date,
      product: randomProduct,
      quantity,
      price,
      total: parseFloat((quantity * price).toFixed(2)),
      paymentMethod,
      status
    });
  }
  
  // Sort by date, newest first
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const mockTransactions = generateMockTransactions();

type DateRangeType = 'day' | 'week' | 'month' | 'year' | 'custom';

interface TransactionsTableProps {
  isLoading?: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ isLoading = false }) => {
  const [transactions] = useState(mockTransactions);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeType>('week');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const perPage = 10;

  const getDateRangeLabel = (): string => {
    if (!selectedDate) return '';
    
    switch (dateRange) {
      case 'day':
        return format(selectedDate, 'PPP');
      case 'week':
        const weekStart = subDays(selectedDate, selectedDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'year':
        return format(selectedDate, 'yyyy');
      default:
        return '';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchLower) ||
      transaction.product.toLowerCase().includes(searchLower) ||
      transaction.paymentMethod.toLowerCase().includes(searchLower);
    
    // Payment method filter
    const matchesPayment = paymentFilter === 'all' || transaction.paymentMethod === paymentFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    // Date range filter - simplified for the mock data
    let matchesDate = true;
    if (selectedDate) {
      const txDate = transaction.date;
      
      switch (dateRange) {
        case 'day':
          matchesDate = 
            txDate.getDate() === selectedDate.getDate() &&
            txDate.getMonth() === selectedDate.getMonth() &&
            txDate.getFullYear() === selectedDate.getFullYear();
          break;
        case 'week':
          // Simple week calculation - find transactions in the same week
          const weekStart = subDays(selectedDate, selectedDate.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          matchesDate = txDate >= weekStart && txDate <= weekEnd;
          break;
        case 'month':
          matchesDate = 
            txDate.getMonth() === selectedDate.getMonth() &&
            txDate.getFullYear() === selectedDate.getFullYear();
          break;
        case 'year':
          matchesDate = txDate.getFullYear() === selectedDate.getFullYear();
          break;
      }
    }
    
    return matchesSearch && matchesPayment && matchesStatus && matchesDate;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / perPage);

  const handleExport = () => {
    const dataToExport = filteredTransactions.map(t => ({
      ID: t.id,
      Date: format(t.date, 'MM/dd/yyyy hh:mm a'),
      Product: t.product,
      Quantity: t.quantity,
      Price: `$${t.price.toFixed(2)}`,
      Total: `$${t.total.toFixed(2)}`,
      PaymentMethod: t.paymentMethod,
      Status: t.status
    }));

    exportToExcel(dataToExport, `transactions-${dateRange}-${format(new Date(), 'yyyy-MM-dd')}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle>Sales Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={(value: DateRangeType) => setDateRange(value)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Daily</SelectItem>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {selectedDate ? getDateRangeLabel() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    Loading transactions...
                  </TableCell>
                </TableRow>
              ) : paginatedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{format(transaction.date, 'MM/dd/yyyy')}</TableCell>
                    <TableCell>{transaction.product}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>${transaction.price.toFixed(2)}</TableCell>
                    <TableCell>${transaction.total.toFixed(2)}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === 'Completed' ? 'outline' : 'destructive'}
                        className={cn(
                          transaction.status === 'Completed' 
                            ? 'bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700' 
                            : ''
                        )}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page > 1 ? page - 1 : 1);
                    }}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      isActive={page === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page < totalPages ? page + 1 : totalPages);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
