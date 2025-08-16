import { Target, Eye, Heart } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              من نحن
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              معمل بداية للتحاليل الطبية هو مؤسسة طبية رائدة تأسست عام 2008 في مدينة المنصورة. 
              نحن ملتزمون بتقديم أعلى مستويات الخدمة الطبية والدقة في النتائج.
            </p>

            {/* Values */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">رسالتنا</h3>
                  <p className="text-gray-600">
                    تقديم خدمات تحاليل طبية متميزة بأحدث التقنيات وأعلى معايير الجودة
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">رؤيتنا</h3>
                  <p className="text-gray-600">
                    أن نكون المعمل الرائد في مصر في مجال التحاليل الطبية والتشخيص المبكر
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">قيمنا</h3>
                  <p className="text-gray-600">
                    الدقة، الأمانة، السرعة، والاهتمام بالمريض هي أساس عملنا
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="فريق معمل بداية"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
            
            {/* Overlay card */}
            <div className="absolute bottom-6 right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <h4 className="font-bold text-gray-900 mb-2">اعتمادات دولية</h4>
              <p className="text-sm text-gray-600">
                معتمدون من منظمة الصحة العالمية ووزارة الصحة المصرية
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}