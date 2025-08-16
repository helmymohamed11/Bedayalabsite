'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

interface Test {
  id: number;
  code: string;
  name: string;
  name_ar: string;
  price: number;
  category_name_ar: string;
  description: string;
  sample_type: string;
  turnaround_time: string;
}

export function FeaturedTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeaturedTests();
  }, []);

  const fetchFeaturedTests = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tests/featured/popular`);
      const data = await response.json();
      
      if (data.success) {
        setTests(data.data);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTests = tests.filter(test =>
    test.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="tests" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            التحاليل الأكثر طلباً
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من التحاليل الطبية المتقدمة بأسعار تنافسية
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
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
        </div>

        {/* Tests Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div key={test.id} className="card p-6 group hover:border-primary-200">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {test.category_name_ar}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">
                    {test.code}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {test.name_ar}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {test.description}
                </p>
                
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div>نوع العينة: {test.sample_type}</div>
                  <div>مدة النتيجة: {test.turnaround_time}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {test.price} ج.م
                  </div>
                  <Link
                    href={`/tests/${test.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    احجز الآن
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/tests" className="btn-secondary inline-flex items-center gap-2">
            عرض جميع التحاليل
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}