import type { CityMeta } from '../../data/seo-data';
import { ORGANIZATION, FAQ_QUESTIONS, LAPTOP_CATEGORIES } from '../../data/seo-data';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    sameAs: ORGANIZATION.sameAs,
    contactPoint: ORGANIZATION.contactPoint,
    address: ORGANIZATION.address,
    foundingDate: ORGANIZATION.foundingDate,
    founders: ORGANIZATION.founders,
    knowsAbout: ORGANIZATION.knowsAbout,
    areaServed: {
      '@type': 'GeoShape',
      name: 'India',
      addressCountry: 'IN',
    },
    serviceType: 'Laptop Rental',
    serviceArea: {
      '@type': 'Place',
      name: 'India',
      containedInPlace: { '@type': 'Country', name: 'India' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Laptop Rental Services',
      itemListElement: LAPTOP_CATEGORIES.map((cat, index) => ({
        '@type': 'OfferCatalog',
        name: cat.name,
        itemListElement: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: cat.name,
            description: cat.description,
            provider: { '@type': 'Organization', name: 'LaptopRent' },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            minPrice: cat.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
            maxPrice: cat.priceRange.split(' - ')[1].replace(/[₹,]/g, ''),
            unitText: 'month',
          },
        },
        position: index + 1,
      })),
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LaptopRent - Best Laptop Rentals in India',
    url: 'https://laptoponrent.online',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://laptoponrent.online/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LaptopRent',
      logo: {
        '@type': 'ImageObject',
        url: 'https://laptoponrent.online/assets/logo.svg',
      },
    },
  };
}

export function generateServiceSchema(categoryId: string) {
  const category = LAPTOP_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.name,
    description: category.description,
    provider: {
      '@type': 'Organization',
      name: 'LaptopRent',
      url: 'https://laptoponrent.online',
      logo: 'https://laptoponrent.online/assets/logo.svg',
    },
    areaServed: 'IN',
    serviceType: 'Laptop Rental',
    offers: {
      '@type': 'Offer',
      name: category.name,
      description: category.description,
      priceCurrency: 'INR',
      price: category.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'INR',
        minPrice: parseInt(category.priceRange.split(' - ')[0].replace(/[₹,]/g, '')),
        maxPrice: parseInt(category.priceRange.split(' - ')[1].replace(/[₹,]/g, '')),
        unitText: 'month',
        billingIncrement: 'month',
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    serviceArea: {
      '@type': 'GeoShape',
      name: 'India',
      addressCountry: 'IN',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://laptoponrent.online',
      servicePhone: '+91-80-8090-0666',
      servicePostalAddress: {
        '@type': 'PostalAddress',
        streetAddress: 'Shiv Shakti Industrial Premises, NM Joshi Marg',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400011',
        addressCountry: 'IN',
      },
      availableLanguage: ['English', 'Hindi'],
      hoursAvailable: 'Mo-Sat 09:00-19:00',
      serviceSmsNumber: '+91-93857-95958',
    },
  };
}

export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  specs: Record<string, string>;
  price: number;
  currency: string;
  availability: string;
  image: string;
  url: string;
  category: string;
  rentalPeriod: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    model: product.model,
    sku: product.id,
    category: product.category,
    description: product.description,
    image: product.image,
    url: product.url,
    offers: {
      '@type': 'Offer',
      name: product.name,
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availability === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: product.currency,
        price: product.price,
        unitText: product.rentalPeriod,
        billingIncrement: product.rentalPeriod,
      },
      seller: {
        '@type': 'Organization',
        name: 'LaptopRent',
        url: 'https://laptoponrent.online',
      },
      validFrom: new Date().toISOString(),
    },
    productID: product.id,
    manufacturer: {
      '@type': 'Organization',
      name: product.brand,
    },
    additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Rajesh K.' },
        datePublished: '2024-01-15',
        reviewBody: 'Excellent service, laptop delivered on time, great condition.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  };
}

