
import React, { useState, useEffect } from 'react';
import { Product, Sale, User } from '../types';
import { getBusinessInsight } from '../geminiService';

interface DashboardProps {
  products: Product[];
  sales: Sale[];
  employees: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, sales, employees }) => {
  const [insight, setInsight] = useState('جاري التحليل الذكي للمبيعات...');
  const totalSales = sales.reduce((acc, sale) => acc + sale.grandTotal, 0);

  useEffect(() => {
    const fetchInsight = async () => {
      const res = await getBusinessInsight(`إجمالي المبيعات: ${totalSales} ريال، عدد المنتجات: ${products.length}، المنتجات منخفضة المخزون: ${products.filter(p=>p.stock<5).length}`);
      setInsight(res || 'لا توجد نصائح حالياً.');
    };
    fetchInsight();
  }, [sales, products]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">📊 لوحة التحكم</h1>
          <p className="text-slate-500 font-bold">نظرة عامة على أداء المحل اليوم</p>
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ الحالي</p>
          <p className="font-bold text-slate-700">{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-4">💰</div>
          <p className="text-xs font-bold text-slate-400">إجمالي المبيعات</p>
          <p className="text-2xl font-black text-slate-800">{totalSales.toFixed(2)} <span className="text-sm font-bold text-slate-400">ر.س</span></p>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4">📦</div>
          <p className="text-xs font-bold text-slate-400">أصناف المخزون</p>
          <p className="text-2xl font-black text-slate-800">{products.length}</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4">🧾</div>
          <p className="text-xs font-bold text-slate-400">إجمالي العمليات</p>
          <p className="text-2xl font-black text-slate-800">{sales.length}</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-4">👥</div>
          <p className="text-xs font-bold text-slate-400">طاقم العمل</p>
          <p className="text-2xl font-black text-slate-800">{employees.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative z-10 flex items-start gap-6">
              <div className="text-5xl">🤖</div>
              <div>
                <h3 className="text-xl font-black mb-2 text-blue-400">المساعد الذكي (Gemini AI)</h3>
                <p className="text-slate-300 leading-relaxed font-medium">"{insight}"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
            <span>📉</span> تنبيهات النواقص
          </h3>
          <div className="space-y-4">
            {products.filter(p => p.stock < 5).length === 0 ? (
              <p className="text-center py-10 text-slate-300 font-bold">المخزون مكتمل ✅</p>
            ) : products.filter(p => p.stock < 5).map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-red-50 rounded-2xl border border-red-100">
                <div>
                  <p className="font-black text-slate-800 text-sm">{p.name}</p>
                  <p className="text-[10px] text-red-500 font-bold">الكمية المتبقية: {p.stock}</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
