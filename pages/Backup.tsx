
import React, { useRef } from 'react';

const Backup: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleExport = () => {
    const data = {
      products: JSON.parse(localStorage.getItem('km_products') || '[]'),
      employees: JSON.parse(localStorage.getItem('km_employees') || '[]'),
      sales: JSON.parse(localStorage.getItem('km_sales') || '[]')
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `KeyMaster_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.products && data.employees && data.sales) {
          localStorage.setItem('km_products', JSON.stringify(data.products));
          localStorage.setItem('km_employees', JSON.stringify(data.employees));
          localStorage.setItem('km_sales', JSON.stringify(data.sales));
          alert('تم استعادة البيانات بنجاح في الجهاز الجديد!');
          window.location.reload();
        } else {
          alert('ملف البيانات غير صالح');
        }
      } catch (err) {
        alert('حدث خطأ أثناء قراءة الملف');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">🔄 نقل البيانات والنسخ الاحتياطي</h1>
        <p className="text-slate-500 font-bold">استخدم هذه الصفحة لنقل كافة بياناتك من جهاز لآخر بسهولة</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl text-center space-y-6 border border-slate-100 hover:shadow-2xl transition-all">
          <div className="text-6xl">📤</div>
          <h3 className="text-xl font-black text-slate-800">تصدير (من هذا الجهاز)</h3>
          <p className="text-sm text-slate-400 font-medium px-4">قم بتحميل ملف البيانات لنقله إلى فلاش ميموري أو إرساله بالإيميل للجهاز الجديد.</p>
          <button onClick={handleExport} className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95">تحميل نسخة احتياطية</button>
        </div>
        
        <div className="bg-white p-10 rounded-[3rem] shadow-xl text-center space-y-6 border border-slate-100 hover:shadow-2xl transition-all">
          <div className="text-6xl">📥</div>
          <h3 className="text-xl font-black text-slate-800">استيراد (إلى هذا الجهاز)</h3>
          <p className="text-sm text-slate-400 font-medium px-4">اختر ملف النسخة الاحتياطية الذي قمت بتصديره من الجهاز القديم لاستعادة بياناتك هنا.</p>
          <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".json" />
          <button onClick={() => fileInputRef.current?.click()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95">رفع ملف البيانات</button>
        </div>
      </div>
    </div>
  );
};

export default Backup;
