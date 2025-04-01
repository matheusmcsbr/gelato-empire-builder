
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Store, 
  Bell, 
  CreditCard, 
  Lock, 
  Settings as SettingsIcon, 
  Save 
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gelato-chocolate">Settings</h1>
        <p className="text-muted-foreground">Manage your system preferences and configurations</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="border-b px-0 mb-6 w-full justify-start">
          <TabsTrigger value="general" className="flex items-center">
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center">
            <Store className="h-4 w-4 mr-2" />
            Store
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Configure application-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Dark Mode</Label>
                    <Switch id="theme" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for the application interface
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-logout">Auto Logout</Label>
                    <Switch id="auto-logout" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after 30 minutes of inactivity
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full border rounded px-3 py-2 bg-background">
                    <option value="en">English</option>
                    <option value="it">Italian</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <select id="date-format" className="w-full border rounded px-3 py-2 bg-background">
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Receipt Settings</CardTitle>
                <CardDescription>Configure receipt printing options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="receipt-header">Receipt Header</Label>
                  <Textarea 
                    id="receipt-header" 
                    placeholder="Enter text to appear at the top of receipts..."
                    defaultValue="Gelato Empire - Authentic Italian Gelato"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receipt-footer">Receipt Footer</Label>
                  <Textarea 
                    id="receipt-footer" 
                    placeholder="Enter text to appear at the bottom of receipts..."
                    defaultValue="Thank you for your business! Visit us online at www.gelatoempire.com"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="print-duplicate">Print Duplicate Receipt</Label>
                    <Switch id="print-duplicate" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Print two copies of each receipt
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-tax">Show Tax Details</Label>
                    <Switch id="show-tax" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Display tax breakdown on receipts
                  </p>
                </div>
                
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Receipt Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Gelato Empire - Downtown" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Phone Number</Label>
                  <Input id="store-phone" defaultValue="(555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email Address</Label>
                  <Input id="store-email" type="email" defaultValue="info@gelatoempire.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-website">Website</Label>
                  <Input id="store-website" defaultValue="www.gelatoempire.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Address</Label>
                <Textarea 
                  id="store-address" 
                  defaultValue="123 Main Street, Downtown, Anytown, USA 12345"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-hours">Business Hours</Label>
                <Textarea 
                  id="store-hours" 
                  defaultValue="Monday - Thursday: 11:00 AM - 9:00 PM
Friday - Sunday: 11:00 AM - 10:00 PM"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" defaultValue="8.0" />
              </div>
              
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Store Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Marco" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Rossi" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="marco.rossi@gelatoempire.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">System Notifications</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-inventory">Inventory Alerts</Label>
                    <Switch id="notify-inventory" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when inventory items fall below minimum levels
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-sales">Daily Sales Reports</Label>
                    <Switch id="notify-sales" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive end-of-day sales report notifications
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-staff">Staff Schedule Changes</Label>
                    <Switch id="notify-staff" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when staff schedules are updated
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-tasks">Task Reminders</Label>
                    <Switch id="notify-tasks" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders for upcoming and overdue tasks
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Methods</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-email">Email Notifications</Label>
                    <Switch id="notify-email" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-app">In-App Notifications</Label>
                    <Switch id="notify-app" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-sms">SMS Notifications</Label>
                    <Switch id="notify-sms" />
                  </div>
                </div>
              </div>
              
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your billing preferences and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center py-12">
                The billing management section is under development. Check back soon to manage your payment methods and subscription details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
