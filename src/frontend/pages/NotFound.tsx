import { Link } from 'react-router-dom';
import { Home, Search, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLocation } from 'react-router-dom';

export function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-9xl font-bold text-secondary-100">404</span>
        </div>
        <h1 className="text-heading-lg font-bold text-secondary-900 mb-4">Page Not Found</h1>
        <p className="text-body text-secondary-500 mb-8">
          Sorry, we couldn't find the page you're looking for: <code className="text-primary-600 bg-primary-50 px-2 py-1 rounded">{location.pathname}</code>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => window.history.back()} variant="outline" leftIcon={<ArrowLeft className="w-5 h-5" />}>
            Go Back
          </Button>
          <Button onClick={() => window.location.href = '/'} leftIcon={<Home className="w-5 h-5" />}>
            Go Home
          </Button>
          <Button variant="ghost" onClick={() => window.location.href = '/products'} leftIcon={<Search className="w-5 h-5" />}>
            Browse Products
          </Button>
        </div>
        <div className="mt-12 p-6 bg-white rounded-2xl border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/products?category=laptop" className="p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors text-center text-body-sm text-secondary-700">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary-600" />
              Laptops
            </Link>
            <Link to="/products?category=laptop&tag=gaming" className="p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors text-center text-body-sm text-secondary-700">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary-600" />
              Gaming Laptops
            </Link>
            <Link to="/products?brand=Apple" className="p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors text-center text-body-sm text-secondary-700">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary-600" />
              MacBooks
            </Link>
            <Link to="/contact" className="p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors text-center text-body-sm text-secondary-700">
              <RotateCcw className="w-5 h-5 mx-auto mb-1 text-primary-600" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}