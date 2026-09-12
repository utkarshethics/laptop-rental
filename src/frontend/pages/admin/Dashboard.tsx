import { Users, Package, DollarSign, TrendingUp, Clock, Truck, Shield, CreditCard, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatRelativeTime, cn } from '@/lib/utils';

const STATS = [
  { label: 'Total Revenue', value: '₹12,45,000', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Active Rentals', value: '234', change: '+8%', trend: 'up', icon: Package, color: 'text-blue-600 bg-blue-50' },
  { label: 'Total Orders', value: '1,247', change: '+5.2%', trend: 'up', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  { label: 'Active Users', value: '892', change: '+3.1%', trend: 'up', icon: Users, color: 'text-orange-600 bg-orange-50' },
  { label: 'Pending Orders', value: '23', change: '-2', trend: 'down', icon: Clock, color: 'text-warning-600 bg-warning-50' },
  { label: 'Avg Order Value', value: '₹9,850', change: '+4.8%', trend: 'up', icon: CreditCard, color: 'text-indigo-600 bg-indigo-50' },
];

const RECENT_ORDERS = [
  { id: 'ORD-2024-001', customer: 'Rahul Sharma', email: 'rahul@example.com', items: 1, total: 13999, status: 'active', date: '2024-01-20T10:30:00Z' },
  { id: 'ORD-2024-002', customer: 'Priya Patel', email: 'priya@example.com', items: 2, total: 28999, status: 'delivered', date: '2024-01-20T09:15:00Z' },
  { id: 'ORD-2024-003', customer: 'Amit Kumar', email: 'amit@example.com', items: 1, total: 8999, status: 'processing', date: '2024-01-20T08:45:00Z' },
  { id: 'ORD-2024-004', customer: 'Sneha Singh', email: 'sneha@example.com', items: 3, total: 45999, status: 'confirmed', date: '2024-01-19T16:20:00Z' },
  { id: 'ORD-2024-005', customer: 'Vikram Jain', email: 'vikram@example.com', items: 1, total: 7999, status: 'pending', date: '2024-01-19T14:10:00Z' },
];

const TOP_PRODUCTS = [
  { name: 'HP EliteBook 840 G9', brand: 'HP', rentals: 45, revenue: 404955 },
  { name: 'MacBook Air M2', brand: 'Apple', rentals: 38, revenue: 569962 },
  { name: 'Dell Latitude 5430', brand: 'Dell', rentals: 32, revenue: 255968 },
  { name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', rentals: 28, revenue: 363972 },
  { name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', rentals: 15, revenue: 254985 },
];

const CITY_STATS = [
  { city: 'Bangalore', orders: 342, revenue: 3420000, activeRentals: 67 },
  { city: 'Mumbai', orders: 289, revenue: 2890000, activeRentals: 54 },
  { city: 'Delhi', orders: 234, revenue: 2340000, activeRentals: 48 },
  { city: 'Hyderabad', orders: 187, revenue: 1870000, activeRentals: 32 },
  { city: 'Chennai', orders: 156, revenue: 1560000, activeRentals: 29 },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-heading-lg font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="text-secondary-500 mt-1">Overview of your rental business performance</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {STATS.map((stat, index) => (
            <Card key={index} padding="lg" className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-body-sm text-secondary-500 mb-1">{stat.label}</p>
                  <p className="text-heading-md font-bold text-secondary-900">{stat.value}</p>
                </div>
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn('text-sm font-medium', stat.trend === 'up' ? 'text-green-600' : 'text-error-600')}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </span>
                <span className="text-body-sm text-secondary-500">vs last month</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-secondary-900">Recent Orders</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="space-y-4">
              {RECENT_ORDERS.map(order => (
                <div key={order.id} className="flex items-center gap-4 p-4 bg-secondary-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-medium text-primary-700">{order.customer.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary-900 truncate">{order.customer}</p>
                    <p className="text-body-sm text-secondary-500">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">{formatCurrency(order.total)}</p>
                    <p className="text-body-sm text-secondary-500">{order.items} items</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">{order.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-secondary-900">Top Performing Products</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="space-y-4">
              {TOP_PRODUCTS.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary-900 truncate">{product.name}</p>
                    <p className="text-body-sm text-secondary-500">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">{product.rentals} rentals</p>
                    <p className="text-body-sm text-secondary-500">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-secondary-900">Revenue by City</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">View All</button>
            </div>
            <div className="space-y-4">
              {CITY_STATS.map(city => (
                <div key={city.city} className="flex items-center justify-between p-4 bg-secondary-50 rounded-xl">
                  <div>
                    <p className="font-medium text-secondary-900">{city.city}</p>
                    <p className="text-body-sm text-secondary-500">{city.orders} orders • {city.activeRentals} active</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-secondary-900">{formatCurrency(city.revenue)}</p>
                    <p className="text-body-sm text-success-600">{(city.revenue / 12450000 * 100).toFixed(1)}% of total</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-secondary-900">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-xl border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
                <Package className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-secondary-900">Add Product</p>
                <p className="text-body-sm text-secondary-500">List new laptop</p>
              </button>
              <button className="p-4 rounded-xl border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
                <Truck className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-secondary-900">Manage Orders</p>
                <p className="text-body-sm text-secondary-500">Process shipments</p>
              </button>
              <button className="p-4 rounded-xl border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
                <Users className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-secondary-900">View Users</p>
                <p className="text-body-sm text-secondary-500">Manage accounts</p>
              </button>
              <button className="p-4 rounded-xl border border-secondary-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
                <TrendingUp className="w-6 h-6 text-primary-600 mb-2" />
                <p className="font-medium text-secondary-900">Analytics</p>
                <p className="text-body-sm text-secondary-500">View reports</p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');