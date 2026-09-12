import { useParams, Link } from 'react-router-dom';
import { Package, Truck, MapPin, CreditCard, Calendar, Clock, CheckCircle, XCircle, ArrowLeft, Download, RotateCcw, Shield, User, Mail, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatDate, formatRelativeTime, cn } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';

const MOCK_ORDER_DETAIL: Record<string, Order> = {
  'ORD-2024-001': {
    id: 'ORD-2024-001', userId: '1', status: 'active',
    items: [
      { id: '1', productId: '1', productName: 'HP EliteBook 840 G9', productImage: '/assets/products/hp/elitebook-840-g9/hero.jpg', brand: 'HP', quantity: 1, rentalPeriod: 'monthly', unitPrice: 1199, totalPrice: 1199 },
    ],
    subtotal: 1199, discount: 0, tax: 0, deposit: 4000, total: 5199, currency: 'INR',
    shippingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St, Koramangala', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    billingAddress: { name: 'John Doe', phone: '9876543210', email: 'john@example.com', line1: '123 Main St, Koramangala', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' },
    payment: { method: 'card', status: 'completed', transactionId: 'txn_123456789', paidAt: '2024-01-15T10:30:00Z', amount: 5199 },
    rentalStartDate: '2024-01-16', rentalEndDate: '2024-02-15', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-20T14:20:00Z',
  },
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode; progress: number }> = {
  pending: { label: 'Order Placed', color: 'text-warning-600', bgColor: 'bg-warning-50', icon: <Clock className="w-5 h-5" />, progress: 10 },
  confirmed: { label: 'Confirmed', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <CheckCircle className="w-5 h-5" />, progress: 25 },
  processing: { label: 'Processing', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Package className="w-5 h-5" />, progress: 40 },
  shipped: { label: 'Shipped', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Truck className="w-5 h-5" />, progress: 60 },
  delivered: { label: 'Delivered', color: 'text-success-600', bgColor: 'bg-success-50', icon: <CheckCircle className="w-5 h-5" />, progress: 80 },
  active: { label: 'Active Rental', color: 'text-primary-600', bgColor: 'bg-primary-50', icon: <Package className="w-5 h-5" />, progress: 80 },
  returned: { label: 'Returned', color: 'text-success-600', bgColor: 'bg-success-50', icon: <RotateCcw className="w-5 h-5" />, progress: 90 },
  completed: { label: 'Completed', color: 'text-success-600', bgColor: 'bg-success-50', icon: <CheckCircle className="w-5 h-5" />, progress: 100 },
  cancelled: { label: 'Cancelled', color: 'text-error-600', bgColor: 'bg-error-50', icon: <XCircle className="w-5 h-5" />, progress: 0 },
  refunded: { label: 'Refunded', color: 'text-success-600', bgColor: 'bg-success-50', icon: <RotateCcw className="w-5 h-5" />, progress: 100 },
};

