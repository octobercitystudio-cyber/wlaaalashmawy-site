import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">أهلاً بك في لوحة التحكم</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-600 text-lg">
          من خلال القائمة الجانبية يمكنك التحكم في محتوى الموقع: إضافة وتعديل وحذف المقالات، الخدمات، والقطاعات بشكل مباشر.
        </p>
      </div>
    </div>
  );
}
