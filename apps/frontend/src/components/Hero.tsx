'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-primary-50 to-white py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              معمل <span className="text-primary-600">بداية</span>
              <br />
              للتحاليل الطبية
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              دقة في النتائج، ثقة في الخدمة. نقدم أحدث التحاليل الطبية بأعلى معايير الجودة والدقة
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">نتائج دقيقة 100%</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">نتائج سريعة</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="font-medium">سرية تامة</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary inline-flex items-center justify-center gap-2">
                احجز موعدك الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href="#tests" className="btn-secondary inline-flex items-center justify-center">
                تصفح التحاليل
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="معمل بداية للتحاليل الطبية"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">15+</div>
                <div className="text-sm text-gray-600">سنة خبرة</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-600">عميل راضي</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}