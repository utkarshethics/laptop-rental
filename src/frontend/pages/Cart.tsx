import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Truck, Shield, RotateCcw, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, cn } from '@/lib/utils';
import { CartItem, RentalPeriod, RENTAL_PERIODS } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];

export function Cart() {
  const { items, subtotal, depositTotal, total, itemCount, removeItem, updateQuantity, updateRentalPeriod, updateDates, updateCity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setCheckoutLoading(true);
    setTimeout(() => {
      window.location.href = '/checkout';
      setCheckoutLoading(false);
    }, 500);
  };

  const applyPromo = () => {
    if (promoCode === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.1);
      toast.success('Promo code applied! 10% off');
    } else if (promoCode === 'STUDENT20') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2);
      toast.success('Student discount applied! 20% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const finalTotal = total - promoDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 mx-auto mb-6 text-secondary-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h1 className="text-heading-lg font-bold text-secondary-900 mb-2">Your Cart is Empty</h1>
          <p className="text-body text-secondary-500 mb-8">Looks like you haven't added any laptops yet.</p>
          <Link to="/products" className="btn-primary btn-lg w-full sm:w-auto">
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-heading-lg font-bold text-secondary-900">Shopping Cart</h1>
          <p className="text-secondary-500 mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onUpdateRentalPeriod={updateRentalPeriod}
                onUpdateDates={updateDates}
                onUpdateCity={updateCity}
                onRemove={removeItem}
                rentalPeriods={RENTAL_PERIODS}
                cities={CITIES}
              />
            ))}

            <Card padding="md">
              <h3 className="font-semibold text-secondary-900 mb-4">Promo Code</h3>
              <div className="flex gap-3">
                <Input
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1"
                />
                <Button onClick={applyPromo} disabled={promoApplied}>Apply</Button>
                {promoApplied && (
                  <Button variant="outline" onClick={() => { setPromoApplied(false); setPromoDiscount(0); setPromoCode(''); }}>Remove</Button>
                )}
              </div>
              {promoApplied && (
                <p className="mt-2 text-sm text-success-600">Discount applied: -{formatCurrency(promoDiscount)}</p>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              <h3 className="font-semibold text-secondary-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-body text-secondary-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-body text-secondary-600">
                  <span>Security Deposit</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(depositTotal)} <span className="text-body-sm font-normal text-secondary-500">(Refundable)</span></span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-body text-success-600">
                    <span>Promo Discount</span>
                    <span className="font-medium">-{formatCurrency(promoDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-secondary-200 pt-3 flex justify-between text-heading-sm font-semibold text-secondary-900">
                  <span>Total Payable</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 p-4 bg-secondary-50 rounded-xl">
                <div className="flex items-center gap-2 text-body-sm text-secondary-700">
                  <Truck className="w-4 h-4 text-primary-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-secondary-700">
                  <Shield className="w-4 h-4 text-primary-600" />
                  <span>Damage Protection Included</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-secondary-700">
                  <RotateCcw className="w-4 h-4 text-primary-600" />
                  <span>Easy Returns</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleProceedToCheckout}
                loading={checkoutLoading}
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Proceed to Checkout
              </Button>

              <p className="text-center text-body-sm text-secondary-500 mt-4">
                Secure checkout powered by Stripe & Razorpay
              </p>

              <Link to="/products" className="block text-center text-body-sm text-primary-600 hover:text-primary-700 mt-4">
                Continue Shopping
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign In Required"
        description="Please sign in to proceed to checkout."
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">You need to be logged in to complete your rental.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => { setShowLoginModal(false); window.location.href = '/login'; }}>Sign In</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onUpdateRentalPeriod,
  onUpdateDates,
  onUpdateCity,
  onRemove,
  rentalPeriods,
  cities,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onUpdateRentalPeriod: (id: string, period: RentalPeriod) => void;
  onUpdateDates: (id: string, start: string, end: string) => void;
  onUpdateCity: (id: string, city: string) => void;
  onRemove: (id: string) => void;
  rentalPeriods: typeof RENTAL_PERIODS;
  cities: string[];
}) {
  const product = item.product;
  const currentPeriod = rentalPeriods.find(p => p.value === item.rentalPeriod);

  return (
    <Card padding="md" className="flex flex-col sm:flex-row gap-6">
      <div className="relative w-full sm:w-32 h-32 sm:h-auto sm:min-h-[120px] flex-shrink-0 rounded-xl overflow-hidden bg-secondary-50">
        {product.images[0] ? (
          <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary-400">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-body-sm text-secondary-500 font-medium uppercase tracking-wide">{product.brand}</p>
              <h3 className="font-semibold text-secondary-900 truncate">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1 text-body-sm text-secondary-500">
                <span>Qty: {item.quantity}</span>
                <span>•</span>
                <span>{currentPeriod?.label || item.rentalPeriod}</span>
                <span>•</span>
                <span>{item.city}</span>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 rounded-lg text-secondary-400 hover:text-error-600 hover:bg-error-50 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 grid sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-caption text-secondary-500 mb-1">Rental Period</label>
              <Dropdown
                options={rentalPeriods.map(p => ({ value: p.value, label: p.label }))}
                value={item.rentalPeriod}
                onChange={period => onUpdateRentalPeriod(item.id, period as RentalPeriod)}
                placeholder="Select period"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-caption text-secondary-500 mb-1">Start Date</label>
              <Input
                type="date"
                value={item.startDate}
                onChange={e => onUpdateDates(item.id, e.target.value, item.endDate)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-caption text-secondary-500 mb-1">End Date</label>
              <Input
                type="date"
                value={item.endDate}
                readOnly
                className="w-full bg-secondary-50"
              />
            </div>
            <div>
              <label className="block text-caption text-secondary-500 mb-1">City</label>
              <Dropdown
                options={cities.map(city => ({ value: city, label: city }))}
                value={item.city}
                onChange={city => onUpdateCity(item.id, city)}
                placeholder="Select city"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="sm:w-40 flex-shrink-0 text-right sm:text-left">
          <div className="text-display-sm font-bold text-primary-600">{formatCurrency(item.price)}</div>
          <p className="text-body-sm text-secondary-500">Total</p>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease">
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= product.availability.inStock} aria-label="Increase">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}