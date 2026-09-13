import { Link } from 'react-router-dom';
import { Laptop, Truck, Shield, Star, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  products: [
    { label: 'All Laptops', href: '/products' },
    { label: 'Business Laptops', href: '/products?category=laptop&tag=business' },
    { label: 'Gaming Laptops', href: '/products?category=laptop&tag=gaming' },
    { label: 'Student Laptops', href: '/products?category=laptop&tag=student' },
    { label: 'MacBook Rentals', href: '/products?brand=Apple' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Rental Terms', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Return Policy', href: '/returns' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Order', href: '/track' },
    { label: 'Bulk Enquiry', href: '/bulk-enquiry' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
    { label: 'Affiliate Program', href: '/affiliate' },
    { label: 'Corporate Rentals', href: '/corporate' },
    { label: 'Investor Relations', href: '/investors' },
  ],
  cities: [
    { label: 'Bangalore', href: '/products?city=bangalore' },
    { label: 'Mumbai', href: '/products?city=mumbai' },
    { label: 'Delhi', href: '/products?city=delhi' },
    { label: 'Chennai', href: '/products?city=chennai' },
    { label: 'Hyderabad', href: '/products?city=hyderabad' },
    { label: 'Pune', href: '/products?city=pune' },
    { label: 'Kolkata', href: '/products?city=kolkata' },
    { label: 'Ahmedabad', href: '/products?city=ahmedabad' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const TRUST_BADGES = [
  { icon: Shield, title: 'Damage Protection', desc: 'Comprehensive coverage on all rentals' },
  { icon: Truck, title: 'Free Delivery', desc: 'Doorstep delivery & pickup' },
  { icon: Star, title: 'Quality Assured', desc: 'Certified & tested devices' },
  { icon: Laptop, title: 'Latest Models', desc: 'Newest laptops from top brands' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300" role="contentinfo">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="LaptopRent Home">
              <Laptop className="w-8 h-8 text-primary-400" />
              <span className="font-bold text-xl text-white">LaptopRent</span>
            </Link>
            <p className="text-secondary-400 text-body mb-6 max-w-xs">
              India's trusted laptop rental platform. Rent premium laptops from HP, Dell, Lenovo, Apple, ASUS & Acer with free doorstep delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-800 text-secondary-400 hover:bg-secondary-700 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.products.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.support.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Cities</h3>
            <ul className="space-y-3" role="list">
              {FOOTER_LINKS.cities.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 p-6 bg-secondary-800/50 rounded-xl border border-secondary-700">
          {TRUST_BADGES.map((badge, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-900/30 flex items-center justify-center text-primary-400">
                <badge.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-medium text-white">{badge.title}</h4>
                <p className="text-secondary-400 text-sm">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-secondary-800">
          <p className="text-secondary-500 text-sm">
            © {currentYear} LaptopRent. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-secondary-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            <a href="mailto:legal@laptoprent.in" className="hover:text-white transition-colors">Legal</a>
          </div>
          <div className="flex items-center gap-2 text-secondary-500">
            <span className="text-sm">Made with</span>
            <span className="text-error-500">♥</span>
            <span className="text-sm">in India</span>
          </div>
        </div>
      </div>

      <a
        href="#root"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-elevated opacity-0 invisible transition-all duration-300 hover:bg-primary-700 hover:scale-105 focus:opacity-100 focus:visible z-40"
        aria-label="Back to top"
      >
        <ArrowUpRight className="w-5 h-5" />
      </a>
    </footer>
  );
}