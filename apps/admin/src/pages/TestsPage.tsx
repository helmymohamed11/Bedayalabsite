import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

interface Test {
  id: number;
  code: string;
  name: string;
  name_ar: string;
  price: number;
  category_name_ar: string;
  is_active: boolean;
  created_at: string;
}

export function TestsPage() {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: testsData, isLoading } = useQuery({
    queryKey: ['admin-tests', searchTerm, selectedCategory, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/tests?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      return result;
    },
    enabled: !!token,
  });

  const tests = testsData?.data || [];
  const pagination = testsData?.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة التحاليل</h1>
          <p className="text-gray-600">إدارة كتالوج التحاليل والأسعار</p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            استيراد CSV
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إضافة تحليل
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن التحليل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-input"
          >
            <option value="">جميع الفئات</option>
            <option value="blood-tests">تحاليل الدم</option>
            <option value="hormones">الهرمونات</option>
            <option value="vitamins">الفيتامينات</option>
            <option value="liver">وظائف الكبد</option>
            <option value="kidney">وظائف الكلى</option>
          </select>
          
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            تصفية متقدمة
          </button>
        </div>
      </div>

      {/* Tests Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th>الكود</th>
                <th>اسم التحليل</th>
                <th>الفئة</th>
                <th>السعر</th>
                <th>الحالة</th>
                <th>تاريخ الإضافة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                    <td><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>
                  </tr>
                ))
              ) : tests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    لا توجد تحاليل متاحة
                  </td>
                </tr>
              ) : (
                tests.map((test: Test) => (
                  <tr key={test.id}>
                    <td>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {test.code}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium text-gray-900">{test.name_ar}</p>
                        <p className="text-sm text-gray-500">{test.name}</p>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {test.category_name_ar}
                      </span>
                    </td>
                    <td>
                      <span className="font-bold text-primary-600">
                        {test.price} ج.م
                      </span>
                    </td>
                    <td>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        test.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {test.is_active ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="text-sm text-gray-500">
                      {new Date(test.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              عرض {((pagination.page - 1) * pagination.limit) + 1} إلى {Math.min(pagination.page * pagination.limit, pagination.total)} من {pagination.total} نتيجة
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              
              <span className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-md">
                {currentPage} من {pagination.pages}
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                disabled={currentPage === pagination.pages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}