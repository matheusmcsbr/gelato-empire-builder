
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
  Settings,
  IceCream
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
      <div className="h-20 flex items-center justify-center px-4 bg-gradient-to-r from-blue-500/50 to-teal-400/50">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-2">
            <div className="bg-white p-2 rounded-full">
              <IceCream size={isOpen ? 24 : 20} className="text-blue-600" />
            </div>
          </div>
          <div className={cn(
            "flex flex-col transition-opacity duration-300",
            !isOpen && "md:opacity-0"
          )}>
            <span className="text-lg font-bold text-blue-800 italic font-serif">
              Gelato di Mare
            </span>
            <span className="text-xs text-blue-700 italic">Authentic Italian Gelato</span>
          </div>
        </div>
        <div className={cn(
          "w-10 h-10 rounded-full bg-white flex items-center justify-center transition-opacity duration-300",
          isOpen && "md:hidden",
          !isOpen && "md:opacity-100"
        )}>
          <span className="text-blue-700 font-bold">GdM</span>
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
