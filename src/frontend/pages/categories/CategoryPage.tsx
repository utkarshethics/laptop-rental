import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LAPTOP_CATEGORIES, CITY_META, INDIAN_CITIES, FAQ_QUESTIONS } from '../../data/seo-data';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema as genBreadcrumb } from '../../lib/seo/structured-data';

interface CategoryPageProps {
  categorySlug: string;
}

export function CategoryPage({ categorySlug }: CategoryPageProps) {
  const category = LAPTOP_CATEGORIES.find(c => c.id === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/categories" className="text-blue-600 hover:text-blue-800 font-medium">
            View All Categories
          </Link>
        </div>
      </div>
    );
  }

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": category.name,
      "description": category.description,
      "provider": {
        "@type": "Organization",
        "name": "LaptopRent",
        "url": "https://laptoponrent.online"
      },
      "areaServed": "IN",
      "serviceType": "Laptop Rental",
      "offers": {
        "@type": "Offer",
        "name": category.name,
        "description": category.description,
        "priceCurrency": "INR",
        "price": category.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "priceCurrency": "INR",
          "minPrice": parseInt(category.priceRange.split(' - ')[0].replace(/[₹,]/g, '')),
          "maxPrice": parseInt(category.priceRange.split(' - ')[1].replace(/[₹,]/g, '')),
          "unitText": "month"
        },
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://laptoponrent.online/" },
        { "@type": "ListItem", "position": 2, "name": "Categories", "item": "https://laptoponrent.online/categories" },
        { "@type": "ListItem", "position": 3, "name": category.name, "item": `https://laptoponrent.online/category/${categorySlug}` }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>{category.name} in India | Starting {category.priceRange} | LaptopRent</title>
        <meta name="description" content={`${category.description}. Rent ${category.name.toLowerCase()} across India starting ${category.priceRange}. Same-day delivery in 25+ cities. 18% GST invoice.`} />
        <meta name="keywords" content={`${category.name.toLowerCase()}, ${category.name.toLowerCase()} india, ${category.name.toLowerCase()} price, rent ${category.name.toLowerCase()}`} />
        <link rel="canonical" href={`https://laptoponrent.online/category/${categorySlug}`} />
        <meta property="og:title" content={`${category.name} in India | Starting ${category.priceRange} | LaptopRent`} />
        <meta property="og:description" content={`${category.description}. Rent from ${category.priceRange}. Same-day delivery in 25+ cities.`} />
        <meta property="og:url" content={`https://laptoponrent.online/category/${categorySlug}`} />
        <meta property="og:image" content={`https://laptoponrent.online/assets/og-category-${categorySlug}.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.name} in India | Starting ${category.priceRange}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": category.name,
            "description": category.description,
            "provider": {
              "@type": "Organization",
              "name": "LaptopRent",
              "url": "https://laptoponrent.online"
            },
            "areaServed": "IN",
            "serviceType": "Laptop Rental",
            "offers": {
              "@type": "Offer",
              "name": category.name,
              "description": category.description,
              "priceCurrency": "INR",
              "price": category.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceCurrency": "INR",
                "minPrice": parseInt(category.priceRange.split(' - ')[0].replace(/[₹,]/g, '')),
                "maxPrice": parseInt(category.priceRange.split(' - ')[1].replace(/[₹,]/g, '')),
                "unitText": "month"
              },
              "availability": "https://schema.org/InStock"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://laptoponrent.online/" },
              { "@type": "ListItem", "position": 2, "name": "Categories", "item": "https://laptoponrent.online/categories" },
              { "@type": "ListItem", "position": 3, "name": category.name, "item": `https://laptoponrent.online/category/${categorySlug}` }
            ]
          }
        ], null, 2) }} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-gray-500">
                  <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                  <li className="text-gray-300">/</li>
                  <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
                  <li className="text-gray-300">/</li>
                  <li className="text-gray-900 font-medium" aria-current="page">{category.name}</li>
                </ol>
              </nav>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                {category.name} <span className="text-blue-600">in India</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {category.description} Rent from <span className="font-semibold text-blue-600">{category.priceRange}</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/laptops?category=${categorySlug}`}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  Browse {category.name}s
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-lg"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Grid - Placeholder */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Available {category.name}s</h2>
                <p className="text-gray-600 mt-1">Browse our curated selection of {category.name.toLowerCase()}s</p>
              </div>
              <Link to={`/laptops?category=${categorySlug}`} className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Link
                  key={i}
                  to={`/laptop/${categorySlug}-${i}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4"
                >
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-1H3.25zM17.5 13H7v6a2 2 0 01-2 2h10a2 2 0 002-2v-2a2 2 0 00-2-2H7a2 2 0 01-2-2V9a2 2 0 012-2h5l3-3h2a2 2 0 012 2v6z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">Sample {category.name} {i}</h3>
                  <p className="text-sm text-gray-500 mb-2">i5 10th Gen • 16GB • 512GB SSD</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">₹2,999/mo</span>
                    <span className="text-sm text-gray-500">Starting</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to={`/laptops?category=${categorySlug}`} className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg">
                View All {category.name}s
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Cities Available */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Available Across India</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Same-day delivery in major metros, next-day in other cities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {INDIAN_CITIES.slice(0, 12).map((city) => (
                <Link
                  key={city.slug}
                  to={`/rental/${city.slug}?category=${categorySlug}`}
                  className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 p-4 text-center"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{city.name}</h4>
                  <p className="text-xs text-gray-500">{city.state}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/cities" className="text-blue-600 hover:text-blue-800 font-medium">View All 25+ Cities →</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQ_QUESTIONS.slice(0, 6).map((faq, index) => (
                <details key={index} className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CategoryPage;