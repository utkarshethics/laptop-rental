import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import {
  INDIAN_CITIES,
  CITY_META,
  LAPTOP_CATEGORIES,
  BLOG_POSTS,
} from '../src/frontend/data/seo-data';
import {
  generateBreadcrumbSchema,
  generateCityPageSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from '../src/frontend/lib/seo/structured-data';

const DIST = resolve(process.cwd(), 'dist/frontend');
const BASE = 'https://laptoponrent.online';

const template = readFileSync(resolve(DIST, 'index.html'), 'utf8');

function replaceHead(html: string, key: string, value: string): string {
  const re = new RegExp(`<meta[^>]*name=["']${key}["'][^>]*>|<meta[^>]*property=["']${key}["'][^>]*>|` +
    `<link[^>]*rel=["']${key}["'][^>]*>`);
  return html.replace(re, match =>
    match.includes('rel=')
      ? `<link rel="${key}" href="${value}" />`
      : match.includes('property=')
        ? `<meta property="${key}" content="${value}" />`
        : `<meta name="${key}" content="${value}" />`,
  );
}

function writePage(route: string, html: string) {
  const file = resolve(DIST, route.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`  prerender -> /${route.replace(/^\//, '').replace(/index\.html.*/, '')}`);
}

function buildPage(opts: {
  route: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogUrl: string;
  jsonLd: unknown[];
  hreflang?: Array<{ code: string; href: string }>;
  geo?: { region: string; place: string; lat: string; lng: string };
}) {
  const {
    route, title, description, keywords, canonical, ogTitle, ogUrl, jsonLd,
    hreflang = [], geo,
  } = opts;

  let html = template;
  html = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`);
  html = replaceHead(html, 'description', description);
  html = replaceHead(html, 'keywords', keywords);
  html = replaceHead(html, 'canonical', canonical);
  html = replaceHead(html, 'og:title', ogTitle);
  html = replaceHead(html, 'og:description', description);
  html = replaceHead(html, 'og:url', ogUrl);
  html = html.replace(/<meta property="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${ogTitle}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}" />`);

  html = html.replace(/<meta name="geo\.region"[^>]*>\s*\n?/g, '');
  html = html.replace(/<meta name="geo\.placename"[^>]*>\s*\n?/g, '');
  html = html.replace(/<meta name="geo\.position"[^>]*>\s*\n?/g, '');
  html = html.replace(/<meta name="ICBM"[^>]*>\s*\n?/g, '');

  const geoMeta = geo
    ? `<meta name="geo.region" content="${geo.region}" />
    <meta name="geo.placename" content="${geo.place}" />
    <meta name="geo.position" content="${geo.lat};${geo.lng}" />
    <meta name="ICBM" content="${geo.lat}, ${geo.lng}" />`
    : `<meta name="geo.region" content="IN" />`;

  const hreflangs = hreflang
    .map(h => `\n    <link rel="alternate" hreflang="${h.code}" href="${h.href}" />`)
    .join('');
  const jsonLdBlocks = jsonLd
    .filter(Boolean)
    .map(s => `\n    <script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('\n');

  html = html.replace('</head>', `${geoMeta}\n\n    ${hreflangs}${jsonLdBlocks}\n  </head>`);
  writePage(route, html);
}

const toDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

// ---- Cities index ---------------------------------------------------------
buildPage({
  route: '/cities',
  title: 'Laptop Rental in 25+ Indian Cities | Same-Day Delivery | LaptopRent',
  description: 'Find laptop rental services in Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, Kolkata and 25+ Indian cities. Same-day delivery across metros.',
  keywords: 'laptop rental cities india, laptop on rent bangalore, laptop rental delhi, laptop rental mumbai, computer rental india',
  canonical: `${BASE}/cities`,
  ogTitle: 'Laptop Rental in 25+ Indian Cities | LaptopRent',
  ogUrl: `${BASE}/cities`,
  jsonLd: [{
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Laptop Rental Cities in India',
    itemListElement: INDIAN_CITIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: `Laptop Rental in ${c.name}`,
        url: `${BASE}/rental/${c.slug}`,
        areaServed: { '@type': 'City', name: c.name },
      },
    })),
  }],
});

// ---- Category index -------------------------------------------------------
buildPage({
  route: '/categories',
  title: 'Laptop Rental Categories | MacBook, Gaming, Business | LaptopRent',
  description: 'All laptop rental categories in India: MacBook, gaming, business, student, Dell, HP, Lenovo, ASUS, Acer, Surface and workstations. Transparent pricing.',
  keywords: 'laptop rental categories, macbook rental, gaming laptop rental, business laptop rental, student laptop rental',
  canonical: `${BASE}/categories`,
  ogTitle: 'Laptop Rental Categories in India | LaptopRent',
  ogUrl: `${BASE}/categories`,
  jsonLd: [{
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Laptop Rental Categories',
    itemListElement: LAPTOP_CATEGORIES.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: cat.name,
        url: `${BASE}/category/${cat.id}`,
        offers: { '@type': 'Offer', priceCurrency: 'INR', price: cat.priceRange.split(' - ')[0].replace(/[₹,]/g, '') },
      },
    })),
  }],
});

// ---- Blog index + category hubs ------------------------------------------
buildPage({
  route: '/blog',
  title: 'Laptop Rental Blog | Guides, Comparisons & City Guides | LaptopRent',
  description: 'Expert blog on laptop rental in India: rental vs buying cost analysis, MacBook rental guide, gaming laptops, corporate and student rental tips, and city guides.',
  keywords: 'laptop rental blog, macbook rental guide, gaming laptop rental, laptop rental india guide',
  canonical: `${BASE}/blog`,
  ogTitle: 'Laptop Rental Blog | Expert Guides | LaptopRent',
  ogUrl: `${BASE}/blog`,
  jsonLd: [{
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'LaptopRent Blog',
    url: `${BASE}/blog`,
    blogPost: BLOG_POSTS.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BASE}/blog/${p.slug}`,
      datePublished: p.date,
      articleSection: p.category,
    })),
  }],
});

