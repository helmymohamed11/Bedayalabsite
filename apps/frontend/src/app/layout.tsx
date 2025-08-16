import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'معمل بداية للتحاليل الطبية',
  description: 'معمل بداية للتحاليل الطبية - دقة في النتائج، ثقة في الخدمة',
  keywords: ['معمل تحاليل', 'تحاليل طبية', 'معمل بداية', 'المنصورة'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}