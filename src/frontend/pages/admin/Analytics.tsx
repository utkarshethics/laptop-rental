import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 1250000, orders: 145 },
  { month: 'Feb', revenue: 1380000, orders: 162 },
  { month: 'Mar', revenue: 1520000, orders: 178 },
  { month: 'Apr', revenue: 1680000, orders: 195 },
  { month: 'May', revenue: 1890000, orders: 210 },
  { month: 'Jun', revenue: 2100000, orders: 234 },
];

const CATEGORY_REVENUE = [
  { category: 'Business Laptops', revenue: 5206000, percentage: 38 },
  { category: 'Gaming Laptops', revenue: 3699000, percentage: 27 },
  { category: 'MacBook Rentals', revenue: 2740000, percentage: 20 },
  { category: 'Student Laptops', revenue: 2055000, percentage: 15 },
];

const CITY_PERFORMANCE = [
  { city: 'Bangalore', revenue: 4200000, orders: 450, aov: 9333, growth: 18 },
  { city: 'Mumbai', revenue: 3800000, orders: 380, aov: 10000, growth: 15 },
  { city: 'Delhi', revenue: 3200000, orders: 340, aov: 9411, growth: 12 },
  { city: 'Hyderabad', revenue: 1800000, orders: 210, aov: 8571, growth: 22 },
  { city: 'Chennai', revenue: 1500000, orders: 180, aov: 8333, growth: 10 },
];

const TOP_CUSTOMERS = [
  { name: 'TechCorp Solutions', email: 'procurement@techcorp.com', orders: 24, total: 340000, ltv: 14166 },
  { name: 'StartupHub Inc', email: 'ops@startuphub.io', orders: 18, total: 285000, ltv: 15833 },
  { name: 'DigitalAgency Pro', email: 'finance@digitalagency.pro', orders: 15, total: 195000, ltv: 13000 },
  { name: 'EduTech Academy', email: 'admin@edutech.edu', orders: 12, total: 156000, ltv: 13000 },
  { name: 'Freelancer Collective', email: 'hello@freelance.co', orders: 10, total: 98000, ltv: 9800 },
];

