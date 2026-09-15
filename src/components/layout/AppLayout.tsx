import React from 'react';
import { cn } from '@/src/lib/utils';
import { Calendar, LayoutDashboard, PawPrint, ShoppingBag, LogOut, Smartphone } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onRoleChange: () => void;
}

export function AppLayout({ children, activeTab, onTabChange, onRoleChange }: AppLayoutProps) {
  const navItems = [
    { id: 'overview', label: '總覽', icon: LayoutDashboard },
    { id: 'calendar', label: '預約行事曆', icon: Calendar },
    { id: 'pets', label: '寵物與病史', icon: PawPrint },
    { id: 'store', label: '耗材商城', icon: ShoppingBag },
  ];

  return (
    <div className="flex h-screen w-full bg-stone-50 overflow-hidden text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-stone-200 bg-white flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <PawPrint className="text-amber-600" />
            PetGroom Pro
          </h1>
          <p className="text-xs text-stone-500 mt-1">專業寵物美容管理系統</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-amber-50 text-amber-900" 
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-100 space-y-2">
           <button
            onClick={onRoleChange}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Smartphone className="w-5 h-5" />
            模擬飼主 LIFF 端
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            登出
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
