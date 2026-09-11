import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, RotateCcw, Clock, CheckCircle, XCircle, Loader2, ChevronDown, ChevronUp, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { cn, formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001', userId: '1', status: 'active',
    items: [
      { id: '1', productId: '1', productName: 'HP EliteBook 840 G9', productImage: '/assets/products/hp/elitebook-840-g9/hero.svg', brand: 'HP', quantity: 1, rentalPeriod: 'monthly', unitPrice: 8999, totalPrice: 8999 },
    ],
    subtotal: 8999, discount: 0, tax: 0, deposit: 5000, total: 13999, currency: 'INR',
    shippingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    billingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    payment: { method: 'card', status: 'completed', transactionId: 'txn_123', paidAt: '2024-01-15T10:30:00Z', amount: 13999 },
    rentalStartDate: '2024-01-16', rentalEndDate: '2024-02-15', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'ORD-2024-002', userId: '1', status: 'completed',
    items: [
      { id: '2', productId: '3', productName: 'MacBook Air M2', productImage: '/assets/products/apple/macbook-air-m2/hero.svg', brand: 'Apple', quantity: 1, rentalPeriod: 'monthly', unitPrice: 14999, totalPrice: 14999 },
    ],
    subtotal: 14999, discount: 1500, tax: 0, deposit: 10000, total: 23499, currency: 'INR',
    shippingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    billingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    payment: { method: 'upi', status: 'completed', transactionId: 'txn_456', paidAt: '2023-12-01T14:20:00Z', amount: 23499 },
    rentalStartDate: '2023-12-02', rentalEndDate: '2024-01-01', createdAt: '2023-12-01T14:20:00Z', updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'ORD-2024-003', userId: '1', status: 'cancelled',
    items: [
      { id: '3', productId: '2', productName: 'Dell Latitude 5430', productImage: '/assets/products/dell/latitude-5430/hero.svg', brand: 'Dell', quantity: 1, rentalPeriod: 'monthly', unitPrice: 7999, totalPrice: 7999 },
    ],
    subtotal: 7999, discount: 0, tax: 0, deposit: 5000, total: 12999, currency: 'INR',
    shippingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    billingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    payment: { method: 'card', status: 'refunded', transactionId: 'txn_789', paidAt: '2023-11-15T09:15:00Z', amount: 12999 },
    rentalStartDate: '2023-11-16', rentalEndDate: '2023-12-15', createdAt: '2023-11-15T09:15:00Z', updatedAt: '2023-11-16T08:00:00Z',
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending', color: 'text-warning-600', bgColor: 'bg-warning-50', icon: <Clock className="w-4 h-4" /> },
  confirmed: { label: 'Confirmed', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <CheckCircle className="w-4 h-4" /> },
  processing: { label: 'Processing', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Package className="w-4 h-4" /> },
  shipped: { label: 'Shipped', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Truck className="w-4 h-4" /> },
  delivered: { label: 'Delivered', color: 'text-success-600', bgColor: 'bg-success-50', icon: <CheckCircle className="w-4 h-4" /> },
  active: { label: 'Active Rental', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Package className="w-4 h-4" /> },
  returned: { label: 'Returned', color: 'text-success-600', bgColor: 'bg-success-50', icon: <RotateCcw className="w-4 h-4" /> },
  completed: { label: 'Completed', color: 'text-success-600', bgColor: 'bg-success-50', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { label: 'Cancelled', color: 'text-error-600', bgColor: 'bg-error-50', icon: <XCircle className="w-4 h-4" /> },
  refunded: { label: 'Refunded', color: 'text-success-600', bgColor: 'bg-success-50', icon: <RotateCcw className="w-4 h-4" /> },
};

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount'>('newest');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'amount') return b.total - a.total;
    return 0;
  });

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-heading-lg font-bold text-secondary-900">My Orders</h1>
          <p className="text-secondary-500 mt-1">Track and manage your rental orders</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="gap-1"
          >
            All {statusCounts.pending && <span className="badge badge-secondary">{statusCounts.pending}</span>}
          </Button>
          {Object.keys(STATUS_CONFIG).map(status => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(status as OrderStatus)}
              className="gap-1"
            >
              {STATUS_CONFIG[status as OrderStatus].label} {statusCounts[status as OrderStatus] && <span className="badge badge-secondary">{statusCounts[status as OrderStatus]}</span>}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-body-sm text-secondary-500">{filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found</p>
          <Dropdown
            options={[
              { value: 'newest', label: 'Newest First' },
              { value: 'oldest', label: 'Oldest First' },
              { value: 'amount', label: 'Highest Amount' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-48"
          />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <Card key={i} padding="lg" className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-secondary-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-secondary-200 rounded w-3/4" />
                    <div className="h-4 bg-secondary-200 rounded w-1/2" />
                    <div className="h-4 bg-secondary-200 rounded w-1/4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-secondary-300" />
            <h3 className="text-heading-sm font-semibold text-secondary-900 mb-2">No Orders Found</h3>
            <p className="text-secondary-500 mb-6">{filter === 'all' ? 'You haven\'t placed any orders yet.' : `No orders with status "${STATUS_CONFIG[filter]?.label}"`}</p>
            {filter !== 'all' && <Button variant="outline" onClick={() => setFilter('all')}>View All Orders</Button>}
            {filter === 'all' && <Link to="/products"><Button className="mt-4">Start Shopping</Button></Link>}
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                expanded={expandedOrder === order.id}
                onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) {
  const statusConfig = STATUS_CONFIG[order.status];

  return (
    <Card padding="lg" className="overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 transition-colors"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono font-semibold text-secondary-900">{order.id}</span>
              <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusConfig.bgColor, statusConfig.color)}>
                <span className="flex items-center gap-1">{statusConfig.icon} {statusConfig.label}</span>
              </span>
              <span className="text-body-sm text-secondary-500">Placed {formatRelativeTime(order.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-heading-sm font-bold text-secondary-900">{formatCurrency(order.total)}</p>
              <p className="text-body-sm text-secondary-500">Total</p>
            </div>
            <Link to={`/account/orders/${order.id}`} className="btn-outline btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-secondary-200 pt-4 mt-4 animate-slide-down">
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-body-sm text-secondary-500">Rental Period</p>
              <p className="font-medium text-secondary-900">{formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-body-sm text-secondary-500">Payment</p>
              <p className="font-medium text-secondary-900 capitalize">{order.payment.method}</p>
            </div>
            <div className="space-y-1">
              <p className="text-body-sm text-secondary-500">Items</p>
              <p className="font-medium text-secondary-900">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-secondary-50 rounded-lg">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                  {item.productImage && (
                    <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary-900 truncate">{item.productName}</p>
                  <p className="text-body-sm text-secondary-500">{item.brand} • {item.rentalPeriod} • Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-secondary-900">{formatCurrency(item.totalPrice)}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-secondary-200">
              {order.status === 'active' && (
                <Button variant="outline" size="sm">Request Return</Button>
              )}
              {order.status === 'delivered' && (
                <Button variant="outline" size="sm">Schedule Pickup</Button>
              )}
              <Button variant="outline" size="sm" onClick={() => toast('Invoice download coming soon')}>
                <Download className="w-4 h-4 mr-1" /> Download Invoice
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}