export function AdminAnalytics() {
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-heading-lg font-bold text-secondary-900">Analytics Dashboard</h1>
          <p className="text-secondary-500 mt-1">Business insights and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-body-sm text-secondary-500">Total Revenue</p>
                <p className="text-heading-md font-bold text-secondary-900">₹1.37Cr</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <ArrowUpRight className="w-4 h-4" /> +23.5% vs last quarter
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-body-sm text-secondary-500">Active Rentals</p>
                <p className="text-heading-md font-bold text-secondary-900">1,234</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <ArrowUpRight className="w-4 h-4" /> +12% vs last month
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-body-sm text-secondary-500">Avg Order Value</p>
                <p className="text-heading-md font-bold text-secondary-900">₹9,450</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <ArrowUpRight className="w-4 h-4" /> +8.2% vs last quarter
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-body-sm text-secondary-500">Active Customers</p>
                <p className="text-heading-md font-bold text-secondary-900">892</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-green-600">
              <ArrowUpRight className="w-4 h-4" /> +15.3% vs last quarter
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-around gap-2 px-4">
              {REVENUE_DATA.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary-600 rounded-t transition-all hover:bg-primary-700"
                    style={{ height: `${(data.revenue / 2100000) * 100}%` }}
                    title={`${data.month}: ${formatCurrency(data.revenue)}`}
                  />
                  <span className="text-body-sm text-secondary-500">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-6 text-body-sm">
              <span className="flex items-center gap-1 text-primary-600"><span className="w-3 h-3 rounded bg-primary-600" /> Revenue</span>
              <span className="flex items-center gap-1 text-secondary-500"><span className="w-3 h-3 rounded bg-secondary-300" /> Orders</span>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Revenue by Category</h3>
            <div className="space-y-4">
              {CATEGORY_REVENUE.map((cat, index) => (
                <div key={cat.category}>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="font-medium text-secondary-900">{cat.category}</span>
                    <span className="text-secondary-600">{cat.percentage}% • {formatCurrency(cat.revenue)}</span>
                  </div>
                  <div className="h-3 bg-secondary-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">City Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary-200 text-left">
                    <th className="p-3 font-medium text-secondary-500">City</th>
                    <th className="p-3 font-medium text-secondary-500">Revenue</th>
                    <th className="p-3 font-medium text-secondary-500">Orders</th>
                    <th className="p-3 font-medium text-secondary-500">AOV</th>
                    <th className="p-3 font-medium text-secondary-500">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {CITY_PERFORMANCE.map(city => (
                    <tr key={city.city} className="hover:bg-secondary-50">
                      <td className="p-3 font-medium text-secondary-900">{city.city}</td>
                      <td className="p-3 text-secondary-900">{formatCurrency(city.revenue)}</td>
                      <td className="p-3 text-secondary-600">{city.orders}</td>
                      <td className="p-3 text-secondary-600">{formatCurrency(city.aov)}</td>
                      <td className="p-3 flex items-center gap-1 text-green-600 font-medium">
                        <ArrowUpRight className="w-4 h-4" /> {city.growth}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Top Customers (LTV)</h3>
            <div className="space-y-4">
              {TOP_CUSTOMERS.map((customer, index) => (
                <div key={customer.name} className="flex items-center gap-4 p-3 bg-secondary-50 rounded-xl">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary-900 truncate">{customer.name}</p>
                    <p className="text-body-sm text-secondary-500">{customer.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">{formatCurrency(customer.total)}</p>
                    <p className="text-body-sm text-secondary-500">LTV: {formatCurrency(customer.ltv)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              {[
                { label: 'Visitors', value: 45000, percentage: 100 },
                { label: 'Product Views', value: 28000, percentage: 62 },
                { label: 'Added to Cart', value: 8500, percentage: 19 },
                { label: 'Checkout Started', value: 4200, percentage: 9 },
                { label: 'Completed Orders', value: 3800, percentage: 8 },
              ].map((step, index) => (
                <div key={step.label}>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="font-medium text-secondary-900">{step.label}</span>
                    <span className="text-secondary-600">{step.value.toLocaleString()} ({step.percentage}%)</span>
                  </div>
                  <div className="h-3 bg-secondary-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${step.percentage}%`,
                        background: index < 3 ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : 'linear-gradient(90deg, #22c55e, #4ade80)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Device Breakdown</h3>
            <div className="space-y-4">
              {[
                { device: 'Desktop', percentage: 58, color: 'bg-blue-500' },
                { device: 'Mobile', percentage: 35, color: 'bg-green-500' },
                { device: 'Tablet', percentage: 7, color: 'bg-purple-500' },
              ].map(device => (
                <div key={device.device}>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="font-medium text-secondary-900">{device.device}</span>
                    <span className="text-secondary-600">{device.percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary-200 rounded-full overflow-hidden">
                    <div className={`h-full ${device.color} rounded-full`} style={{ width: `${device.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="font-semibold text-secondary-900 mb-6">Rental Duration Distribution</h3>
            <div className="space-y-4">
              {[
                { period: 'Daily', percentage: 12, color: 'bg-red-500' },
                { period: 'Weekly', percentage: 18, color: 'bg-orange-500' },
                { period: 'Monthly', percentage: 45, color: 'bg-blue-500' },
                { period: 'Quarterly', percentage: 15, color: 'bg-green-500' },
                { period: 'Yearly', percentage: 10, color: 'bg-purple-500' },
              ].map(period => (
                <div key={period.period}>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="font-medium text-secondary-900">{period.period}</span>
                    <span className="text-secondary-600">{period.percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary-200 rounded-full overflow-hidden">
                    <div className={`h-full ${period.color} rounded-full`} style={{ width: `${period.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}