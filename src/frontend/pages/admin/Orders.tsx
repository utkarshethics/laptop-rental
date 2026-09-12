import { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Truck, RotateCcw, XCircle, Loader2, ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'active', 'returned', 'completed', 'cancelled', 'refunded'];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-warning-600', bgColor: 'bg-warning-50' },
  confirmed: { label: 'Confirmed', color: 'text-primary-600', bgColor: 'bg-primary-50' },
  processing: { label: 'Processing', color: 'text-primary-600', bgColor: 'bg-primary-50' },
  shipped: { label: 'Shipped', color: 'text-primary-600', bgColor: 'bg-primary-50' },
  delivered: { label: 'Delivered', color: 'text-success-600', bgColor: 'bg-success-50' },
  active: { label: 'Active', color: 'text-primary-600', bgColor: 'bg-primary-50' },
  returned: { label: 'Returned', color: 'text-success-600', bgColor: 'bg-success-50' },
  completed: { label: 'Completed', color: 'text-success-600', bgColor: 'bg-success-50' },
  cancelled: { label: 'Cancelled', color: 'text-error-600', bgColor: 'bg-error-50' },
  refunded: { label: 'Refunded', color: 'text-success-600', bgColor: 'bg-success-50' },
};

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', userId: '1', status: 'active', items: [{ id: '1', productId: '1', productName: 'HP EliteBook 840 G9', productImage: '/assets/products/hp/elitebook-840-g9/hero.jpg', brand: 'HP', quantity: 1, rentalPeriod: 'monthly', unitPrice: 3499, totalPrice: 5499 }], subtotal: 3499, discount: 0, tax: 0, deposit: 4000, total: 7499, currency: 'INR', shippingAddress: { name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' }, billingAddress: { name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', line1: '123 Main St', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' }, payment: { method: 'card', status: 'completed', transactionId: 'txn_123', paidAt: '2024-01-15T10:30:00Z', amount: 7499 }, rentalStartDate: '2024-01-16', rentalEndDate: '2024-02-15', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-20T14:20:00Z' },
  { id: 'ORD-2024-002', userId: '2', status: 'delivered', items: [{ id: '2', productId: '3', productName: 'MacBook Air M2', productImage: '/assets/products/apple/macbook-air-m2/hero.jpg', brand: 'Apple', quantity: 1, rentalPeriod: 'monthly', unitPrice: 4999, totalPrice: 8999 }], subtotal: 4999, discount: 1500, tax: 0, deposit: 8000, total: 11499, currency: 'INR', shippingAddress: { name: 'Priya Patel', phone: '9876543211', email: 'priya@example.com', line1: '456 Park Ave', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India' }, billingAddress: { name: 'Priya Patel', phone: '9876543211', email: 'priya@example.com', line1: '456 Park Ave', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India' }, payment: { method: 'upi', status: 'completed', transactionId: 'txn_456', paidAt: '2024-01-10T14:20:00Z', amount: 11499 }, rentalStartDate: '2024-01-11', rentalEndDate: '2024-02-10', createdAt: '2024-01-10T14:20:00Z', updatedAt: '2024-01-11T09:00:00Z' },
  { id: 'ORD-2024-003', userId: '3', status: 'processing', items: [{ id: '3', productId: '2', productName: 'Dell Latitude 5430', productImage: '/assets/products/dell/latitude-5430/hero.jpg', brand: 'Dell', quantity: 1, rentalPeriod: 'monthly', unitPrice: 2799, totalPrice: 3999 }], subtotal: 2799, discount: 0, tax: 0, deposit: 3000, total: 5799, currency: 'INR', shippingAddress: { name: 'Amit Kumar', phone: '9876543212', email: 'amit@example.com', line1: '789 Lake Rd', city: 'Delhi', state: 'Delhi', pincode: '110001', country: 'India' }, billingAddress: { name: 'Amit Kumar', phone: '9876543212', email: 'amit@example.com', line1: '789 Lake Rd', city: 'Delhi', state: 'Delhi', pincode: '110001', country: 'India' }, payment: { method: 'netbanking', status: 'completed', transactionId: 'txn_789', paidAt: '2024-01-18T09:15:00Z', amount: 5799 }, rentalStartDate: '2024-01-19', rentalEndDate: '2024-02-18', createdAt: '2024-01-18T09:15:00Z', updatedAt: '2024-01-18T09:15:00Z' },
  { id: 'ORD-2024-004', userId: '4', status: 'confirmed', items: [{ id: '4', productId: '4', productName: 'Lenovo ThinkPad X1 Carbon', productImage: '/assets/products/lenovo/thinkpad-x1-carbon/hero.jpg', brand: 'Lenovo', quantity: 1, rentalPeriod: 'monthly', unitPrice: 3999, totalPrice: 6499 }], subtotal: 3999, discount: 0, tax: 0, deposit: 5000, total: 8999, currency: 'INR', shippingAddress: { name: 'Sneha Singh', phone: '9876543213', email: 'sneha@example.com', line1: '321 Hill St', city: 'Hyderabad', state: 'Telangana', pincode: '500001', country: 'India' }, billingAddress: { name: 'Sneha Singh', phone: '9876543213', email: 'sneha@example.com', line1: '321 Hill St', city: 'Hyderabad', state: 'Telangana', pincode: '500001', country: 'India' }, payment: { method: 'card', status: 'completed', transactionId: 'txn_012', paidAt: '2024-01-19T16:20:00Z', amount: 8999 }, rentalStartDate: '2024-01-20', rentalEndDate: '2024-02-19', createdAt: '2024-01-19T16:20:00Z', updatedAt: '2024-01-19T16:20:00Z' },
  { id: 'ORD-2024-005', userId: '5', status: 'pending', items: [{ id: '5', productId: '5', productName: 'ASUS ROG Zephyrus G14', productImage: '/assets/products/asus/rog-zephyrus-g14/hero.jpg', brand: 'ASUS', quantity: 1, rentalPeriod: 'monthly', unitPrice: 4999, totalPrice: 8999 }], subtotal: 4999, discount: 0, tax: 0, deposit: 10000, total: 14999, currency: 'INR', shippingAddress: { name: 'Vikram Jain', phone: '9876543214', email: 'vikram@example.com', line1: '654 Valley Rd', city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', country: 'India' }, billingAddress: { name: 'Vikram Jain', phone: '9876543214', email: 'vikram@example.com', line1: '654 Valley Rd', city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', country: 'India' }, payment: { method: 'upi', status: 'pending', transactionId: 'txn_345', paidAt: '', amount: 14999 }, rentalStartDate: '2024-01-21', rentalEndDate: '2024-02-20', createdAt: '2024-01-19T14:10:00Z', updatedAt: '2024-01-19T14:10:00Z' },
];

