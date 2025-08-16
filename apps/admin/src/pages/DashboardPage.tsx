import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import {
  TestTube,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalTests: number;
  totalCategories: number;
  totalBookings: number;
  pendingBookings: number;
  revenue: {
    today: number;
    thisMonth: number;
    thisYear: number;
  };
}

export function DashboardPage() {
  const { token } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/reports/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result.data;
    },
    enabled: !!token,
  });

  const statCards = [
    {
      title: 'إجمالي التحاليل',
      value: stats?.totalTests || 0,
      icon: TestTube,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'الحجوزات اليوم',
      value: stats?.pendingBookings || 0,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'إجمالي الحجوزات',
      value: stats?.totalBookings || 0,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'الإيرادات الشهرية',
      value: `${stats?.revenue.thisMonth || 0} ج.م`,
      icon: DollarSign,
      color: 'bg-orange-500',
      change: '+23%'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          مرحباً بك في لوحة التحكم
        </h1>
        <p className="text-gray-600">
          إليك نظرة سريعة على أداء المعمل اليوم
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {stat.change} من الشهر الماضي
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">آخر الحجوزات</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'أحمد محمد', test: 'صورة دم كاملة', time: '10:30 ص' },
              { name: 'فاطمة علي', test: 'فيتامين د', time: '11:15 ص' },
              { name: 'محمد حسن', test: 'وظائف كبد', time: '12:00 م' },
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{booking.name}</p>
                  <p className="text-sm text-gray-600">{booking.test}</p>
                </div>
                <span className="text-sm text-gray-500">{booking.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
          
          <div className="space-y-3">
            <button className="w-full btn-primary text-right">
              إضافة تحليل جديد
            </button>
            <button className="w-full btn-secondary text-right">
              تحديث الأسعار
            </button>
            <button className="w-full btn-secondary text-right">
              تصدير التقارير
            </button>
            <button className="w-full btn-secondary text-right">
              استيراد كتالوج CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}