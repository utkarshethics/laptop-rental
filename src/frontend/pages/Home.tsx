import { Link } from 'react-router-dom';
import { Laptop, Monitor, Tablet, Cpu, Truck, Shield, Star, RotateCcw, CreditCard, Users, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, ProductCard } from '@/components/ui/Card';
import { formatCurrency, cn } from '@/lib/utils';

const CATEGORIES = [
  { icon: Laptop, label: 'Laptops', count: '500+', href: '/products?category=laptop', color: 'bg-blue-100 text-blue-600', iconColor: 'text-blue-600' },
  { icon: Cpu, label: 'Rent on EMI', count: 'Flexible', href: '/products', color: 'bg-green-100 text-green-600', iconColor: 'text-green-600' },
  { icon: Monitor, label: 'Business Plans', count: 'Custom', href: '/products', color: 'bg-purple-100 text-purple-600', iconColor: 'text-purple-600' },
  { icon: Tablet, label: 'Gaming Laptops', count: '10+', href: '/products?category=laptop&tag=gaming', color: 'bg-orange-100 text-orange-600', iconColor: 'text-orange-600' },
];

const BRANDS = [
  { name: 'HP', count: '150+', logo: 'HP' },
  { name: 'Dell', count: '120+', logo: 'Dell' },
  { name: 'Lenovo', count: '100+', logo: 'Lenovo' },
  { name: 'Apple', count: '80+', logo: 'Apple' },
  { name: 'ASUS', count: '60+', logo: 'ASUS' },
  { name: 'Acer', count: '50+', logo: 'Acer' },
];

