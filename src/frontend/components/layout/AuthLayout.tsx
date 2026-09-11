import { Outlet } from 'react-router-dom';
import { Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="flex items-center gap-2">
          <Laptop className="w-8 h-8 text-white" />
          <span className="font-bold text-xl text-white">LaptopRent</span>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center text-center px-12">
          <h1 className="text-display-lg font-bold text-white mb-6 text-balance">
            Rent Premium Laptops<br />Without the Premium Price
          </h1>
          <p className="text-lg text-primary-100 mb-8 max-w-lg">
            Access the latest HP, Dell, Lenovo, MacBook, ASUS & Acer laptops.
            Flexible plans. Free delivery. Damage protection included.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-primary-100 text-sm">
            <span className="flex items-center gap-1">🚚 Free Delivery</span>
            <span className="flex items-center gap-1">🛡️ Damage Protection</span>
            <span className="flex items-center gap-1">🔄 Easy Returns</span>
            <span className="flex items-center gap-1">💳 No Cost EMI</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-primary-200 text-sm">
          <span>Trusted by 10,000+ customers</span>
          <div className="flex -space-x-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-primary-700 flex items-center justify-center text-xs font-medium" />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}