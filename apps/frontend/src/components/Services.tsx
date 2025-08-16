import { Clock, Shield, Award, Users, Microscope, FileText } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Microscope,
      title: 'تحاليل شاملة',
      description: 'مجموعة واسعة من التحاليل الطبية المتقدمة',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'نتائج سريعة',
      description: 'نتائج دقيقة في أسرع وقت ممكن',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'سرية تامة',
      description: 'حماية كاملة لخصوصية بياناتك الطبية',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'جودة معتمدة',
      description: 'معايير جودة عالمية ومعتمدة',
      color: 'text-orange-600'
    },
    {
      icon: Users,
      title: 'فريق متخصص',
      description: 'أطباء وفنيين ذوي خبرة عالية',
      color: 'text-red-600'
    },
    {
      icon: FileText,
      title: 'تقارير مفصلة',
      description: 'تقارير واضحة ومفصلة مع التفسيرات',
      color: 'text-indigo-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نقدم خدمات طبية متكاملة بأحدث التقنيات وأعلى معايير الجودة
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card p-8 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '15+', label: 'سنة خبرة' },
            { number: '50K+', label: 'عميل راضي' },
            { number: '200+', label: 'نوع تحليل' },
            { number: '24/7', label: 'خدمة عملاء' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}