export function generateCityPageSchema(citySlug: string) {
  const city = CITY_META[citySlug as keyof typeof CITY_META];
  if (!city) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Laptop Rental in ${city.name}`,
    description: city.description,
    provider: {
      '@type': 'Organization',
      name: 'LaptopRent',
      url: 'https://laptoponrent.online',
    },
    serviceType: 'Laptop Rental',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: INHERITED_CITIES.find(c => c.slug === citySlug)?.lat || 0,
        longitude: INHERITED_CITIES.find(c => c.slug === citySlug)?.lng || 0,
      },
      geoRadius: '50000',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://laptoponrent.online/rental/${citySlug}`,
      servicePhone: '+91-80-8090-0666',
      servicePostalAddress: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: city.keywords[0].split(' ')[2] || 'India',
        addressCountry: 'IN',
      },
      availableLanguage: ['English', 'Hindi'],
      hoursAvailable: 'Mo-Sat 09:00-19:00',
    },
    offers: {
      '@type': 'Offer',
      name: `Laptop Rental in ${city.name}`,
      priceCurrency: 'INR',
      price: city.priceStart.replace(/[₹,]/g, ''),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'INR',
        price: parseInt(city.priceStart.replace(/[₹,/mo]/g, '')),
        unitText: 'month',
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    areaServed: city.areas.map(area => ({
      '@type': 'Place',
      name: area,
      containedInPlace: {
        '@type': 'City',
        name: city.name,
      },
    })),
  };
}

const INHERITED_CITIES = [
  { slug: 'bangalore', lat: 12.9716, lng: 77.5946 },
  { slug: 'mumbai', lat: 19.0760, lng: 72.8777 },
  { slug: 'delhi', lat: 28.7041, lng: 77.1025 },
  { slug: 'hyderabad', lat: 17.3850, lng: 78.4867 },
  { slug: 'chennai', lat: 13.0827, lng: 80.2707 },
  { slug: 'pune', lat: 18.5204, lng: 73.8567 },
  { slug: 'kolkata', lat: 22.5726, lng: 88.3639 },
  { slug: 'ahmedabad', lat: 23.0225, lng: 72.5714 },
  { slug: 'gurgaon', lat: 28.4595, lng: 77.0266 },
  { slug: 'noida', lat: 28.5355, lng: 77.3910 },
  { slug: 'jaipur', lat: 26.9124, lng: 75.7873 },
  { slug: 'lucknow', lat: 26.8467, lng: 80.9462 },
  { slug: 'indore', lat: 22.7196, lng: 75.8577 },
  { slug: 'bhopal', lat: 23.2599, lng: 77.4126 },
  { slug: 'coimbatore', lat: 11.0168, lng: 76.9558 },
  { slug: 'kochi', lat: 9.9312, lng: 76.2673 },
  { slug: 'chandigarh', lat: 30.7333, lng: 76.7794 },
  { slug: 'patna', lat: 25.5941, lng: 85.1376 },
  { slug: 'nagpur', lat: 21.1458, lng: 79.0882 },
  { slug: 'surat', lat: 21.1702, lng: 72.8311 },
  { slug: 'visakhapatnam', lat: 17.6868, lng: 83.2185 },
  { slug: 'bhubaneswar', lat: 20.2961, lng: 85.8245 },
  { slug: 'mysore', lat: 12.2958, lng: 76.6394 },
  { slug: 'guwahati', lat: 26.1445, lng: 91.7362 },
  { slug: 'jodhpur', lat: 26.2389, lng: 73.0243 },
];

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://laptoponrent.online${item.url}`,
    })),
  };
}

export function generateFAQSchema(questions?: typeof FAQ_QUESTIONS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (questions || FAQ_QUESTIONS).map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

export function generateArticleSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  category: string;
  readTime: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://laptoponrent.online${post.url}`,
    image: `https://laptoponrent.online${post.image}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://laptoponrent.online/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LaptopRent',
      logo: {
        '@type': 'ImageObject',
        url: 'https://laptoponrent.online/assets/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://laptoponrent.online${post.url}`,
    },
    articleSection: post.category,
    wordCount: Math.floor(post.readTime.replace(' min', '') * 200),
    timeRequired: `PT${post.readTime.replace(' min', '')}M`,
    about: post.category,
    keywords: [post.category, 'laptop rental', 'india'],
  };
}

export function generateLocalBusinessSchema(citySlug: string) {
  const city = CITY_META[citySlug as keyof typeof CITY_META];
  if (!city) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `LaptopRent ${city.name}`,
    description: city.description,
    url: `https://laptoponrent.online/rental/${citySlug}`,
    telephone: '+91-80-8090-0666',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: INHERITED_CITIES.find(c => c.slug === citySlug)?.lat || 0,
      longitude: INHERITED_CITIES.find(c => c.slug === citySlug)?.lng || 0,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: city.priceStart.replace('/mo', ''),
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    areaServed: city.areas,
    serviceArea: city.areas.map(area => ({
      '@type': 'Place',
      name: area,
    })),
    hasMap: `https://maps.google.com/?q=LaptopRent+${city.name}`,
    sameAs: [
      'https://www.linkedin.com/company/laptoprent',
      'https://twitter.com/laptoprent',
      'https://www.facebook.com/laptoprent',
    ],
  };
}