export function AdminOrders() {
  const [orders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [dateRange, setDateRange] = useState<[string, string] | undefined>(undefined);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.shippingAddress.name.toLowerCase().includes(search.toLowerCase()) ||
        order.shippingAddress.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesPayment = !paymentFilter || order.payment.method === paymentFilter;
      const matchesCity = !cityFilter || order.shippingAddress.city === cityFilter;
      return matchesSearch && matchesStatus && matchesPayment && matchesCity;
    });
  }, [search, statusFilter, paymentFilter, cityFilter]);

  const handleBulkAction = () => {
    if (selectedOrders.length === 0) return toast.error('No orders selected');
    if (bulkAction === 'confirm') {
      selectedOrders.forEach(id => toast.success(`Order ${id} confirmed`));
    } else if (bulkAction === 'ship') {
      selectedOrders.forEach(id => toast.success(`Order ${id} marked as shipped`));
    } else if (bulkAction === 'cancel') {
      selectedOrders.forEach(id => toast.success(`Order ${id} cancelled`));
    }
    setSelectedOrders([]);
    setBulkAction('');
  };

  const cities = [...new Set(orders.map(o => o.shippingAddress.city))].sort();

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-heading-lg font-bold text-secondary-900">Orders Management</h1>
            <p className="text-secondary-500 mt-1">Manage and track all rental orders</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => toast('Export coming soon')}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Card padding="lg">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search by ID, customer, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              className="flex-1 max-w-md"
            />
            <Dropdown
              options={[{ value: '', label: 'All Status' }, ...STATUS_OPTIONS.map(s => ({ value: s, label: s }))]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              className="w-40"
            />
            <Dropdown
              options={[{ value: '', label: 'All Payment' }, { value: 'card', label: 'Card' }, { value: 'upi', label: 'UPI' }, { value: 'netbanking', label: 'Net Banking' }]}
              value={paymentFilter}
              onChange={setPaymentFilter}
              placeholder="Payment"
              className="w-40"
            />
            <Dropdown
              options={[{ value: '', label: 'All Cities' }, ...['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'].map(c => ({ value: c, label: c }))]}
              value={cityFilter}
              onChange={setCityFilter}
              placeholder="City"
              className="w-40"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left p-4 font-medium text-secondary-500 w-12"><input type="checkbox" className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500" /></th>
                  <th className="text-left p-4 font-medium text-secondary-500">Order ID</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Customer</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden md:table-cell">City</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Items</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Total</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Payment</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Status</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Date</th>
                  <th className="text-right p-4 font-medium text-secondary-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-secondary-50">
                    <td className="p-4"><input type="checkbox" checked={selectedOrders.includes(order.id)} onChange={e => e.target.checked ? setSelectedOrders([...selectedOrders, order.id]) : setSelectedOrders(selectedOrders.filter(id => id !== order.id))} className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500" /></td>
                    <td className="p-4 font-mono font-medium text-secondary-900">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-secondary-900">{order.shippingAddress.name}</p>
                        <p className="text-body-sm text-secondary-500">{order.shippingAddress.email}</p>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">{order.shippingAddress.city}</td>
                    <td className="p-4">{order.items.length} item{order.items.length > 1 ? 's' : ''}</td>
                    <td className="p-4 font-medium text-secondary-900">{formatCurrency(order.total)}</td>
                    <td className="p-4 capitalize">{order.payment.method}</td>
                    <td className="p-4">
                      <Dropdown
                        options={STATUS_OPTIONS.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                        value={order.status}
                        onChange={status => toast(`Order ${order.id} status changed to ${status}`)}
                        className="w-32"
                      />
                    </td>
                    <td className="p-4 text-body-sm text-secondary-500">{formatRelativeTime(order.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelectedOrder(order)} className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100" aria-label="View details"><Eye className="w-5 h-5" /></button>
                        {order.status === 'confirmed' && <Button variant="ghost" size="sm" onClick={() => toast(`Order ${order.id} marked as processing`)} className="gap-1"><Truck className="w-4 h-4" /> Process</Button>}
                        {order.status === 'processing' && <Button variant="ghost" size="sm" onClick={() => toast(`Order ${order.id} marked as shipped`)} className="gap-1"><Truck className="w-4 h-4" /> Ship</Button>}
                        {order.status === 'delivered' && <Button variant="ghost" size="sm" onClick={() => toast(`Return requested for ${order.id}`)} className="gap-1"><RotateCcw className="w-4 h-4" /> Return</Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p className="text-secondary-500">No orders found matching your criteria</p>
            </div>
          )}

          {selectedOrders.length > 0 && (
            <div className="mt-6 flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100">
              <span className="font-medium text-secondary-900">{selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected</span>
              <div className="flex gap-3">
                <Dropdown
                  options={[
                    { value: '', label: 'Bulk Action' },
                    { value: 'confirm', label: 'Mark as Confirmed' },
                    { value: 'ship', label: 'Mark as Shipped' },
                    { value: 'cancel', label: 'Cancel Orders' },
                  ]}
                  value={bulkAction}
                  onChange={setBulkAction}
                  placeholder="Select action"
                  className="w-48"
                />
                <Button onClick={handleBulkAction} disabled={!bulkAction}>Apply</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}