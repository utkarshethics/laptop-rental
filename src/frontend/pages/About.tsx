import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Laptop, ShieldCheck, Truck, Clock, Award, Building, Mail, Phone } from 'lucide-react';

export function About() {
  return (
    <>
      <Helmet>
        <title>About LaptopRent | Premium Laptop Rentals by STAGE-X</title>
        <meta
          name="description"
          content="Learn about LaptopRent, India's trusted laptop rental service operating across 25+ cities. LaptopRent is a brand of STAGE-X, based in Bengaluru."
        />
        <link rel="canonical" href="https://laptoponrent.online/about" />
      </Helmet>

      <div className="bg-secondary-50 py-12 md:py-16 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">About Us</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary-900 tracking-tight mb-4">
              Making Premium Technology Accessible to Everyone
            </h1>
            <p className="text-lg text-secondary-600 leading-relaxed">
              LaptopRent provides flexible, on-demand laptop and IT workstation rentals for students, professionals, startups, and growing enterprises across 25+ Indian cities.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Legal Ownership Box */}
          <div className="bg-primary-50/70 border-l-4 border-primary-600 p-6 md:p-8 rounded-r-xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary-700 font-semibold text-lg">
              <Building className="w-5 h-5" />
              <span>Legal Entity &amp; Ownership</span>
            </div>
            <p className="text-secondary-800 text-sm md:text-base leading-relaxed">
              <strong>LaptopRent</strong> (accessible via <code>laptoponrent.online</code>) is an on-demand technology rental brand owned and operated by <strong>STAGE-X</strong>, a registered sole proprietorship based in Bengaluru, Karnataka, India.
            </p>
            <div className="pt-2 text-sm text-secondary-700 space-y-1 border-t border-primary-200/60">
              <p><strong>Registered Office:</strong> 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India</p>
              <p><strong>Official Contact:</strong> <a href="mailto:connect@laptoponrent.online" className="text-primary-700 underline font-medium">connect@laptoponrent.online</a> &middot; Telephone/WhatsApp: <strong>+91 78922 40243</strong></p>
              <p><strong>Operating Hours:</strong> Every day, 6:00 AM &ndash; 7:00 PM IST</p>
              <p><strong>Payment Processing:</strong> All payments on this platform are processed by STAGE-X via UPI.</p>
            </div>
          </div>

          {/* Our Story */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900">Our Story &amp; Mission</h2>
            <p className="text-secondary-600 leading-relaxed">
              High upfront capital expenses shouldn't stop anyone from building software, designing media, studying, or scaling a business. We started LaptopRent to eliminate heavy capital lock-ins by offering enterprise-grade laptops on flexible month-to-month leases with zero maintenance anxiety.
            </p>
            <p className="text-secondary-600 leading-relaxed">
              From Apple MacBook Pro (M1/M2/M3) chips and Dell XPS workstations to Lenovo ThinkPads and high-FPS gaming rigs, every single unit is tested, sanitized, upgraded with high-speed SSDs, and delivered to your doorstep within hours.
            </p>
          </section>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="p-5 rounded-xl border border-secondary-200 bg-white shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-secondary-900">Doorstep Delivery</h3>
              <p className="text-sm text-secondary-600">Same-day delivery across 25+ cities with verified rider handover.</p>
            </div>

            <div className="p-5 rounded-xl border border-secondary-200 bg-white shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-secondary-900">Hardware Warranty</h3>
              <p className="text-sm text-secondary-600">Free on-site replacement and repair for any hardware defect.</p>
            </div>

            <div className="p-5 rounded-xl border border-secondary-200 bg-white shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-secondary-900">Transparent Pricing</h3>
              <p className="text-sm text-secondary-600">Final prices with zero hidden fees and 100% refundable security deposits.</p>
            </div>

            <div className="p-5 rounded-xl border border-secondary-200 bg-white shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-secondary-900">Flexible Leases</h3>
              <p className="text-sm text-secondary-600">Rent for 1 month, 3 months, or 12+ months. Extend or return anytime.</p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-secondary-900 text-white rounded-2xl p-8 md:p-12 text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to rent your next device?</h2>
            <p className="text-secondary-400 max-w-xl mx-auto text-sm md:text-base">
              Explore our full catalog of MacBooks, business laptops, and gaming machines with doorstep delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link to="/products" className="btn-primary px-6 py-3">Browse Laptops</Link>
              <Link to="/contact" className="btn-secondary px-6 py-3 bg-secondary-800 text-white hover:bg-secondary-700">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
