"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'بيانات الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-[8vh] bg-[#f1f1f1]" style={{ direction: 'rtl' }}>
      
      {/* الشعار */}
      <div className="mb-[24px]">
        <h1 className="text-[#3c434a] text-3xl font-bold text-center">
          لوحة تحكم الموقع
        </h1>
      </div>

      <div className="w-[320px]">
        {error && (
          <div className="bg-white border-r-4 border-[#d63638] shadow-sm p-3 mb-4 text-[14px] text-[#3c434a]">
            <strong>خطأ:</strong> {error}
          </div>
        )}

        <form 
          onSubmit={handleLogin} 
          className="bg-white p-[24px] shadow-sm border border-[#c3c4c7] text-[#3c434a] rounded-[4px]"
        >
          <div className="mb-[16px]">
            <label className="block text-[14px] mb-[8px] cursor-pointer" htmlFor="user_login">
              اسم المستخدم
            </label>
            <input 
              id="user_login"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-[12px] py-[6px] text-[24px] leading-normal border border-[#8c8f94] rounded-[4px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.07)] focus:outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-all bg-[#f9f9f9] text-[#2c3338]"
              dir="ltr"
              required
            />
          </div>

          <div className="mb-[24px]">
            <label className="block text-[14px] mb-[8px] cursor-pointer" htmlFor="user_pass">
              كلمة المرور
            </label>
            <input 
              id="user_pass"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-[12px] py-[6px] text-[24px] leading-normal border border-[#8c8f94] rounded-[4px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.07)] focus:outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1] transition-all bg-[#f9f9f9] text-[#2c3338]"
              dir="ltr"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#2271b1] hover:bg-[#135e96] focus:bg-[#135e96] focus:shadow-[0_0_0_1px_#2271b1] text-white text-[13px] font-semibold py-[6px] px-[12px] rounded-[3px] border border-[#2271b1] transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full text-center"
            >
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
