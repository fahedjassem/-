
import React, { useState } from 'react';
import { Product } from '../types';

interface InventoryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ products, setProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '', category: 'car', price: 0, cost: 0, stock: 0, code: ''
  });

  const filteredProducts = products.filter(p => 
    p.name.includes(searchTerm) || (p.code && p.code.includes(searchTerm))
  );

  const openAdd = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'car', price: 0, cost: 0, stock: 0, code: '' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({ ...p });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الصنف نهائياً؟')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">📦 إدارة المخزون</h1>
          <p className="text-slate-500 font-bold mt-1">إضافة، تعديل، ومراقبة كميات المفاتيح والقطع</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="بحث في المخزن..." 
              className="w-full pr-10 pl-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>
          <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap">
            ➕ صنف جديد
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">المنتج / الكود</th>
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">التصنيف</th>
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">التكلفة</th>
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">سعر البيع</th>
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">الكمية</th>
                <th className="p-6 text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-slate-300 font-black text-xl italic opacity-50">لا توجد أصناف تطابق بحثك حالياً</td>
                </tr>
              ) : filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <p className="font-black text-slate-800 text-base">{p.name}</p>
                    <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-tighter">Code: {p.code || '---'}</p>
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest italic">
                      {p.category === 'car' ? 'سيارات' : p.category === 'house' ? 'منازل' : p.category === 'programming' ? 'برمجة' : 'إكسسوار'}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-slate-400 text-sm">{p.cost} ر.س</td>
                  <td className="p-6 font-black text-blue-600 text-lg">{p.price} <span className="text-[10px]">ر.س</span></td>
                  <td className="p-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-2 ${p.stock < 5 ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${p.stock < 5 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                       {p.stock} قطعة
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-3 bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">✏️</button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[150] p-4 animate-in fade-in duration-300">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] w-full max-w-xl space-y-8 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
               <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                 <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">📦</span>
                 {editingId ? 'تحديث بيانات الصنف' : 'إضافة صنف جديد للمخزون'}
               </h2>
               <button type="button" onClick={()=>setShowModal(false)} className="text-slate-300 hover:text-slate-500 text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">اسم المنتج أو القطعة</label>
                <input required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} placeholder="مثال: مفتاح تويوتا كامري 2024 ذكي" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">سعر التكلفة</label>
                <input required type="number" step="0.01" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" value={formData.cost || ''} onChange={e=>setFormData({...formData, cost:Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">سعر البيع</label>
                <input required type="number" step="0.01" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-blue-600 outline-none" value={formData.price || ''} onChange={e=>setFormData({...formData, price:Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">الكمية الحالية</label>
                <input required type="number" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" value={formData.stock || ''} onChange={e=>setFormData({...formData, stock:Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">التصنيف</label>
                <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none cursor-pointer" value={formData.category} onChange={e=>setFormData({...formData, category:e.target.value as any})}>
                   <option value="car">مفاتيح سيارات</option>
                   <option value="house">مفاتيح منازل</option>
                   <option value="programming">برمجة</option>
                   <option value="accessory">إكسسوارات</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block mr-4">الكود التعريفي (SKU)</label>
                <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-xs font-bold outline-none" value={formData.code} onChange={e=>setFormData({...formData, code:e.target.value})} placeholder="CODE-12345" />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="flex-1 bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black shadow-xl shadow-slate-900/20 transition-all active:scale-95 text-lg">
                {editingId ? 'حفظ التعديلات' : 'إضافة للمخزون'}
              </button>
              <button type="button" onClick={()=>setShowModal(false)} className="px-10 py-5 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all">إلغاء</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Inventory;
