import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SEOHead, generateCityBreadcrumbs } from '../../components/seo/SEOHead';
import { CITY_META, INDIAN_CITIES, FAQ_QUESTIONS, LAPTOP_CATEGORIES } from '../../data/seo-data';
import { generateCityPageSchema, generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from '../../lib/seo/structured-data';

interface CityPageProps {
  citySlug: string;
}

export function CityPage({ citySlug }: CityPageProps) {
  const city = CITY_META[citySlug as keyof typeof CITY_META];
  const cityInfo = INDIAN_CITIES.find(c => c.slug === citySlug);

  if (!city || !cityInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">City Not Found</h1>
          <p className="text-gray-600 mb-6">We don't currently serve {citySlug}.</p>
          <Link to="/cities" className="text-blue-600 hover:text-blue-800 font-medium">
            View All Cities We Serve
          </Link>
        </div>
      </div>
    );
  }

  const schemas = [
    generateCityPageSchema(citySlug),
    generateLocalBusinessSchema(citySlug),
    generateBreadcrumbSchema(generateCityBreadcrumbs(citySlug)),
    generateFAQSchema(FAQ_QUESTIONS.slice(0, 5)),
  ];

  const structuredData = JSON.stringify(schemas, null, 2);

  return (
    <>
      <Helmet>
        <title>Laptop Rental in {city.name} | Starting {city.priceStart} | LaptopRent</title>
        <meta name="description" content={city.description} />
        <meta name="keywords" content={city.keywords.join(', ')} />
        <link rel="canonical" href={`https://laptoponrent.online/rental/${citySlug}`} />
        <meta property="og:title" content={`Laptop Rental in ${city.name} | Starting ${city.priceStart} | LaptopRent`} />
        <meta property="og:description" content={city.description} />
        <meta property="og:url" content={`https://laptoponrent.online/rental/${citySlug}`} />
        <meta property="og:image" content="https://laptoponrent.online/assets/og-city-{citySlug}.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Laptop Rental in ${city.name} | Starting ${city.priceStart}`} />
        <meta name="twitter:description" content={city.description} />
        <meta name="twitter:image" content={`https://laptoponrent.online/assets/og-city-${citySlug}.jpg`} />
        <link rel="canonical" href={`https://laptoponrent.online/rental/${citySlug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `Laptop Rental in ${city.name}`,
            "description": city.description,
            "provider": {
              "@type": "Organization",
              "name": "LaptopRent",
              "url": "https://laptoponrent.online"
            },
            "areaServed": {
              "@type": "City",
              "name": city.name,
              "containedInPlace": {
                "@type": "State",
                "name": city.keywords[0].split(' ')[2] || 'India'
              }
            },
            "serviceType": "Laptop Rental",
            "offers": {
              "@type": "Offer",
              "name": `Laptop Rental in ${city.name}`,
              "priceCurrency": "INR",
              "price": city.priceStart.replace(/[₹,]/g, ''),
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceCurrency": "INR",
                "price": parseInt(city.priceStart.replace(/[₹,/mo]/g, '')),
                "unitText": "month"
              },
              "availability": "https://schema.org/InStock"
            }
          }
        ], null, 2) }} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Breadcrumbs */}
              <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-gray-500">
                  <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                  <li className="text-gray-300">/</li>
                  <li><Link to="/cities" className="hover:text-blue-600">Cities</Link></li>
                  <li className="text-gray-300">/</li>
                  <li className="text-gray-900 font-medium" aria-current="page">{city.name}</li>
                </ol>
              </nav>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Laptop Rental in <span className="text-blue-600">{city.name}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {city.description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Same-day delivery in {city.name}
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  18% GST Invoice
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Flexible monthly plans
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/laptops?city=${citySlug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  View Laptops in {city.name}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="absolute bottom-0 left-0 right-0 -mb-6 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-gray-600 mt-1">Cities Served</div>
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
                  <div className="text-gray-600 mt-1">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-16 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Areas We Serve in {city.name}</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Same-day delivery across all major areas. Orders before 2 PM delivered same day.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {city.areas.map((area) => (
                <Link
                  key={area}
                  to={`/laptops?city=${citySlug}&area=${encodeURIComponent(area)}`}
                  className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg px-4 py-3 text-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Popular Laptop Categories in {city.name}</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Choose from our wide range of laptops tailored for your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LAPTOP_CATEGORIES.slice(0, 8).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}?city=${citySlug}`}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-1H3.25zM17.5 13H7v6a2 2 0 01-2 2h10a2 2 0 002-2v-2a2 2 0 00-2-2H7a2 2 0 01-2-2V9a2 2 0 012-2h5l3-3h2a2 2 0 012 2v6z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                    <div className="text-blue-600 font-semibold">{cat.priceRange}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/categories" className="text-blue-600 hover:text-blue-800 font-medium">
                View All Categories →
              </Link>
            </div>
          </div>
        </section>

        {/* Corporate/Bulk Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Bulk Laptops for Your Team in {city.name}?</h2>
                <p className="text-blue-100 text-lg mb-8">
                  Get volume discounts, free delivery, dedicated account manager, and customized configurations for your team.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Volume discounts at 10, 50, 100, 250+ units',
                    'Free delivery & pickup for 10+ units',
                    'Dedicated account manager',
                    'Custom software pre-installation',
                    'Onsite support & asset tagging',
                    'Flexible terms: 1-36 months',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-blue-50">
                      <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/corporate-rental"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
                >
                  Get Corporate Quote
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_QUESTIONS.slice(0, 6).map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Rent a Laptop in {city.name}?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Get your laptop delivered same day. Choose from 50+ models with flexible monthly plans.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={`/laptops?city=${citySlug}`}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
              >
                Browse Laptops
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Footer SEO Content */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose LaptopRent in {city.name}?</h3>
            <div className="prose prose-gray max-w-none">
              <p>LaptopRent is the trusted laptop rental partner for startups, enterprises, students, and event organizers in {city.name}. With our local warehouse in {city.name}, we guarantee same-day delivery and onsite support.</p>
              <h4 className="font-semibold mt-6 mb-3">Our {city.name} Service Advantages:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Same-day delivery</strong> in {city.areas.slice(0, 3).join(', ')} and surrounding areas</li>
                <li><strong>Verified devices</strong> - All laptops undergo 25-point quality check before delivery</li>
                <li><strong>18% GST invoices</strong> - Full input tax credit for registered businesses</li>
                <li><strong>Flexible terms</strong> - Daily, weekly, monthly, or yearly rental plans</li>
                <li><strong>Onsite support</strong> - Hardware replacement within 4 hours in {city.name}</li>
                <li><strong>Zero hidden charges</strong> - Transparent pricing with no surprise fees</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-3">Popular Use Cases in {city.name}:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Startup employee onboarding (5-50 laptops)</li>
                <li>Corporate training programs & certifications</li>
                <li>Event registrations & conferences</li>
                <li>Student semester rentals (3-6 months)</li>
                <li>Gaming tournaments & LAN parties</li>
                <li>Remote work & project-based contracts</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CityPage;