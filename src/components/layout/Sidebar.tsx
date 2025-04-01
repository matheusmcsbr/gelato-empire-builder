
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Store, 
  Calendar,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems: SidebarItem[] = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Point of Sale', path: '/pos', icon: ShoppingCart },
    { title: 'Inventory', path: '/inventory', icon: Package },
    { title: 'Employees', path: '/employees', icon: Users },
    { title: 'Finances', path: '/finances', icon: TrendingUp },
    { title: 'Store Planning', path: '/planning', icon: Store },
    { title: 'Tasks', path: '/tasks', icon: Calendar },
    { title: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out border-r border-sidebar-border md:relative",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-20"
      )}
    >
      <div className="h-16 flex items-center justify-center px-4 bg-gradient-to-r from-gelato-strawberry/50 to-gelato-vanilla/50">
        <span className={cn(
          "text-lg font-bold text-gelato-chocolate transition-opacity duration-300",
          !isOpen && "md:opacity-0"
        )}>
          Gelato Empire
        </span>
        <div className={cn(
          "w-10 h-10 rounded-full bg-gelato-vanilla flex items-center justify-center transition-opacity duration-300",
          isOpen && "md:hidden",
          !isOpen && "md:opacity-100"
        )}>
          <span className="text-gelato-chocolate font-bold">GE</span>
        </div>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg hover:bg-sidebar-accent group transition-colors",
                  currentPath === item.path && "bg-sidebar-accent text-primary"
                )}
              >
                <item.icon size={20} className={cn(
                  "flex-shrink-0 transition-colors",
                  currentPath === item.path ? "text-primary" : "text-gray-500 group-hover:text-primary"
                )} />
                <span className={cn(
                  "ml-3 transition-opacity duration-300",
                  !isOpen && "md:hidden"
                )}>
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
