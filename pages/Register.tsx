
import React, { useState } from 'react';
import { AppPages, User } from '../types';

interface RegisterProps {
  onNavigate: (page: AppPages) => void;
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', nationalId: '', address: '',
    socialStatus: 'single' as any, salary: 0, password: '',
    role: 'employee' as any, specialty: 'all' as any,
    joinDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister({ id: Date.now().toString(), ...formData });
    onNavigate(AppPages.LOGIN);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full rounded-[3rem] shadow-2xl p-10 overflow-y-auto max-h-[95vh] custom-scrollbar">
        <h2 className="text-3xl font-black mb-10 text-slate-800 border-b pb-6">📝 تسجيل موظف جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">الاسم الكامل</label>
              <input name="name" required className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">رقم الهوية</label>
              <input name="nationalId" required className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.nationalId} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">البريد الإلكتروني</label>
              <input name="email" type="email" required className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">كلمة المرور</label>
              <input name="password" type="password" required className="w-full p-4 bg-slate-50 border rounded-2xl" value={formData.password} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">الراتب المتفق عليه</label>
              <input name="salary" type="number" className="w-full p-4 bg-slate-50 border rounded-2xl font-black text-emerald-600" value={formData.salary || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400">المسمى الوظيفي</label>
              <select name="role" className="w-full p-4 bg-slate-50 border rounded-2xl font-bold" value={formData.role} onChange={handleChange}>
                <option value="employee">موظف مبيعات</option>
                <option value="junior_tech">فني مبتدئ</option>
                <option value="senior_tech">فني خبير</option>
                <option value="manager">مدير فرع</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-10">
            <button type="submit" className="flex-1 bg-slate-900 text-white py-5 rounded-3xl font-black text-xl shadow-xl">تأكيد التسجيل</button>
            <button type="button" onClick={() => onNavigate(AppPages.LOGIN)} className="px-10 bg-slate-100 py-5 rounded-3xl font-bold">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
