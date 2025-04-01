
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Calendar, ClipboardList } from 'lucide-react';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeSchedule } from '@/components/employees/EmployeeSchedule';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  startDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  payRate: number;
  address: string;
  emergencyContact: string;
  notes?: string;
  scheduleId?: string;
}

const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employees: Employee[] = [
    {
      id: '1',
      firstName: 'Marco',
      lastName: 'Rossi',
      role: 'Store Manager',
      email: 'marco.rossi@gelatoempire.com',
      phone: '(555) 123-4567',
      startDate: '2021-06-15',
      status: 'Active',
      payRate: 25.00,
      address: '123 Main St, Anytown, USA',
      emergencyContact: 'Anna Rossi: (555) 987-6543',
      scheduleId: '1',
    },
    {
      id: '2',
      firstName: 'Sofia',
      lastName: 'Bianchi',
      role: 'Gelato Chef',
      email: 'sofia.bianchi@gelatoempire.com',
      phone: '(555) 234-5678',
      startDate: '2022-01-10',
      status: 'Active',
      payRate: 22.50,
      address: '456 Oak Ave, Anytown, USA',
      emergencyContact: 'Luca Bianchi: (555) 876-5432',
      scheduleId: '2',
    },
    {
      id: '3',
      firstName: 'Elena',
      lastName: 'Marino',
      role: 'Cashier',
      email: 'elena.marino@gelatoempire.com',
      phone: '(555) 345-6789',
      startDate: '2022-03-22',
      status: 'Active',
      payRate: 16.00,
      address: '789 Pine Rd, Anytown, USA',
      emergencyContact: 'Roberto Marino: (555) 765-4321',
      scheduleId: '3',
    },
    {
      id: '4',
      firstName: 'Alessandro',
      lastName: 'Ricci',
      role: 'Server',
      email: 'alessandro.ricci@gelatoempire.com',
      phone: '(555) 456-7890',
      startDate: '2022-05-18',
      status: 'Active',
      payRate: 15.00,
      address: '101 Maple Dr, Anytown, USA',
      emergencyContact: 'Chiara Ricci: (555) 654-3210',
      scheduleId: '4',
    },
    {
      id: '5',
      firstName: 'Giulia',
      lastName: 'Fontana',
      role: 'Server',
      email: 'giulia.fontana@gelatoempire.com',
      phone: '(555) 567-8901',
      startDate: '2022-06-14',
      status: 'On Leave',
      payRate: 15.00,
      address: '202 Elm St, Anytown, USA',
      emergencyContact: 'Marco Fontana: (555) 543-2109',
      notes: 'On maternity leave until August 2023',
      scheduleId: '5',
    },
  ];

  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gelato-chocolate">Employee Management</h1>
          <p className="text-muted-foreground">Manage your team and schedules</p>
        </div>
        <Button onClick={() => {
          setSelectedEmployee(null);
          setIsAddingEmployee(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      <div className="flex">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list" className="flex items-center">
            <ClipboardList className="h-4 w-4 mr-2" />
            Employee List
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedules
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Employee Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeTable 
                employees={filteredEmployees} 
                onEditEmployee={(employee) => {
                  setSelectedEmployee(employee);
                  setIsAddingEmployee(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeSchedule employees={employees} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EmployeeForm 
        isOpen={isAddingEmployee} 
        onClose={() => setIsAddingEmployee(false)} 
        editEmployee={selectedEmployee}
      />
    </div>
  );
};

export default Employees;