const TIMELINE = [
  { key: 'placed', label: 'Order Placed', icon: Calendar },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  { key: 'active', label: 'Active Rental', icon: Package },
  { key: 'returned', label: 'Returned', icon: RotateCcw },
  { key: 'completed', label: 'Completed', icon: CheckCircle },
];

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const order = MOCK_ORDER_DETAIL[id || ''];
  const statusConfig = order ? STATUS_CONFIG[order.status] : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-lg font-bold text-secondary-900 mb-2">Order Not Found</h1>
          <p className="text-secondary-500 mb-6">The order you're looking for doesn't exist.</p>
          <Link to="/account/orders"><Button>Back to Orders</Button></Link>
        </div>
      </div>
    );
  }

  const getStatusIndex = (status: OrderStatus) => {
    const orderStatuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'active', 'returned', 'completed'];
    return orderStatuses.indexOf(status);
  };

  const currentStatusIndex = getStatusIndex(order.status);

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Link to="/account/orders" className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-heading-lg font-bold text-secondary-900">Order Details</h1>
              <p className="text-secondary-500">{order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card padding="lg">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-heading-md font-bold text-secondary-900">Order Summary</h2>
                    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', statusConfig?.bgColor, statusConfig?.color)}>
                      <span className="flex items-center gap-1">{statusConfig?.icon} {statusConfig?.label}</span>
                    </span>
                  </div>
                  <p className="text-secondary-500">Placed {formatRelativeTime(order.createdAt)} • {formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-heading-lg font-bold text-primary-600">{formatCurrency(order.total)}</p>
                  <p className="text-body-sm text-secondary-500">Total Paid</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${statusConfig?.progress || 0}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-caption text-secondary-500">
                  {TIMELINE.map((step, index) => (
                    <span key={step.key} className={cn('flex-1 text-center', index <= currentStatusIndex ? 'text-primary-600 font-medium' : '')}>
                      {step.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-secondary-50 rounded-xl">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                      {item.productImage && (
                        <img src={item.productImage} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{item.productName}</p>
                      <p className="text-body-sm text-secondary-500">{item.brand} • {item.rentalPeriod} rental</p>
                      <p className="text-body-sm text-secondary-500">Qty: {item.quantity} • {formatCurrency(item.unitPrice)}/{item.rentalPeriod === 'quarterly' ? 'quarter' : item.rentalPeriod === 'yearly' ? 'year' : 'month'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary-900">{formatCurrency(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Shipping Address
                </h3>
                <address className="not-italic text-secondary-600 whitespace-pre-line">
                  {order.shippingAddress.name}<br />
                  {order.shippingAddress.line1}<br />
                  {order.shippingAddress.line2 && `${order.shippingAddress.line2}<br />`}
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                  {order.shippingAddress.country}<br />
                  Phone: {order.shippingAddress.phone}<br />
                  Email: {order.shippingAddress.email}
                </address>
              </Card>

              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  Payment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Payment Method</span>
                    <span className="font-medium capitalize">{order.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Transaction ID</span>
                    <span className="font-mono text-sm">{order.payment.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Payment Status</span>
                    <span className={cn('font-medium capitalize', order.payment.status === 'completed' ? 'text-success-600' : 'text-warning-600')}>
                      {order.payment.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Paid On</span>
                    <span>{formatDate(order.payment.paidAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-500">Amount Paid</span>
                    <span className="font-bold text-secondary-900">{formatCurrency(order.payment.amount)}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card padding="lg">
              <h3 className="font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Rental Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Rental Starts</p>
                    <p className="text-secondary-600">{formatDate(order.rentalStartDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Rental Ends</p>
                    <p className="text-secondary-600">{formatDate(order.rentalEndDate)}</p>
                  </div>
                </div>
                {order.status === 'active' && (
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">Auto-Renewal</p>
                      <p className="text-secondary-600">Will renew on {formatDate(order.rentalEndDate)} unless cancelled</p>
                    </div>
                  </div>
                )}
                {order.status === 'returned' && (
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">Returned</p>
                      <p className="text-secondary-600">Returned on {formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card padding="lg" className="sticky top-24">
              <h3 className="font-semibold text-secondary-900 mb-4">Price Breakdown</h3>
              <div className="space-y-3 text-body">
                <div className="flex justify-between text-secondary-600">
                  <span>Subtotal ({order.items.length} items)</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-success-600">
                    <span>Discount</span>
                    <span className="font-medium">-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-secondary-600">
                  <span>Security Deposit (Refundable)</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(order.deposit)}</span>
                </div>
                <div className="border-t border-secondary-200 pt-3 flex justify-between text-heading-sm font-bold text-secondary-900">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-secondary-200 space-y-3">
                <Button variant="outline" className="w-full" onClick={() => toast('Invoice download coming soon')}>
                  <Download className="w-4 h-4 mr-2" /> Download Invoice
                </Button>
                {order.status === 'active' && (
                  <Button variant="outline" className="w-full">Request Return</Button>
                )}
                {order.status === 'delivered' && (
                  <Button variant="outline" className="w-full">Schedule Pickup</Button>
                )}
                <Link to="/products" className="block text-center">
                  <Button variant="ghost" className="w-full">Continue Shopping</Button>
                </Link>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="font-semibold text-secondary-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Shield className="w-5 h-5" />
                  Damage Protection Info
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <RotateCcw className="w-5 h-5" />
                  Return & Refund Policy
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <User className="w-5 h-5" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}