import { Helmet } from 'react-helmet-async';
import type { CityMeta, BlogPost } from '../../data/seo-data';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateProductSchema,
  generateCityPageSchema,
  generateArticleSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema as generateArticleSchemaFn,
} from '../../lib/seo/structured-data';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'service';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  city?: keyof typeof import('../../data/seo-data').CITY_META;
  article?: BlogPost;
  product?: {
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
  };
  category?: string;
}

export function SEOHead({
  title = 'LaptopRent - Best Laptop Rentals in India | Doorstep Delivery',
  description = 'Rent laptops, MacBooks, gaming laptops & desktops across India. Starting ₹849/mo. Same-day delivery in 25+ cities. 18% GST invoice. Flexible monthly plans.',
  canonical = 'https://laptoponrent.online',
  ogImage = '/assets/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  noFollow = false,
  structuredData,
  breadcrumbs,
  faqs,
  city,
  article,
  product,
  category,
}: SEOProps) {
  const fullTitle = title.includes('LaptopRent') ? title : `${title} | LaptopRent`;
  const fullUrl = canonical.startsWith('http') ? canonical : `https://laptoponrent.online${canonical}`;

  // Generate all structured data
  const schemas: Record<string, unknown>[] = [];

  // Always include Organization and WebSite
  schemas.push(generateOrganizationSchema());
  schemas.push(generateWebSiteSchema());

  // Add custom structured data if provided
  if (structuredData) {
    schemas.push(structuredData);
  }

  // Category page
  if (category) {
    schemas.push(generateServiceSchema(category));
  }

  // Product page
  if (product) {
    schemas.push(generateProductSchema(product));
  }

  // City page
  if (city) {
    schemas.push(generateCityPageSchema(city));
    schemas.push(generateLocalBusinessSchema(city));
  }

  // Article/Blog post
  if (article) {
    schemas.push(generateArticleSchemaFn({
      title: article.title,
      description: article.description || description,
      url: article.slug,
      image: '/assets/blog/' + article.slug + '.jpg',
      datePublished: article.date,
      dateModified: article.date,
      author: 'LaptopRent Team',
      category: article.category,
      readTime: article.readTime,
    }));
  }

  // Breadcrumbs
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // FAQs
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  // Article (if article prop but no article object)
  if (article === false && structuredData?.['@type'] === 'BlogPosting') {
    schemas.push(structuredData);
  }

  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="color-scheme" content="light" />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content="laptop rental, macbook rental, macbook rental india, laptop on rent, gaming laptop rental, computer rental india, laptop rental india, rent laptop india" />
      <meta name="author" content="LaptopRent" />
      <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`} />
      <meta name="bingbot" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://laptoponrent.online${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="LaptopRent" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />

      {ogType === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.date} />
          <meta property="article:modified_time" content={article.date} />
          <meta property="article:author" content="LaptopRent Team" />
          <meta property="article:section" content={article.category} />
          <meta property="article:tag" content="laptop rental" />
          <meta property="article:tag" content="India" />
          <meta property="article:tag" content={article.category} />
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@laptoprent" />
      <meta name="twitter:creator" content="@laptoprent" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://laptoponrent.online${ogImage}`} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional Meta */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="LaptopRent" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://laptoponrent.online" />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en-IN" href={fullUrl} />
      <link rel="alternate" hrefLang="hi-IN" href={fullUrl.replace('/en/', '/hi/')} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* App Links */}
      <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-TileImage" content="/assets/icons/ms-icon-144x144.png" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2),
        }}
      />

      {/* JSON-LD for breadcrumbs if provided separately */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs), null, 2),
          }}
        />
      )}

      {/* JSON-LD for FAQs if provided */}
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqs), null, 2),
          }}
        />
      )}
    </Helmet>
  );
}

export function generateCityBreadcrumbs(citySlug: string) {
  const city = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
  return [
    { name: 'Home', url: '/' },
    { name: 'Cities', url: '/cities' },
    { name: `${city} Laptop Rental`, url: `/rental/${citySlug}` },
  ];
}

export function generateCategoryBreadcrumbs(categorySlug: string) {
  const categoryNames: Record<string, string> = {
    'macbook-rental': 'MacBook Rental',
    'gaming-laptop-rental': 'Gaming Laptop Rental',
    'business-laptop-rental': 'Business Laptop Rental',
    'student-laptop-rental': 'Student Laptop Rental',
    'macbook-air-rental': 'MacBook Air Rental',
    'macbook-pro-rental': 'MacBook Pro Rental',
    'dell-laptop-rental': 'Dell Laptop Rental',
    'hp-laptop-rental': 'HP Laptop Rental',
    'lenovo-laptop-rental': 'Lenovo Laptop Rental',
    'asus-laptop-rental': 'ASUS Laptop Rental',
    'acer-laptop-rental': 'Acer Laptop Rental',
    'microsoft-surface-rental': 'Surface Laptop Rental',
    'workstation-rental': 'Mobile Workstation Rental',
    'budget-laptop-rental': 'Budget Laptop Rental',
  };
  return [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
    { name: categoryNames[categorySlug] || categorySlug, url: `/category/${categorySlug}` },
  ];
}

export function generateProductBreadcrumbs(categorySlug: string, productName: string) {
  const categoryNames: Record<string, string> = {
    'macbook-rental': 'MacBook Rental',
    'gaming-laptop-rental': 'Gaming Laptop Rental',
    'business-laptop-rental': 'Business Laptop Rental',
    'student-laptop-rental': 'Student Laptop Rental',
    'macbook-air-rental': 'MacBook Air Rental',
    'macbook-pro-rental': 'MacBook Pro Rental',
    'dell-laptop-rental': 'Dell Laptop Rental',
    'hp-laptop-rental': 'HP Laptop Rental',
    'lenovo-laptop-rental': 'Lenovo Laptop Rental',
    'asus-laptop-rental': 'ASUS Laptop Rental',
    'acer-laptop-rental': 'Acer Laptop Rental',
    'microsoft-surface-rental': 'Surface Laptop Rental',
    'workstation-rental': 'Mobile Workstation Rental',
    'budget-laptop-rental': 'Budget Laptop Rental',
  };
  return [
    { name: 'Home', url: '/' },
    { name: 'Laptops', url: '/laptops' },
    { name: categoryNames[categorySlug] || categorySlug, url: `/category/${categorySlug}` },
    { name: productName, url: '' },
  ];
}

export function generateBlogBreadcrumbs(category: string, slug: string) {
  return [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: category.charAt(0).toUpperCase() + category.slice(1), url: `/blog/category/${category}` },
    { name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), url: '' },
  ];
}