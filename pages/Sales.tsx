
import React, { useState } from 'react';
import { Product, Sale, SaleItem, User } from '../types';

interface SalesProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  sales: Sale[];
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
  currentUser: User;
}

const Sales: React.FC<SalesProps> = ({ products, setProducts, sales, setSales, currentUser }) => {
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<Sale | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const grandTotal = subtotal + tax;

  const addToCart = (p: Product) => {
    if (p.stock <= 0) {
      alert('عذراً، هذا الصنف غير متوفر في المخزون!');
      return;
    }
    const existing = cart.find(i => i.productId === p.id);
    if (existing) {
      if (existing.quantity >= p.stock) {
        alert('لا توجد كمية كافية في المخزون!');
        return;
      }
      setCart(cart.map(i => i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { productId: p.id, name: p.name, quantity: 1, price: p.price }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.productId !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newSale: Sale = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      total: subtotal,
      discount: 0,
      tax: tax,
      grandTotal: grandTotal,
      employeeId: currentUser.id,
      employeeName: currentUser.name
    };

    const updatedProducts = products.map(p => {
      const cartItem = cart.find(ci => ci.productId === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    });

    setProducts(updatedProducts);
    setSales([...sales, newSale]);
    setActiveReceipt(newSale);
    setCart([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-12 gap-8 h-full">
      <div className="col-span-8 flex flex-col h-full space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-800">🛍️ شاشة الكاشير</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">POS Interface</p>
          </div>
          <div className="bg-blue-50 px-6 py-3 rounded-2xl flex items-center gap-3 border border-blue-100 shadow-sm">
             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
             <p className="text-sm font-black text-blue-600">نظام البيع مفعل</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-10">
          {products.map(p => (
            <button 
              key={p.id} 
              onClick={() => addToCart(p)}
              disabled={p.stock <= 0}
              className={`bg-white p-6 rounded-[2rem] border-2 border-transparent shadow-sm hover:border-blue-500 hover:shadow-xl transition-all text-right group relative overflow-hidden flex flex-col justify-between min-h-[160px] ${p.stock <= 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl group-hover:scale-125 transition-transform">🔑</div>
              <p className="font-black text-slate-800 text-lg leading-tight relative z-10">{p.name}</p>
              <div className="mt-4 flex justify-between items-end relative z-10">
                <span className="text-2xl font-black text-blue-600">{p.price} <span className="text-xs">ر.س</span></span>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${p.stock < 5 ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'}`}>مخزون: {p.stock}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-4 flex flex-col h-full">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col h-full overflow-hidden">
          <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-800">🛒 السلة</h3>
            <button onClick={() => setCart([])} className="text-xs font-black text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">تفريغ 🗑️</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                <div className="text-6xl mb-4">🛒</div>
                <p className="font-black">السلة فارغة</p>
              </div>
            ) : cart.map(item => (
              <div key={item.productId} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center group animate-in slide-in-from-right duration-300 border border-slate-100">
                <div>
                  <p className="font-black text-sm text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-400 font-bold">{item.quantity} × {item.price} ر.س</p>
                </div>
                <button onClick={() => removeFromCart(item.productId)} className="w-8 h-8 flex items-center justify-center bg-white text-red-400 hover:bg-red-500 hover:text-white rounded-xl shadow-sm transition-all text-sm font-black">✕</button>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-900 text-white space-y-4">
            <div className="space-y-2 opacity-60 text-sm font-bold">
               <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span>{tax.toFixed(2)}</span>
               </div>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between text-3xl font-black">
              <span>الإجمالي:</span>
              <span className="text-emerald-400">{grandTotal.toFixed(2)} <span className="text-sm">ر.س</span></span>
            </div>
            <button 
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all active:scale-95 mt-4"
            >
              تأكيد البيع (F12)
            </button>
          </div>
        </div>
      </div>

      {activeReceipt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-4 no-print animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl p-8 relative">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-blue-500/20">🔑</div>
              <h4 className="text-2xl font-black text-slate-800">كي ماستر</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">KeyMaster Store</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-3xl mb-6 space-y-3 font-mono text-xs">
               <div className="flex justify-between border-b border-dashed border-slate-200 pb-2 mb-2 font-bold">
                  <span>الصنف</span>
                  <span>السعر</span>
               </div>
              {activeReceipt.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate max-w-[150px]">{item.name} x{item.quantity}</span>
                  <span className="font-bold">{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-black text-2xl mb-8 border-t border-slate-100 pt-6">
              <span>الإجمالي:</span>
              <span className="text-blue-600">{activeReceipt.grandTotal.toFixed(2)} <span className="text-sm">ر.س</span></span>
            </div>

            <div className="space-y-3">
              <button onClick={handlePrint} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2">
                <span>🖨️</span> طباعة الفاتورة
              </button>
              <button onClick={() => setActiveReceipt(null)} className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">إغلاق</button>
            </div>
          </div>
        </div>
      )}

      {/* منطقة الطباعة المحسنة */}
      <div id="receipt-print-area" className="hidden print:block fixed top-0 left-0 w-[80mm] p-6 bg-white text-black font-mono text-[10px]">
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <h1 className="text-2xl font-black mb-1">كي ماستر للمفاتيح</h1>
          <p className="font-bold">فاتورة ضريبية مبسطة</p>
          <p className="text-[8px]">Simplified Tax Invoice</p>
        </div>
        {activeReceipt && (
          <>
            <div className="space-y-1 mb-6 border-b border-black pb-4 font-bold">
              <div className="flex justify-between">
                <span>رقم الفاتورة:</span>
                <span>{activeReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span>التاريخ والوقت:</span>
                <span>{new Date(activeReceipt.date).toLocaleString('ar-SA')}</span>
              </div>
              <div className="flex justify-between">
                <span>البائع:</span>
                <span>{activeReceipt.employeeName}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-6 border-b border-black pb-4">
               <div className="flex justify-between font-black border-b border-black pb-1 mb-1">
                  <span>الصنف x الكمية</span>
                  <span>المجموع</span>
               </div>
              {activeReceipt.items.map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{i.name} x{i.quantity}</span>
                  <span>{(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 font-black text-xs">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>{activeReceipt.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة (15%):</span>
                <span>{activeReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base border-t-2 border-black pt-2 mt-2">
                <span>الإجمالي النهائي:</span>
                <span>{activeReceipt.grandTotal.toFixed(2)} ر.س</span>
              </div>
            </div>
            
            <div className="mt-10 text-center space-y-2 border-t border-black pt-4">
              <p className="font-bold">شكراً لزيارتكم!</p>
              <div className="w-20 h-20 bg-slate-200 mx-auto rounded-lg flex items-center justify-center opacity-30 text-[8px]">QR CODE</div>
              <p className="text-[8px] opacity-50">تطبق الشروط والأحكام - الرقم الضريبي: 3000XXXXXXXXXXX</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sales;
