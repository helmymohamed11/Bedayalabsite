import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            تواصل معنا
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نحن هنا لخدمتك. تواصل معنا في أي وقت للاستفسار أو الحجز
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">الهاتف</h3>
                <p className="text-gray-600">0502236471</p>
                <p className="text-gray-600">واتساب: 01550565005</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@bidayalab.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">العنوان</h3>
                <p className="text-gray-600">
                  المنصورة – ميدان المحطة – برج الكوثر الطبي – الدور الرابع
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">مواعيد العمل</h3>
                <p className="text-gray-600">السبت - الخميس: 8:00 ص - 10:00 م</p>
                <p className="text-gray-600">الجمعة: 2:00 م - 10:00 م</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              أرسل لنا رسالة
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="form-label">الاسم الكامل</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label className="form-label">رقم الهاتف</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label className="form-label">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>

              <div>
                <label className="form-label">الرسالة</label>
                <textarea
                  rows={4}
                  className="form-input resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}