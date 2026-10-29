import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MOCK_PRODUCTS } from '../data/products';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

const CITIES = [
  'Bangalore',
  'Mumbai',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
  'Kochi',
  'Indore',
];

export function Booking() {
  const [searchParams] = useSearchParams();
  const initialModel = searchParams.get('model') || MOCK_PRODUCTS[0]?.name || '';

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [laptopModel, setLaptopModel] = useState(initialModel);
  const [rentalPeriod, setRentalPeriod] = useState<number>(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Selected laptop info
  const selectedProduct = MOCK_PRODUCTS.find(p => p.name === laptopModel) || MOCK_PRODUCTS[0];
  const monthlyRent = selectedProduct?.pricing?.monthly || 999;
  const deposit = selectedProduct?.pricing?.deposit || 3000;
  const totalRentForPeriod = monthlyRent * rentalPeriod;
  const totalPayableNow = totalRentForPeriod + deposit;

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!/^[a-zA-Z\s]{2,50}$/.test(fullName.trim())) {
      newErrors.fullName = 'Please enter a valid full name (letters only).';
    }
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (address.trim().length < 6) {
      newErrors.address = 'Please enter complete delivery address (street, house no).';
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit postal PIN code.';
    }
    if (!city) {
      newErrors.city = 'Please select a delivery city.';
    }
    if (!laptopModel) {
      newErrors.laptopModel = 'Please select a laptop model.';
    }
    if (!deliveryDate) {
      newErrors.deliveryDate = 'Please select a preferred delivery date.';
    }
    if (!termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the Terms & Conditions and Refund Policy to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Book a Laptop on Rent | Online Rental Checkout | LaptopRent</title>
        <meta
          name="description"
          content="Complete your laptop rental reservation online. Doorstep delivery across major Indian cities by verified partner providers. Managed by STAGE-X."
        />
        <link rel="canonical" href="https://laptoponrent.online/booking/" />
        {searchParams.toString() ? (
          <meta name="robots" content="noindex, follow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
      </Helmet>

      <div className="bg-secondary-50 py-10 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-primary-600 font-semibold tracking-wide text-sm uppercase">Quick &amp; Secure Checkout</span>
            <h1 className="text-3xl font-extrabold text-secondary-900 mt-1">Book Your Rental Laptop</h1>
            <p className="text-secondary-600 text-sm sm:text-base mt-2">
              Fill in your delivery details below to initiate your booking with STAGE-X.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden p-6 sm:p-10">
            {isSuccess ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 mb-2">Booking Initiated Successfully!</h2>
                <p className="text-secondary-600 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  Thank you, <strong>{fullName}</strong>. Your rental request for <strong>{laptopModel}</strong> has been received. Redirecting to the secure gateway for payment processing...
                </p>
                <div className="bg-secondary-50 p-4 rounded-lg text-left max-w-sm mx-auto text-xs text-secondary-700 space-y-1 mb-6 border border-secondary-200">
                  <p><strong>Device:</strong> {laptopModel}</p>
                  <p><strong>Tenure:</strong> {rentalPeriod} Month(s)</p>
                  <p><strong>Total Payable:</strong> ₹{totalPayableNow.toLocaleString('en-IN')}</p>
                  <p><strong>Destination:</strong> {city} ({pincode})</p>
                </div>
                <Link
                  to="/"
                  className="inline-flex px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-2 mb-4">
                    1. Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.fullName ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Mobile Number (+91) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.mobile ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Company Name (Optional for Business)
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="Company / Enterprise Name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-secondary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-2 mb-4">
                    2. Delivery Location
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Address (House, Street, Area) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Flat / Building, Street, Landmark"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.address ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="6-digit PIN"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.pincode ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-secondary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        {CITIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-secondary-900 border-b border-secondary-100 pb-2 mb-4">
                    3. Device &amp; Rental Plan Selection
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Laptop Model <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={laptopModel}
                        onChange={e => setLaptopModel(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-secondary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        {MOCK_PRODUCTS.map(p => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.brand}) — ₹{p.pricing.monthly}/mo
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Rental Period <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={rentalPeriod}
                        onChange={e => setRentalPeriod(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-secondary-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
                      >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-secondary-700 uppercase mb-1">
                        Preferred Delivery Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        min={minDateStr}
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                          errors.deliveryDate ? 'border-red-400 focus:ring-red-200' : 'border-secondary-300 focus:ring-primary-100'
                        }`}
                      />
                      {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
                    </div>
                  </div>
                </div>

                {/* Terms and Policy agreement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-secondary-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={e => setTermsAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>
                      I agree to the <Link to="/terms" target="_blank" className="text-primary-600 underline">Terms &amp; Conditions</Link> and <Link to="/cancellation-refund-policy" target="_blank" className="text-primary-600 underline">Refund Policy</Link>. I understand that security deposits are refunded within 7 working days of device return. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.termsAgreed && <p className="text-red-500 text-xs mt-1">{errors.termsAgreed}</p>}
                </div>

                {/* Order Summary Box */}
                <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-5">
                  <h4 className="font-bold text-secondary-900 text-sm mb-3">Order Summary</h4>
                  <div className="space-y-2 text-xs text-secondary-700">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span className="font-medium text-secondary-900">{selectedProduct?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Rent:</span>
                      <span className="font-medium text-secondary-900">₹{monthlyRent.toLocaleString('en-IN')} × {rentalPeriod} month(s) = ₹{totalRentForPeriod.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Security Deposit:</span>
                      <span className="font-medium text-emerald-700">₹{deposit.toLocaleString('en-IN')} (100% Refundable)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doorstep Delivery &amp; Maintenance:</span>
                      <span className="font-medium text-emerald-700">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes &amp; GST:</span>
                      <span className="font-medium text-secondary-900">₹0 (No GST added)</span>
                    </div>
                    <div className="border-t border-secondary-200 pt-2 flex justify-between text-sm font-bold text-secondary-900">
                      <span>Total Payable Now:</span>
                      <span className="text-primary-600">₹{totalPayableNow.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Wording above Pay button */}
                <p className="text-xs text-secondary-500 text-center leading-relaxed">
                  You are paying STAGE-X (laptoponrent.online). Rent and the refundable security deposit are shown above. Your laptop will be delivered by a rental partner in your city.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-bold text-base shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Opening Payment Gateway...' : `Pay Now (₹${totalPayableNow.toLocaleString('en-IN')})`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Booking;