for (const cat of [...new Set(BLOG_POSTS.map(p => p.category))]) {
  const posts = BLOG_POSTS.filter(p => p.category === cat);
  buildPage({
    route: `/blog/category/${cat}`,
    title: `${cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Blog Posts | LaptopRent`,
    description: `LaptopRent ${cat.replace(/-/g, ' ')} articles: ${posts.slice(0, 3).map(p => p.title).join(', ')}.`,
    keywords: `laptop rental ${cat}, ${cat} guides, laptop rental india`,
    canonical: `${BASE}/blog/category/${cat}`,
    ogTitle: `${cat.replace(/-/g, ' ')} | LaptopRent Blog`,
    ogUrl: `${BASE}/blog/category/${cat}`,
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `LaptopRent ${cat} Blog`,
      url: `${BASE}/blog/category/${cat}`,
      blogPost: posts.map(p => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${BASE}/blog/${p.slug}`,
        datePublished: p.date,
        articleSection: p.category,
      })),
    }],
  });
}

// ---- Blog detail pages ----------------------------------------------------
const BLOG_BODY: Record<string, string> = {
  guides: 'This guide covers the essential considerations for choosing a rental laptop in India, including specifications, budgets, and rental terms. We compare the best options across popular laptop types to help you decide quickly and confidently.',
  comparisons: 'In this comparison we analyse total cost of ownership, flexibility, upgrade paths, and exit options to help you decide between renting and buying a laptop in India.',
  'city-guides': 'Our city-specific rental guide covers the best laptop rental options, local delivery areas, and practical tips for getting a rental laptop delivered quickly in this Indian city.',
  business: 'This article explains how corporate and SME teams can simplify device management with flexible laptop rental, including GST input tax credit benefits, volume pricing, and faster onboarding.',
  events: 'Planning an event, training, or examination? This guide walks through rental planning for events, including quantities, durations, and onsite support considerations.',
};

for (const post of BLOG_POSTS) {
  const body = BLOG_BODY[post.category] || 'Expert advice on laptop rental in India.';
  buildPage({
    route: `/blog/${post.slug}`,
    title: `${post.title} | LaptopRent`,
    description: `${post.title}. ${body.slice(0, 140)}`,
    keywords: `${post.title.toLowerCase()}, laptop rental india`,
    canonical: `${BASE}/blog/${post.slug}`,
    ogTitle: post.title,
    ogUrl: `${BASE}/blog/${post.slug}`,
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: body.slice(0, 200),
      url: `${BASE}/blog/${post.slug}`,
      datePublished: toDate(post.date),
      dateModified: toDate(post.date),
      author: { '@type': 'Organization', name: 'LaptopRent' },
      publisher: { '@type': 'Organization', name: 'LaptopRent', logo: { '@type': 'ImageObject', url: `${BASE}/assets/logo.svg` } },
      mainEntityOfPage: `${BASE}/blog/${post.slug}`,
      articleSection: post.category,
      timeRequired: post.readTime,
    }],
  });
}

// ---- City pages -----------------------------------------------------------
const DEFAULT_AREAS = ['Central Business District', 'City Centre', 'Outer Ring Road', 'Airport Road', 'New Extension'];
const DEFAULT_CITY_DESC = (name: string, state: string) => `Laptop rental in ${name}, ${state} with same-day delivery. Rent MacBooks, business, gaming, and student laptops with transparent pricing and flexible monthly plans.`;

for (const city of INDIAN_CITIES) {
  const meta = CITY_META[city.slug as keyof typeof CITY_META];
  const description = meta?.description || DEFAULT_CITY_DESC(city.name, city.state);
  const keywords = (meta?.keywords || [`laptop rental ${city.name.toLowerCase()}`]).join(', ');
  const price = meta?.priceStart || '₹849/mo';
  const areas = meta?.areas || DEFAULT_AREAS;

  const schemas: unknown[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Laptop Rental in ${city.name}`,
      description,
      url: `${BASE}/rental/${city.slug}`,
      provider: { '@type': 'Organization', name: 'LaptopRent', url: BASE },
      areaServed: { '@type': 'City', name: city.name },
      serviceType: 'Laptop Rental',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: price.replace(/[₹,\/mo]/g, ''),
        availability: 'https://schema.org/InStock',
      },
    },
    generateCityPageSchema(city.slug),
    generateLocalBusinessSchema(city.slug),
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Cities', url: `${BASE}/cities` },
      { name: `Laptop Rental ${city.name}`, url: `${BASE}/rental/${city.slug}` },
    ]),
    generateFAQSchema(),
  ];

  buildPage({
    route: `/rental/${city.slug}`,
    title: `Laptop Rental in ${city.name} (${city.shortName}) | From ${price} | LaptopRent`,
    description,
    keywords,
    canonical: `${BASE}/rental/${city.slug}`,
    ogTitle: `Laptop Rental in ${city.name} | From ${price}`,
    ogUrl: `${BASE}/rental/${city.slug}`,
    geo: { region: 'IN', place: city.name, lat: String(city.lat), lng: String(city.lng) },
    hreflang: [
      { code: 'en-IN', href: `${BASE}/rental/${city.slug}` },
      { code: 'x-default', href: `${BASE}/rental/${city.slug}` },
    ],
    jsonLd: schemas,
  });
}

