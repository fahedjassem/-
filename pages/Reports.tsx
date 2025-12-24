
import React from 'react';
import { Sale } from '../types';

const Reports: React.FC<{ sales: Sale[] }> = ({ sales }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-black text-slate-900">🧾 سجل الفواتير</h1>
    <div className="bg-white rounded-[2rem] shadow border overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-6 text-xs font-black">رقم الفاتورة</th>
            <th className="p-6 text-xs font-black">التاريخ</th>
            <th className="p-6 text-xs font-black">المبلغ</th>
            <th className="p-6 text-xs font-black text-center">الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {sales.slice().reverse().map(s => (
            <tr key={s.id} className="border-t">
              <td className="p-6 font-mono font-bold">{s.id}</td>
              <td className="p-6 text-sm">{new Date(s.date).toLocaleString('ar-SA')}</td>
              <td className="p-6 font-black text-blue-600">{s.grandTotal.toFixed(2)} ر.س</td>
              <td className="p-6 text-center">
                <button onClick={() => window.print()} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">طباعة</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Reports;
