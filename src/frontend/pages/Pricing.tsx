import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MOCK_PRODUCTS } from '../data/products';
import { Laptop, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export function Pricing() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const brands = ['All', 'Apple', 'HP', 'Dell', 'Lenovo', 'ASUS', 'Samsung'];
  
  const filteredProducts = selectedBrand === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  return (
    <>
      <Helmet>
        <title>Product &amp; Pricing | Laptop Rentals &amp; Security Deposits | LaptopRent</title>
        <meta
          name="description"
          content="Explore transparent laptop rental pricing and refundable security deposits. Rent laptops from ₹799/month across India. Final prices with no GST added."
        />
        <link rel="canonical" href="https://laptoponrent.online/pricing" />
      </Helmet>

      <div className="bg-secondary-50 py-10 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary-600 font-semibold tracking-wide text-sm uppercase">Transparent Rates</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary-900 mt-2 mb-4">
              Product &amp; Pricing Schedule
            </h1>
            <p className="text-secondary-600 text-base sm:text-lg">
              Affordable monthly rentals with clear, 100% refundable security deposits. All prices are final &ndash; no hidden charges or GST added.
            </p>
          </div>

          {/* Pricing Highlight Notice */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg mb-8 shadow-sm">
            <div className="flex items-start">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0 mr-3" />
              <div>
                <h4 className="text-emerald-900 font-bold text-base">Payment &amp; Deposit Transparency Guarantee</h4>
                <p className="text-emerald-800 text-sm mt-1 leading-relaxed">
                  <strong>Rent and deposit are the final amount payable &ndash; no GST is added.</strong> The refundable security deposit is refunded in full within <strong>7 working days</strong> of laptop return, post physical inspection.
                </p>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedBrand === brand
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-secondary-700 hover:bg-secondary-100 border border-secondary-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Pricing Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-secondary-900 text-white text-sm">
                    <th className="py-4 px-6 font-semibold">Laptop Model &amp; Specs</th>
                    <th className="py-4 px-6 font-semibold">Brand</th>
                    <th className="py-4 px-6 font-semibold">Monthly Rent (₹)</th>
                    <th className="py-4 px-6 font-semibold">Refundable Deposit (₹)</th>
                    <th className="py-4 px-6 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100 text-sm text-secondary-800">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-secondary-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-secondary-900">{product.name}</div>
                        <div className="text-xs text-secondary-500 mt-0.5">
                          {product.specifications.slice(0, 3).map(s => s.value).join(' • ')}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700">
                          {product.brand}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-primary-600">
                        ₹{product.pricing.monthly.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-secondary-500">/ mo</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-secondary-900">
                        ₹{product.pricing.deposit.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-emerald-600 font-medium">(Refundable)</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link
                          to={`/booking?model=${encodeURIComponent(product.name)}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs shadow-sm transition-all"
                        >
                          Book Now <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-secondary-50 border-t border-secondary-200 text-xs text-secondary-600">
              * Showing {filteredProducts.length} certified laptop configurations. Free doorstep delivery and maintenance included in all service cities.
            </div>
          </div>

          {/* Pricing FAQ Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-600" /> Frequently Asked Questions on Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-secondary-900 mb-1">Is there any GST added on top of the prices?</h4>
                <p className="text-secondary-600 leading-relaxed">
                  No. Rent and refundable deposit are the final amount payable &ndash; no GST is added. STAGE-X is a sole proprietorship operating under applicable exemption thresholds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 mb-1">When is my security deposit refunded?</h4>
                <p className="text-secondary-600 leading-relaxed">
                  Your deposit is credited back to your original payment method within 7 working days following device return and physical inspection.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 mb-1">Are delivery and pickup charged extra?</h4>
                <p className="text-secondary-600 leading-relaxed">
                  No. Doorstep delivery, setup, and end-of-term return pickup are completely free across all our operational partner cities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-secondary-900 mb-1">What if the laptop encounters a technical issue?</h4>
                <p className="text-secondary-600 leading-relaxed">
                  All routine hardware maintenance and technical troubleshooting are covered at zero cost by our local partner rental team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pricing;