// ---- Category pages -------------------------------------------------------
for (const cat of LAPTOP_CATEGORIES) {
  buildPage({
    route: `/category/${cat.id}`,
    title: `${cat.name} in India | From ${cat.priceRange} | LaptopRent`,
    description: `${cat.description}. Rent ${cat.name.toLowerCase()} across India from ${cat.priceRange}. Same-day delivery in 25+ cities.`,
    keywords: `${cat.name.toLowerCase()}, ${cat.name.toLowerCase()} india, rent ${cat.name.toLowerCase()}`,
    canonical: `${BASE}/category/${cat.id}`,
    ogTitle: `${cat.name} in India | From ${cat.priceRange}`,
    ogUrl: `${BASE}/category/${cat.id}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: cat.name,
        description: cat.description,
        url: `${BASE}/category/${cat.id}`,
        provider: { '@type': 'Organization', name: 'LaptopRent', url: BASE },
        areaServed: 'IN',
        serviceType: 'Laptop Rental',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: cat.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
          availability: 'https://schema.org/InStock',
        },
      },
      generateBreadcrumbSchema([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Categories', url: `${BASE}/categories` },
        { name: cat.name, url: `${BASE}/category/${cat.id}` },
      ]),
      generateFAQSchema(),
    ],
  });
}

console.log('Prerender complete.');