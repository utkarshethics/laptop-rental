import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin, Truck, Shield, RotateCcw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { formatCurrency, cn } from '@/lib/utils';
import { openTokenBooking } from '@/lib/tokenBooking';
import { Product, RentalPeriod, RENTAL_PERIODS } from '@/types';
import { MOCK_PRODUCTS } from './Products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<RentalPeriod>('monthly');
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];

  useEffect(() => {
    if (id) {
      const found = MOCK_PRODUCTS.find(p => p.id === id);
      setProduct(found || null);
      setLoading(false);
      if (found) {
        const primaryIndex = found.images.findIndex(img => img.isPrimary);
        setSelectedImage(primaryIndex >= 0 ? primaryIndex : 0);
      }
    }
  }, [id]);

  useEffect(() => {
    if (product && selectedRentalPeriod) {
      const days = RENTAL_PERIODS.find(p => p.value === selectedRentalPeriod)?.days || 30;
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + days);
      setEndDate(end.toISOString().split('T')[0]);
    }
  }, [product, selectedRentalPeriod, startDate]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (product.availability.inStock < quantity) {
      toast.error('Not enough stock available');
      return;
    }
    addItem(product, selectedRentalPeriod, startDate, endDate, selectedCity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
    openTokenBooking({
      id: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: primaryImage?.url,
      monthlyPrice: product.pricing.monthly,
      city: selectedCity,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-lg font-bold text-secondary-900 mb-2">Product Not Found</h1>
          <p className="text-secondary-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const currentPrice = product.pricing[selectedRentalPeriod];
  const discount = RENTAL_PERIODS.find(p => p.value === selectedRentalPeriod)?.discount || 0;
  const originalPrice = currentPrice / (1 - discount / 100);
  const savings = originalPrice - currentPrice;
  const selectedPeriod = RENTAL_PERIODS.find(p => p.value === selectedRentalPeriod);
  const monthlyBaseline = selectedPeriod && selectedRentalPeriod !== 'monthly'
    ? product.pricing.monthly * (selectedPeriod.days / 30)
    : 0;
  const vsMonthly = monthlyBaseline > currentPrice ? monthlyBaseline - currentPrice : 0;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-secondary-50 border-b border-secondary-200" aria-label="Breadcrumb">
        <div className="container py-3">
          <ol className="flex items-center gap-2 text-sm text-secondary-500">
            <li><Link to="/" className="hover:text-secondary-700">Home</Link></li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><Link to="/products" className="hover:text-secondary-700">Products</Link></li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4" /><span className="text-secondary-900 font-medium truncate max-w-[200px]">{product.name}</span></li>
          </ol>
        </div>
      </nav>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary-50">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setImageModalOpen(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary-400">
                  <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
              )}
              {product.featured && (
                <span className="absolute top-4 left-4 badge bg-primary-600 text-white">Featured</span>
              )}
              {product.availability.inStock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="badge bg-error-500 text-white text-sm px-3 py-1">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2" role="listbox" aria-label="Product images">
              {product.images.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                    selectedImage === index ? 'border-primary-500' : 'border-transparent hover:border-secondary-300'
                  )}
                  role="option"
                  aria-selected={selectedImage === index}
                >
                  <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <Modal
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
            size="full"
            showCloseButton={true}
          >
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black">
              <img
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                    selectedImage === index ? 'border-primary-500' : 'border-transparent hover:border-white/30'
                  )}
                >
                  <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Modal>
        </div>

        <div className="lg:col-span-2 lg:col-start-2 space-y-6">
          <div>
            <p className="text-body-sm text-secondary-500 font-medium uppercase tracking-wide mb-1">{product.brand}</p>
            <h1 className="text-display-sm font-bold text-secondary-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-warning-500 text-warning-500" />
                <span className="font-semibold text-secondary-900">{product.rating.toFixed(1)}</span>
                <span className="text-secondary-500">({product.reviewCount} reviews)</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-secondary-500">
                <CheckCircle className="w-4 h-4 text-success-500" />
                In Stock: {product.availability.inStock}
              </span>
            </div>
          </div>

          <div className="bg-secondary-50 rounded-2xl p-6">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-display-md font-bold text-primary-600">
                {formatCurrency(currentPrice)}<span className="text-body font-normal text-secondary-500">/{selectedRentalPeriod === 'quarterly' ? 'quarter' : selectedRentalPeriod === 'yearly' ? 'year' : 'month'}</span>
              </span>
              {discount > 0 && (
                <>
                  <span className="text-body text-secondary-400 line-through">{formatCurrency(Math.round(originalPrice))}</span>
                  <span className="badge badge-success">{discount}% OFF</span>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
              {RENTAL_PERIODS.map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedRentalPeriod(period.value)}
                  className={cn(
                    'py-2 px-3 rounded-lg text-sm font-medium transition-all text-center',
                    selectedRentalPeriod === period.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-700 hover:bg-secondary-50 border border-secondary-200'
                  )}
                >
                  <div className="font-semibold">{period.label}</div>
                  <div className="text-xs opacity-80">
                    {formatCurrency(product.pricing[period.value])}/{period.value === 'quarterly' ? 'quarter' : period.value === 'yearly' ? 'year' : 'mo'}
                  </div>
                  {period.discount > 0 && <span className="text-xs text-green-600">Save {period.discount}%</span>}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-secondary-200">
              <p className="text-body-sm text-secondary-600">
                <span className="font-medium">Deposit:</span> {formatCurrency(product.pricing.deposit)} (refundable)
              </p>
              {vsMonthly > 0 && (
                <p className="text-body-sm text-success-600 mt-1">You save {formatCurrency(Math.round(vsMonthly))} vs monthly rate!</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-secondary-200 rounded-2xl p-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Rental Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="max-w-xs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Rental End Date (Auto-calculated)</label>
                <Input
                  type="date"
                  value={endDate}
                  readOnly
                  className="max-w-xs bg-secondary-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Delivery City</label>
              <Dropdown
                options={CITIES.map(city => ({ value: city, label: city }))}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Select city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3 max-w-xs">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                </Button>
                <span className="text-heading-sm font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.min(product.availability.inStock, q + 1))} aria-label="Increase quantity" disabled={quantity >= product.availability.inStock}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </Button>
                <span className="text-body-sm text-secondary-500">Max: {product.availability.inStock}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-secondary-200">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.availability.inStock === 0}
                rightIcon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={product.availability.inStock === 0}
              >
                Rent Now
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-body-sm text-secondary-600">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Free Delivery</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Damage Protection</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> Easy Returns</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {selectedCity}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'Doorstep delivery & pickup across India' },
              { icon: Shield, title: 'Damage Protection', desc: 'Comprehensive coverage included' },
              { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free return & exchange' },
            ].map((item, index) => (
              <Card key={index} padding="md" className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-secondary-900 mb-1">{item.title}</h4>
                <p className="text-body-sm text-secondary-500">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary-50 py-16">
        <div className="container">
          <h2 className="text-heading-lg font-bold text-center text-secondary-900 mb-12">Specifications</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-secondary-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {product.specifications.map((spec, index) => (
                  <div key={spec.key} className={cn('p-4 border-b border-secondary-100 last:border-b-0 md:border-r md:last:border-r-0', index % 2 === 1 && 'bg-secondary-50/50')}>
                    <dt className="text-body-sm text-secondary-500 mb-1">{spec.key}</dt>
                    <dd className="font-medium text-secondary-900">{spec.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container">
          <h2 className="text-heading-lg font-bold text-center text-secondary-900 mb-12">What's Included</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'Laptop with charger & accessories',
              'Laptop bag / sleeve',
              'Damage protection coverage',
              'Free doorstep delivery & pickup',
              '24/7 customer support',
              'Easy return & exchange',
              'No cost EMI available',
              'GST invoice for business',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-secondary-200">
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                <span className="text-body text-secondary-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Sign In Required"
        description="Please sign in to add items to your cart or proceed to checkout."
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-secondary-600">You need to be logged in to rent this laptop.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => { setShowLoginModal(false); window.location.href = '/login'; }}>Sign In</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}