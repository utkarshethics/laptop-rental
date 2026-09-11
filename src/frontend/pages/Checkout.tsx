import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Building2, Loader2, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { formatCurrency, cn } from '@/lib/utils';
import { CartItem, RENTAL_PERIODS, Address } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm, BHIM' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, description: 'All major banks supported' },
];

export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, depositTotal, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: '',
    phone: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    gstin: '',
  });

  const [billingAddress, setBillingAddress] = useState<Address>({ ...shippingAddress });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const finalTotal = total - promoDiscount;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
      setBillingAddress(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [isAuthenticated, user, items, navigate]);

  useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  }, [shippingAddress, sameAsShipping]);

  const validateStep = () => {
    if (step === 1) {
      if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.email ||
          !shippingAddress.line1 || !shippingAddress.city || !shippingAddress.pincode) {
        toast.error('Please fill in all required shipping address fields');
        return false;
      }
      if (!/^[6-9]\d{9}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
        toast.error('Please enter a valid 10-digit phone number');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
        toast.error('Please enter a valid email address');
        return false;
      }
      if (!/^\d{6}$/.test(shippingAddress.pincode)) {
        toast.error('Please enter a valid 6-digit pincode');
        return false;
      }
    }
    if (step === 2 && !selectedPayment) {
      toast.error('Please select a payment method');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
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

  const handlePayment = async () => {
    if (!validateStep()) return;

    setProcessingPayment(true);
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          rentalPeriod: item.rentalPeriod,
          startDate: item.startDate,
          endDate: item.endDate,
          city: item.city,
        })),
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        paymentMethod: selectedPayment,
        promoCode: promoApplied ? promoCode : undefined,
        totalAmount: finalTotal,
      };

      const response = await api.post('/orders', orderData);

      if (response.data.success) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate(`/account/orders/${response.data.data.id}`);
      } else {
        throw new Error(response.data.error?.message || 'Order failed');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const steps = [
    { number: 1, label: 'Address', icon: Building2 },
    { number: 2, label: 'Payment', icon: CreditCard },
    { number: 3, label: 'Review', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-heading-lg font-bold text-secondary-900">Checkout</h1>
            <div className="flex items-center gap-4">
              {steps.map((s, index) => (
                <Fragment key={s.number}>
                  <div className={cn('flex items-center gap-2', index < steps.length - 1 && 'hidden md:flex')}>
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                      step > s.number ? 'bg-primary-600 text-white' :
                      step === s.number ? 'bg-primary-100 text-primary-700' :
                      'bg-secondary-200 text-secondary-500'
                    )}>
                      {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                    </div>
                    <span className={cn('text-sm font-medium hidden sm:block',
                      step >= s.number ? 'text-secondary-900' : 'text-secondary-400'
                    )}>{s.label}</span>
                    {index < steps.length - 1 && (
                      <div className={cn('w-16 h-0.5 mx-2',
                        step > s.number ? 'bg-primary-600' : 'bg-secondary-200'
                      )} />
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && <ShippingAddressStep address={shippingAddress} onChange={setShippingAddress} />}
            {step === 2 && <PaymentStep selectedPayment={selectedPayment} onChange={setSelectedPayment} cardDetails={cardDetails} onCardChange={setCardDetails} />}
            {step === 3 && <ReviewStep items={items} shippingAddress={shippingAddress} billingAddress={sameAsShipping ? shippingAddress : billingAddress} selectedPayment={selectedPayment} promoDiscount={promoDiscount} promoApplied={promoApplied} promoCode={promoCode} subtotal={subtotal} depositTotal={depositTotal} total={total} />}
          </div>

          <div className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              <h3 className="font-semibold text-secondary-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-secondary-50">
                      {item.product.images[0] ? (
                        <img src={item.product.images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary-400">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-secondary-900 truncate">{item.product.name}</p>
                      <p className="text-body-sm text-secondary-500">{item.quantity} × {RENTAL_PERIODS.find(p => p.value === item.rentalPeriod)?.label}</p>
                      <p className="text-body-sm font-medium text-secondary-900">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-secondary-200 pt-4 space-y-3">
                <div className="flex justify-between text-body text-secondary-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-body text-secondary-600">
                  <span>Security Deposit (Refundable)</span>
                  <span className="font-medium text-secondary-900">{formatCurrency(depositTotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-body text-success-600">
                    <span>Promo Discount ({promoCode})</span>
                    <span className="font-medium">-{formatCurrency(promoDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-secondary-200 pt-3 flex justify-between text-heading-sm font-bold text-secondary-900">
                  <span>Total Payable</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {step < 3 && (
                <div className="mt-6">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleNext}
                    loading={loading}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    {step === 1 ? 'Continue to Payment' : 'Review Order'}
                  </Button>
                </div>
              )}

              {step === 3 && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                  loading={processingPayment}
                >
                  {processingPayment ? 'Processing...' : 'Place Order'}
                </Button>
              )}

              {step > 1 && (
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}

              <div className="mt-6 flex items-center gap-2 text-body-sm text-secondary-500">
                <Lock className="w-4 h-4" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingAddressStep({ address, onChange }: { address: Address; onChange: (addr: Address) => void }) {
  return (
    <Card padding="lg">
      <h3 className="font-semibold text-secondary-900 mb-6">Shipping Address</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full Name" value={address.name} onChange={e => onChange({ ...address, name: e.target.value })} required />
        <Input label="Phone Number" type="tel" value={address.phone} onChange={e => onChange({ ...address, phone: e.target.value })} placeholder="10 digit number" required />
        <Input label="Email" type="email" value={address.email} onChange={e => onChange({ ...address, email: e.target.value })} required />
        <Input label="GSTIN (Optional)" value={address.gstin} onChange={e => onChange({ ...address, gstin: e.target.value })} placeholder="For business invoices" />
      </div>
      <Input label="Address Line 1" value={address.line1} onChange={e => onChange({ ...address, line1: e.target.value })} placeholder="House/Flat No, Building, Street" required />
      <Input label="Address Line 2 (Optional)" value={address.line2} onChange={e => onChange({ ...address, line2: e.target.value })} placeholder="Landmark, Area" />
      <div className="grid sm:grid-cols-3 gap-4">
        <Input label="City" value={address.city} onChange={e => onChange({ ...address, city: e.target.value })} required />
        <Input label="State" value={address.state} onChange={e => onChange({ ...address, state: e.target.value })} required />
        <Input label="Pincode" value={address.pincode} onChange={e => onChange({ ...address, pincode: e.target.value })} placeholder="6 digits" required maxLength={6} />
      </div>
    </Card>
  );
}

function PaymentStep({ selectedPayment, onChange, cardDetails, onCardChange }: { selectedPayment: string; onChange: (v: string) => void; cardDetails: any; onCardChange: (d: any) => void }) {
  return (
    <Card padding="lg">
      <h3 className="font-semibold text-secondary-900 mb-6">Payment Method</h3>

      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map(method => (
          <label key={method.id} className={cn(
            'flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer',
            selectedPayment === method.id ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-secondary-300'
          )}>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={e => onChange(e.target.value)}
              className="w-4 h-4 text-primary-600 border-secondary-300 focus:ring-primary-500"
            />
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
              <method.icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-secondary-900">{method.label}</p>
              <p className="text-body-sm text-secondary-500">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {selectedPayment === 'card' && (
        <div className="space-y-4 border-t border-secondary-200 pt-6">
          <h4 className="font-medium text-secondary-900">Card Details</h4>
          <Input label="Card Number" value={cardDetails.number} onChange={e => onCardChange({ ...cardDetails, number: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Expiry (MM/YY)" value={cardDetails.expiry} onChange={e => onCardChange({ ...cardDetails, expiry: e.target.value })} placeholder="12/25" maxLength={5} />
            <Input label="CVV" type="password" value={cardDetails.cvv} onChange={e => onCardChange({ ...cardDetails, cvv: e.target.value })} placeholder="123" maxLength={4} />
          </div>
          <Input label="Name on Card" value={cardDetails.name} onChange={e => onCardChange({ ...cardDetails, name: e.target.value })} placeholder="John Doe" />
        </div>
      )}
    </Card>
  );
}

function ReviewStep({ items, shippingAddress, billingAddress, selectedPayment, promoDiscount, promoApplied, promoCode, subtotal, depositTotal, total }: any) {
  const paymentMethod = PAYMENT_METHODS.find(m => m.id === selectedPayment);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <h3 className="font-semibold text-secondary-900 mb-4">Shipping Address</h3>
        <address className="not-italic text-secondary-600 whitespace-pre-line">
          {shippingAddress.name}<br />
          {shippingAddress.line1}<br />
          {shippingAddress.line2 && `${shippingAddress.line2}<br />`}
          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}<br />
          {shippingAddress.country}<br />
          Phone: {shippingAddress.phone}<br />
          Email: {shippingAddress.email}
          {shippingAddress.gstin && `<br />GSTIN: ${shippingAddress.gstin}`}
        </address>
      </Card>

      {!sameAsShipping && (
        <Card padding="lg">
          <h3 className="font-semibold text-secondary-900 mb-4">Billing Address</h3>
          <address className="not-italic text-secondary-600 whitespace-pre-line">
            {billingAddress.name}<br />
            {billingAddress.line1}<br />
            {billingAddress.line2 && `${billingAddress.line2}<br />`}
            {billingAddress.city}, {billingAddress.state} {billingAddress.pincode}<br />
            {billingAddress.country}
          </address>
        </Card>
      )}

      <Card padding="lg">
        <h3 className="font-semibold text-secondary-900 mb-4">Payment Method</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            {paymentMethod?.icon && <paymentMethod.icon className="w-6 h-6 text-primary-600" />}
          </div>
          <div>
            <p className="font-medium text-secondary-900">{paymentMethod?.label}</p>
            <p className="text-body-sm text-secondary-500">{paymentMethod?.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { Fragment } from 'react';