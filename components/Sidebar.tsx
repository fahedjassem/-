
import React from 'react';
import { AppPages } from '../types';

interface SidebarProps {
  currentPage: AppPages;
  setCurrentPage: (page: AppPages) => void;
  onLogout: () => void;
  userRole: string;
  userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout, userRole, userName }) => {
  const menuItems = [
    { id: AppPages.DASHBOARD, label: 'لوحة التحكم', icon: '📊' },
    { id: AppPages.SALES, label: 'كاشير المبيعات', icon: '💰' },
    { id: AppPages.REPORTS, label: 'سجل الفواتير', icon: '🧾' },
    { id: AppPages.INVENTORY, label: 'المخزون', icon: '📦' },
    { id: AppPages.EMPLOYEES, label: 'إدارة الموظفين', icon: '👥' },
    { id: AppPages.BACKUP, label: 'نقل البيانات', icon: '🔄' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col no-print border-l border-slate-800 shadow-2xl shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
          <span>🔑</span> كي ماستر
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">KeyMaster POS</p>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  currentPage === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-slate-800/40 rounded-2xl">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black shrink-0">
             {userName.charAt(0)}
           </div>
           <div className="overflow-hidden">
             <p className="text-xs font-black truncate">{userName}</p>
             <p className="text-[9px] text-slate-400 font-bold uppercase">{userRole}</p>
           </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm">
          <span>🚪</span> خروج
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
