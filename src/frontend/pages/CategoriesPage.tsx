import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LAPTOP_CATEGORIES } from '../../data/seo-data';

export function CategoriesPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Laptop Rental Categories",
      "description": "All laptop rental categories available across India",
      "itemListElement": LAPTOP_CATEGORIES.map((cat, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": cat.name,
          "description": cat.description,
          "url": `https://laptoponrent.online/category/${cat.id}`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": cat.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceCurrency": "INR",
              "minPrice": parseInt(cat.priceRange.split(' - ')[0].replace(/[₹,]/g, '')),
              "maxPrice": parseInt(cat.priceRange.split(' - ')[1].replace(/[₹,]/g, '')),
              "unitText": "month"
            }
          }
        }
      }))
    }
  ];

  return (
    <>
      <Helmet>
        <title>Laptop Rental Categories | MacBook, Gaming, Business, Student | LaptopRent</title>
        <meta name="description" content="Explore all laptop rental categories: MacBook, Gaming, Business, Student, and more. Transparent pricing starting ₹849/mo. Same-day delivery in 25+ cities." />
        <meta name="keywords" content="laptop rental categories, macbook rental, gaming laptop rental, business laptop rental, student laptop rental, laptop categories india" />
        <link rel="canonical" href="https://laptoponrent.online/categories" />
        <meta property="og:title" content="Laptop Rental Categories | LaptopRent" />
        <meta property="og:description" content="Explore all laptop rental categories with transparent pricing. MacBook, Gaming, Business, Student rentals starting ₹849/mo." />
        <meta property="og:image" content="https://laptoponrent.online/assets/og-categories.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas, null, 2) }} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Laptop Rental <span className="text-blue-600">Categories</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Choose from our curated selection of laptops for every need. Transparent pricing, same-day delivery.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/laptops" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
                  Browse All Laptops
                </Link>
                <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg">
                  Get Custom Recommendation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect laptop for your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LAPTOP_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <svg className="w-10 h-10 text-blue-600 group-hover:text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-1H3.25zM17.5 13H7v6a2 2 0 01-2 2h10a2 2 0 002-2v-2a2 2 0 00-2-2H7a2 2 0 01-2-2V9a2 2 0 012-2h5l3-3h2a2 2 0 012 2v6z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                    <p className="text-gray-600 mb-4">{cat.description}</p>
                    <div className="text-blue-600 font-bold text-lg mb-4">{cat.priceRange}</div>
                    <span className="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                      Explore {cat.name}s
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Popular Combos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Popular Category Combinations</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Common combinations for teams and projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Startup Team Kit</h3>
                <p className="text-gray-600 mb-4">MacBook Air for founders + Business laptops for team</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• 1x MacBook Air M2 (Founder)</li>
                  <li>• 4x Business i5/16GB/512GB (Team)</li>
                  <li>• Pre-installed: Slack, Notion, VS Code</li>
                </ul>
                <Link to="/corporate-rental" className="text-blue-600 font-medium hover:underline mt-4 inline-block">Get Team Quote →</Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Event & Training Bundle</h3>
                <p className="text-gray-600 mb-4">Identical laptops for workshops, exams, training</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• 10-50 identical Windows i5/8GB/256GB</li>
                  <li>• Pre-installed exam/training software</li>
                  <li>• Onsite setup & support included</li>
                </ul>
                <Link to="/event-rental" className="text-blue-600 font-medium hover:underline mt-4 inline-block">Get Event Quote →</Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Student Semester Pack</h3>
                <p className="text-gray-600 mb-4">Affordable laptops for 3-6 month academic terms</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Budget i3/8GB/256GB from ₹849/mo</li>
                  <li>• Pre-installed: Office, Zoom, Python</li>
                  <li>• 50% off first month for students</li>
                </ul>
                <Link to="/student-rental" className="text-blue-600 font-medium hover:underline mt-4 inline-block">Student Plans →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Which Category?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Our experts can help you choose the right laptop based on your workload, budget, and duration.
            </p>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg">
              Get Free Recommendation
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default CategoriesPage;