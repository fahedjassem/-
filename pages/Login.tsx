
import React, { useState } from 'react';
import { AppPages, User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: AppPages) => void;
  employees: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate, employees }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = employees.find(u => u.email === email && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 opacity-50"></div>
      
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md relative z-10 border border-white/10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-blue-500/20">
            🔑
          </div>
          <h2 className="text-3xl font-black text-slate-800">كي ماستر POS</h2>
          <p className="text-slate-400 font-bold mt-2">نظام الإدارة المتطور</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-center font-bold text-sm animate-bounce">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">البريد الإلكتروني</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" 
              placeholder="admin@key.com" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">كلمة المرور</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold" 
              placeholder="••••••••" 
            />
          </div>
          
          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 text-lg">
            دخول النظام
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button onClick={() => onNavigate(AppPages.FORGOT_PASSWORD)} className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">نسيت كلمة المرور؟</button>
          <div className="h-px bg-slate-50 w-full"></div>
          <p className="text-sm font-medium text-slate-500">
            موظف جديد؟ 
            <button onClick={() => onNavigate(AppPages.REGISTER)} className="font-black text-blue-600 hover:underline mr-2">إنشاء حساب</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
