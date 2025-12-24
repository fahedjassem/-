
import React, { useState } from 'react';
import { AppPages } from '../types';

interface ForgotPasswordProps {
  onNavigate: (page: AppPages) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة عملية إرسال بريد استعادة
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans antialiased">
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl w-full max-w-md relative z-10 border border-white/20">
        {!isSubmitted ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                🔓
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">استعادة الحساب</h2>
              <p className="text-slate-400 font-medium px-4">أدخل بريدك الإلكتروني المسجل وسنرسل لك تعليمات إعادة تعيين كلمة المرور</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">📧</span>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-700" 
                    placeholder="example@key.com" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري المعالجة...
                  </>
                ) : (
                  'إرسال رابط الاستعادة'
                )}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-slate-50 text-center">
              <button 
                onClick={() => onNavigate(AppPages.LOGIN)} 
                className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <span>🔙</span> العودة لصفحة الدخول
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner border-4 border-emerald-100">
              ✓
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4">تم الإرسال بنجاح!</h3>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed px-2">
              لقد قمنا بإرسال رابط الاستعادة إلى البريد: <br/>
              <span className="text-slate-900 font-black break-all">{email}</span>
              <br/><br/>
              يرجى التحقق من صندوق الوارد أو مجلد الرسائل المزعجة (Spam).
            </p>
            
            <button 
              onClick={() => onNavigate(AppPages.LOGIN)} 
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              العودة للدخول
            </button>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 text-center w-full pointer-events-none">
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] opacity-30">KeyMaster POS Security System</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
