import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard, ShoppingBag, Truck, Shield, Star, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Laptops' },
];

const CITIES = [
  { name: 'Bangalore', slug: 'bangalore', icon: '🏙️' },
  { name: 'Mumbai', slug: 'mumbai', icon: '🏙️' },
  { name: 'Delhi', slug: 'delhi', icon: '🏙️' },
  { name: 'Chennai', slug: 'chennai', icon: '🏙️' },
  { name: 'Hyderabad', slug: 'hyderabad', icon: '🏙️' },
  { name: 'Pune', slug: 'pune', icon: '🏙️' },
];

export function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  useEffect(() => {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) setSelectedCity(savedCity);
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setCityMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-secondary-200">
      <nav className="container" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="LaptopRent Home">
            <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span className="font-bold text-xl text-secondary-900">LaptopRent</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive('/products') ? 'text-primary-600 bg-primary-50' : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                )}
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                aria-expanded={cityMenuOpen}
                aria-haspopup="true"
              >
                <MapPin className="w-4 h-4" />
                {selectedCity}
                <ChevronDown className={cn('w-4 h-4 transition-transform', cityMenuOpen && 'rotate-180')} />
              </button>

              {cityMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-secondary-200 shadow-elevated py-2 animate-slide-down" role="menu">
                  {CITIES.map(city => (
                    <button
                      key={city.slug}
                      onClick={() => handleCityChange(city.name)}
                      className={cn(
                        'w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors',
                        selectedCity === city.name ? 'bg-primary-50 text-primary-700' : 'text-secondary-700 hover:bg-secondary-50'
                      )}
                      role="menuitem"
                    >
                      <span>{city.icon}</span>
                      {city.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className={cn(
                'relative p-2 rounded-lg transition-colors',
                'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
              )}
              aria-label={`Shopping cart, ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-secondary-200 animate-pulse" />
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 rounded-lg text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50 transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="text-sm font-medium text-primary-700">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-secondary-200 shadow-elevated py-2 animate-slide-down" role="menu">
                    <div className="px-4 py-3 border-b border-secondary-100">
                      <p className="font-medium text-secondary-900">{user?.name}</p>
                      <p className="text-sm text-secondary-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      My Account
                    </Link>
                    <Link
                      to="/account/orders"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      My Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2 border-secondary-100" />
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50"
                      role="menuitem"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary btn-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-secondary-200 animate-slide-down">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-50">
                <MapPin className="w-4 h-4 text-primary-600" />
                <select
                  value={selectedCity}
                  onChange={e => handleCityChange(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium text-secondary-900 focus:outline-none"
                >
                  {CITIES.map(city => (
                    <option key={city.slug} value={city.name}>{city.icon} {city.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-base font-medium',
                      isActive(link.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 pt-4 border-t border-secondary-200">
                  <Link
                    to="/account"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-secondary-700 hover:bg-secondary-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    My Account
                  </Link>
                  <Link
                    to="/account/orders"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-secondary-700 hover:bg-secondary-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-error-600 hover:bg-error-50"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-secondary-200">
                  <Link
                    to="/login"
                    className="btn-secondary btn-lg w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary btn-lg w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="bg-primary-600 px-4 py-2 text-center text-sm text-white">
        <span className="font-medium">🚚 Free Doorstep Delivery</span> across {selectedCity} | <span className="font-medium">🔒 Secure Payments</span> | <span className="font-medium">🛡️ Damage Protection</span> included
      </div>
    </header>
  );
}