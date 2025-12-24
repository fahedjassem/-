
import React, { useState } from 'react';
import { User } from '../types';

interface EmployeesProps {
  employees: User[];
  setEmployees: React.Dispatch<React.SetStateAction<User[]>>;
}

const Employees: React.FC<EmployeesProps> = ({ employees, setEmployees }) => {
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<User>>({});

  const filteredEmployees = employees.filter(e => 
    e.name.includes(searchTerm) || 
    e.email.includes(searchTerm) || 
    (e.nationalId && e.nationalId.includes(searchTerm))
  );

  const handleEdit = (u: User) => {
    setEditingEmployee(u);
    setFormData(u);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟ لن يتمكن من دخول النظام بعد الآن.')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(u => u.id === editingEmployee.id ? { ...u, ...formData } : u));
      setEditingEmployee(null);
    }
  };

  const getRoleLabel = (r: string) => {
    const roles: Record<string, string> = {
      admin: 'مدير نظام',
      manager: 'مدير فرع',
      senior_tech: 'فني أول',
      junior_tech: 'فني مبتدئ',
      sales: 'مبيعات',
      accountant: 'محاسب',
      employee: 'موظف مبيعات'
    };
    return roles[r] || r;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">إدارة الطاقم</h1>
          <p className="text-slate-500 font-medium">سجلات الموظفين، الرواتب، والبيانات القانونية</p>
        </div>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="بحث بالاسم، الهوية، أو البريد..."
            className="w-full pr-12 pl-4 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
        </div>
      </header>
      
      <div className="grid lg:grid-cols-12 gap-8">
        {/* قائمة الموظفين */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-6 font-black text-slate-500 text-xs">الموظف</th>
                  <th className="px-6 py-6 font-black text-slate-500 text-xs">الوظيفة</th>
                  <th className="px-6 py-6 font-black text-slate-500 text-xs text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEmployees.map(e => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm">
                          {e.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{e.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">ID: {e.nationalId || '---'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-xs font-black text-slate-700">{getRoleLabel(e.role)}</p>
                      <p className="text-[10px] font-black text-emerald-600">{e.salary ? `${e.salary} ريال` : 'غير محدد'}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(e)} className="p-2.5 bg-blue-50 text-blue-500 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-90">
                          <span className="text-sm">✏️</span>
                        </button>
                        <button onClick={() => handleDelete(e.id)} className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-90">
                          <span className="text-sm">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* نموذج التعديل المتكامل */}
        <div className="lg:col-span-5 h-fit">
          {editingEmployee ? (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50 animate-in slide-in-from-left duration-500 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                   <span className="text-2xl">📝</span> تعديل ملف الموظف
                 </h3>
                 <button onClick={() => setEditingEmployee(null)} className="text-slate-300 hover:text-slate-500 text-xl">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* القسم الأول: البيانات الشخصية */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 border-b border-blue-50 pb-2">
                    <span className="text-sm font-black">👤 البيانات الشخصية</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">الاسم الكامل</label>
                      <input required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" value={formData.name || ''} onChange={v => setFormData({...formData, name: v.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">رقم الهوية / الإقامة</label>
                      <input required className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono font-bold text-sm" value={formData.nationalId || ''} onChange={v => setFormData({...formData, nationalId: v.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">عنوان السكن</label>
                      <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" value={formData.address || ''} onChange={v => setFormData({...formData, address: v.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">الحالة الاجتماعية</label>
                      <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm cursor-pointer" value={formData.socialStatus || 'single'} onChange={v => setFormData({...formData, socialStatus: v.target.value as any})}>
                        <option value="single">أعزب / عزباء</option>
                        <option value="married">متزوج / متزوجة</option>
                        <option value="divorced">مطلق / مطلقة</option>
                        <option value="widowed">أرمل / أرملة</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* القسم الثاني: البيانات الوظيفية والمالية */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 border-b border-emerald-50 pb-2">
                    <span className="text-sm font-black">💼 العمل والراتب</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">الراتب الشهري (ريال)</label>
                      <input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-black text-emerald-600 text-sm" value={formData.salary || ''} onChange={v => setFormData({...formData, salary: Number(v.target.value)})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">المسمى الوظيفي</label>
                      <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm cursor-pointer" value={formData.role || ''} onChange={v => setFormData({...formData, role: v.target.value as any})}>
                        <option value="employee">موظف مبيعات</option>
                        <option value="junior_tech">فني مبتدئ</option>
                        <option value="senior_tech">فني أول</option>
                        <option value="accountant">محاسب</option>
                        <option value="manager">مدير فرع</option>
                        <option value="admin">مدير نظام</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">التخصص التقني</label>
                      <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm cursor-pointer" value={formData.specialty || 'all'} onChange={v => setFormData({...formData, specialty: v.target.value as any})}>
                        <option value="all">شامل</option>
                        <option value="programming">برمجة مفاتيح</option>
                        <option value="cutting">قص يدوِي</option>
                        <option value="smart_locks">أقفال ذكية</option>
                        <option value="auto_unlock">فتح سيارات</option>
                        <option value="sales">خدمة عملاء</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* القسم الثالث: الاتصال والنظام */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-600 border-b border-slate-50 pb-2">
                    <span className="text-sm font-black">📱 بيانات التواصل والدخول</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">رقم الجوال</label>
                      <input className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" value={formData.phone || ''} onChange={v => setFormData({...formData, phone: v.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">البريد الإلكتروني</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm text-slate-400" value={formData.email || ''} readOnly />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block tracking-widest">تغيير كلمة المرور</label>
                      <input type="password" placeholder="اتركه فارغاً للحفاظ على القديمة" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm" onChange={v => setFormData({...formData, password: v.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-3">
                  <button className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 text-lg">
                    حفظ كافة التغييرات
                  </button>
                  <button type="button" onClick={() => setEditingEmployee(null)} className="w-full bg-slate-100 py-3 rounded-2xl text-slate-500 font-bold hover:bg-slate-200 transition-all">
                    إلغاء التعديل
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-blue-50/20 p-10 rounded-[2.5rem] border-2 border-dashed border-blue-100 text-center flex flex-col items-center justify-center min-h-[500px] animate-pulse">
              <div className="text-7xl mb-6 opacity-20">👤</div>
              <h4 className="font-black text-blue-300 text-lg">اختر موظفاً من القائمة<br/>لمراجعة وتحديث ملفه الكامل</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
