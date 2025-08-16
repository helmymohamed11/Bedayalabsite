import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

// Mock data for demonstration
const mockBookings = [
  {
    id: 1,
    patient_name: 'أحمد محمد علي',
    patient_phone: '01234567890',
    patient_email: 'ahmed@example.com',
    booking_date: '2024-01-15',
    booking_time: '10:30',
    status: 'pending',
    total_amount: 250,
    tests: ['صورة دم كاملة', 'فيتامين د']
  },
  {
    id: 2,
    patient_name: 'فاطمة حسن',
    patient_phone: '01987654321',
    patient_email: 'fatma@example.com',
    booking_date: '2024-01-15',
    booking_time: '11:00',
    status: 'confirmed',
    total_amount: 180,
    tests: ['وظائف كبد']
  },
  {
    id: 3,
    patient_name: 'محمد أحمد',
    patient_phone: '01555666777',
    patient_email: 'mohamed@example.com',
    booking_date: '2024-01-16',
    booking_time: '09:15',
    status: 'completed',
    total_amount: 320,
    tests: ['دهون الدم', 'الهيموجلوبين السكري']
  }
];

export function BookingsPage() {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'confirmed':
        return 'مؤكد';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const statusMatch = !selectedStatus || booking.status === selectedStatus;
    const dateMatch = !selectedDate || booking.booking_date === selectedDate;
    return statusMatch && dateMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الحجوزات</h1>
          <p className="text-gray-600">متابعة وإدارة حجوزات المرضى</p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            تقرير يومي
          </button>
          <button className="btn-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            تأكيد الكل
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">حالة الحجز</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input"
            >
              <option value="">جميع الحالات</option>
              <option value="pending">في الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">تاريخ الحجز</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedStatus('');
                setSelectedDate('');
              }}
              className="btn-secondary w-full"
            >
              مسح الفلاتر
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Patient Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{booking.patient_name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {booking.patient_phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {booking.patient_email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tests */}
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">التحاليل المطلوبة:</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.tests.map((test, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(booking.booking_date).toLocaleDateString('ar-EG')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.booking_time}
                  </div>
                  <div className="font-bold text-primary-600">
                    {booking.total_amount} ج.م
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
                
                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button className="btn btn-primary text-sm">
                        تأكيد
                      </button>
                      <button className="btn btn-danger text-sm">
                        إلغاء
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button className="btn btn-primary text-sm">
                      اكتمل
                    </button>
                  )}
                  <button className="btn btn-secondary text-sm">
                    تفاصيل
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && !isLoading && (
        <div className="card p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد حجوزات
          </h3>
          <p className="text-gray-600">
            لا توجد حجوزات تطابق المعايير المحددة
          </p>
        </div>
      )}
    </div>
  );
}