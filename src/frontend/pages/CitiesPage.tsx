import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { INDIAN_CITIES, CITY_META } from '../../data/seo-data';

export function CitiesPage() {
  const tier1Cities = INDIAN_CITIES.filter(c => c.tier === 1);
  const tier2Cities = INDIAN_CITIES.filter(c => c.tier === 2);
  const tier3Cities = INDIAN_CITIES.filter(c => c.tier === 3);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Cities We Serve - Laptop Rental India",
      "description": "Laptop rental services available across 25+ major Indian cities with same-day delivery",
      "itemListElement": INDIAN_CITIES.map((city, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": `Laptop Rental in ${city.name}`,
          "url": `https://laptoponrent.online/rental/${city.slug}`,
          "description": `Laptop rental services in ${city.name}, ${city.state}. ${CITY_META[city.slug]?.description || ''}`,
          "areaServed": city.name,
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cities We Serve - Laptop Rental India",
      "description": "Find laptop rental services in your city. 25+ major Indian cities covered with same-day delivery.",
      "url": "https://laptoponrent.online/cities",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://laptoponrent.online/" },
          { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://laptoponrent.online/cities" }
        ]
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Cities We Serve - Laptop Rental Across India | LaptopRent</title>
        <meta name="description" content="Laptop rental services across 25+ major Indian cities. Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, and more. Same-day delivery, 18% GST invoice." />
        <meta name="keywords" content="laptop rental cities, laptop rental bangalore, laptop rental mumbai, laptop rental delhi, laptop rental hyderabad, laptop rental chennai, laptop rental pune" />
        <link rel="canonical" href="https://laptoponrent.online/cities" />
        <meta property="og:title" content="Cities We Serve - Laptop Rental Across India | LaptopRent" />
        <meta property="og:description" content="Find laptop rental services in your city. 25+ major Indian cities with same-day delivery and 18% GST invoices." />
        <meta property="og:image" content="https://laptoponrent.online/assets/og-cities.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas, null, 2) }} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Cities We Serve Across <span className="text-blue-600">India</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                25+ major cities with same-day delivery. From Bangalore to Delhi, Mumbai to Chennai - we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/laptops" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
                  Browse All Laptops
                </Link>
                <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg">
                  Get Quote for Your City
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600 mt-1">Cities Covered</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600 mt-1">Devices</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600 mt-1">Corporate Clients</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                <div className="text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tier 1 Cities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Major Metro Cities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Same-day delivery in all major tech hubs and business centers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tier1Cities.map((cityInfo) => {
                const city = CITY_META[cityInfo.slug];
                return (
                  <Link
                    key={cityInfo.slug}
                    to={`/rental/${cityInfo.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cityInfo.name}</h3>
                        <p className="text-sm text-gray-500">{cityInfo.state}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{CITY_META[cityInfo.slug]?.description?.slice(0, 100)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-semibold">{CITY_META[cityInfo.slug]?.priceStart || 'From ₹849/mo'}</span>
                      <span className="text-blue-600 font-medium group-hover:underline">View Laptops →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tier 2 Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Major Cities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Expanding coverage with next-day delivery</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier2Cities.map((cityInfo) => {
                const city = CITY_META[cityInfo.slug];
                return (
                  <Link
                    key={cityInfo.slug}
                    to={`/rental/${cityInfo.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{cityInfo.name}</h3>
                        <p className="text-xs text-gray-500">{cityInfo.state}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{CITY_META[cityInfo.slug]?.priceStart || 'From ₹899/mo'}</p>
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:underline">
                      View Laptops
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tier 3 / Emerging Cities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Emerging Cities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Next-day delivery available</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier3Cities.map((cityInfo) => (
                <Link
                  key={cityInfo.slug}
                  to={`/rental/${cityInfo.slug}`}
                  className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all p-4 text-center"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{cityInfo.name}</h3>
                  <p className="text-xs text-gray-500">{cityInfo.state}</p>
                  <span className="text-xs text-blue-600 group-hover:underline">View →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't See Your City?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              We're expanding rapidly. Request service in your city and we'll prioritize it.
            </p>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg">
              Request Your City
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default CitiesPage;