const FEATURES = [
  { icon: Truck, title: 'Free Doorstep Delivery', desc: 'Get your laptop delivered & picked up for free', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: Shield, title: 'Damage Protection', desc: 'Comprehensive coverage on all rentals', color: 'text-green-600', bgColor: 'bg-green-50' },
  { icon: RotateCcw, title: 'Flexible Plans', desc: 'Daily, weekly, monthly & yearly options', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { icon: CreditCard, title: 'No Cost EMI', desc: 'Pay in easy installments with 0% interest', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { icon: Sparkles, title: 'Latest Models', desc: 'Always get the newest laptops from top brands', color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { icon: Award, title: 'Quality Assured', desc: 'Every device certified & tested before delivery', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
];

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Software Engineer', company: 'TechCorp', content: 'Rented a MacBook Pro for 3 months. Delivery was next day, laptop was in pristine condition. Saved me ₹80,000 vs buying!', rating: 5, avatar: 'RS' },
  { name: 'Priya Patel', role: 'Student', company: 'IIT Bombay', content: 'Perfect for my semester project. The student discount made it very affordable. Support team was very responsive.', rating: 5, avatar: 'PP' },
  { name: 'Amit Kumar', role: 'Startup Founder', company: 'InnovateLabs', content: 'We rented 15 laptops for our team. Bulk discount + flexible terms helped us scale without capex. Highly recommended!', rating: 5, avatar: 'AK' },
];

const STATS = [
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Devices Rented', value: '5,000+' },
  { label: 'Cities Covered', value: '25+' },
  { label: 'Corporate Clients', value: '500+' },
];

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'HP EliteBook 840 G9',
    brand: 'HP',
    category: 'laptop',
    images: [{ url: '/assets/products/hp/elitebook-840-g9/hero.jpg', alt: 'HP EliteBook 840 G9', isPrimary: true }],
    pricing: { monthly: 1199 },
    rating: 4.8,
    reviewCount: 124,
    availability: { inStock: 15, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'] },
    featured: true,
  },
  {
    id: '2',
    name: 'Dell Latitude 5430',
    brand: 'Dell',
    category: 'laptop',
    images: [{ url: '/assets/products/dell/latitude-5430/hero.jpg', alt: 'Dell Latitude 5430', isPrimary: true }],
    pricing: { monthly: 1099 },
    rating: 4.7,
    reviewCount: 98,
    availability: { inStock: 22, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Pune'] },
    featured: true,
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    brand: 'Apple',
    category: 'laptop',
    images: [{ url: '/assets/products/apple/macbook-air-m2/hero.jpg', alt: 'MacBook Air M2', isPrimary: true }],
    pricing: { monthly: 1299 },
    rating: 4.9,
    reviewCount: 210,
    availability: { inStock: 8, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    featured: true,
  },
  {
    id: '4',
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'laptop',
    images: [{ url: '/assets/products/lenovo/thinkpad-x1-carbon/hero.jpg', alt: 'ThinkPad X1 Carbon', isPrimary: true }],
    pricing: { monthly: 1249 },
    rating: 4.8,
    reviewCount: 156,
    availability: { inStock: 12, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'] },
    featured: true,
  },
];

export function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white pt-20 pb-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              New: Student Special - 20% Off on Monthly Plans
            </div>
            <h1 className="text-display-lg font-bold text-secondary-900 mb-6 text-balance animate-slide-up">
              Rent Premium Laptops Without the Premium Price
            </h1>
            <p className="text-body-lg text-secondary-600 mb-10 max-w-2xl mx-auto animate-slide-up">
              Access the latest HP, Dell, Lenovo, MacBook, ASUS & Acer laptops. Flexible plans from 1 day to 1 year. Free doorstep delivery across India.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up">
              <Link to="/products" className="btn-primary btn-lg">
                Browse Laptops
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products?category=laptop&tag=student" className="btn-outline btn-lg">
                Student Offers
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-secondary-200 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-display-md font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-body text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50" />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Category</h2>
            <p className="section-subtitle">Find the perfect device for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.label}
                to={category.href}
                className="card-hover p-6 flex flex-col items-center text-center group"
              >
                <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors', category.color)}>
                  <category.icon className={cn('w-8 h-8', category.iconColor)} />
                </div>
                <h3 className="text-heading-sm font-semibold text-secondary-900 mb-1">{category.label}</h3>
                <p className="text-body-sm text-secondary-500">{category.count} models available</p>
                <ArrowRight className="w-5 h-5 text-secondary-400 group-hover:text-primary-600 transition-colors mt-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-secondary-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top Brands Available</h2>
            <p className="section-subtitle">Rent from the world's leading laptop manufacturers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BRANDS.map((brand, index) => (
              <Link
                key={brand.name}
                to={`/products?brand=${brand.name}`}
                className="card-hover p-6 text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center border border-secondary-200 group-hover:border-primary-300 transition-colors">
                  <span className="font-bold text-heading-md text-secondary-900">{brand.logo}</span>
                </div>
                <h3 className="font-semibold text-secondary-900">{brand.name}</h3>
                <p className="text-body-sm text-secondary-500">{brand.count} models</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-title">Featured Laptops</h2>
              <p className="section-subtitle">Our most popular picks this month</p>
            </div>
            <Link to="/products" className="btn-outline mt-4 md:mt-0">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-secondary-900 text-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-white">Why Choose LaptopRent?</h2>
            <p className="section-subtitle text-secondary-300">Everything you need for a worry-free rental experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-secondary-800/50 border border-secondary-700 group">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', feature.bgColor)}>
                  <feature.icon className={cn('w-6 h-6', feature.color)} />
                </div>
                <h3 className="text-heading-sm font-semibold mb-2">{feature.title}</h3>
                <p className="text-body text-secondary-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by Thousands</h2>
            <p className="section-subtitle">What our customers say about us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={testimonial.name} padding="lg" className="h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-warning-500 text-warning-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body text-secondary-600 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{testimonial.name}</p>
                    <p className="text-body-sm text-secondary-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-display-sm font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-body-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join 10,000+ satisfied customers. Rent your first laptop today and experience the freedom of flexible computing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-lg bg-white text-primary-600 hover:bg-primary-50 px-8 py-3.5">
              Start Renting Free
            </Link>
            <Link to="/contact" className="btn-lg border-2 border-white text-white hover:bg-primary-700 px-8 py-3.5">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}