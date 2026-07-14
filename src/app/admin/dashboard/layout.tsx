import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900" style={{ direction: 'rtl' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-900">لوحة التحكم</h2>
          <p className="text-sm text-gray-500 mt-1">إدارة محتوى الموقع</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors">
            الرئيسية
          </Link>
          <Link href="/admin/dashboard/articles" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors">
            المقالات
          </Link>
          <Link href="/admin/dashboard/services" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors">
            الخدمات
          </Link>
          <Link href="/admin/dashboard/sectors" className="block p-3 rounded-lg hover:bg-blue-50 text-gray-700 font-medium transition-colors">
            القطاعات
          </Link>
          <Link href="/" className="block p-3 rounded-lg hover:bg-gray-100 text-gray-600 font-medium transition-colors mt-8">
            ← العودة للموقع
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
