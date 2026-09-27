import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import {
  INDIAN_CITIES,
  CITY_META,
  LAPTOP_CATEGORIES,
  BLOG_POSTS,
  FAQ_QUESTIONS,
} from '../src/frontend/data/seo-data';
import {
  generateBreadcrumbSchema,
  generateCityPageSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from '../src/frontend/lib/seo/structured-data';

const DIST = resolve(process.cwd(), 'dist/frontend');
const BASE = 'https://laptoponrent.online';

// This file doubles as the Vite build output for `/`, which this script then
// overwrites. A second run without a fresh build would therefore read the
// already-prerendered homepage as its template and stamp the homepage body onto
// every route. Normalise `#root` back to empty so the script is idempotent.
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8')
  .replace(/<div class="seo-static">[\s\S]*?<\/div>\s*<\/div>/, '</div>')
  .replace(/(<div id="root")>[\s\S]*?<\/div>/, '$1></div>');

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

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Injects static crawlable markup into #root. React replaces it on mount. */
function injectBody(html: string, body: string): string {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"><div class="seo-static">${body}</div></div>`,
  );
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
  body?: string;
}) {
  const {
    route, title, description, keywords, canonical, ogTitle, ogUrl, jsonLd,
    hreflang = [], geo, body = '',
  } = opts;

  const canonicalUrl = (route === '/' || canonical.endsWith('/'))
    ? canonical
    : `${canonical}/`;

  let html = template;
  html = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`);
  html = replaceHead(html, 'description', description);
  html = replaceHead(html, 'keywords', keywords);
  html = replaceHead(html, 'canonical', canonicalUrl);
  html = replaceHead(html, 'og:title', ogTitle);
  html = replaceHead(html, 'og:description', description);
  html = replaceHead(html, 'og:url', canonicalUrl);
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
    .map(h => `\n    <link rel="alternate" hreflang="${h.code}" href="${h.href === BASE || h.href.endsWith('/') ? h.href : `${h.href}/`}" />`)
    .join('');
  const jsonLdBlocks = jsonLd
    .filter(Boolean)
    .map(s => `\n    <script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('\n');

  html = html.replace('</head>', `${geoMeta}\n\n    ${hreflangs}${jsonLdBlocks}\n  </head>`);
  if (body) html = injectBody(html, body);
  writePage(route, html);
}

const toDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);

// ---- Homepage --------------------------------------------------------------
// `/` is the highest-priority URL in sitemap.xml but was never prerendered, and
// the app replaces it with a client-side <Navigate> to /products. Crawlers were
// therefore served an empty shell. Static markup goes in #root; React replaces
// it on mount.
const TOP_CITIES = INDIAN_CITIES.slice(0, 12);
const TIER1 = INDIAN_CITIES.filter(c => c.tier === 1);

buildPage({
  route: '/',
  title: 'LaptopRent - Best Laptop Rentals in India | Doorstep Delivery',
  description: 'Rent laptops in India from ₹849/month. MacBook, gaming, business and student laptops from HP, Dell, Lenovo, ASUS, Acer and Surface. Same-day delivery in 25+ cities with 18% GST invoice.',
  keywords: 'laptop rental, laptop on rent, macbook rental, gaming laptop rental, computer rental india, rent laptop india',
  canonical: `${BASE}/`,
  ogTitle: 'LaptopRent - Best Laptop Rentals in India | Doorstep Delivery',
  ogUrl: `${BASE}/`,
  hreflang: [
    { code: 'en-IN', href: `${BASE}/` },
    { code: 'x-default', href: `${BASE}/` },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${BASE}/#business`,
      name: 'LaptopRent',
      legalName: 'LaptopRent Technologies Private Limited',
      description: 'Laptop rental service in India offering MacBook, gaming, business and student laptops on flexible monthly plans with same-day delivery in 25+ cities.',
      url: `${BASE}/`,
      telephone: '+91-80-8090-0666',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Bank Transfer',
      image: `${BASE}/assets/og-default.jpg`,
      logo: `${BASE}/assets/logo.svg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shiv Shakti Industrial Premises, NM Joshi Marg',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400011',
        addressCountry: 'IN',
      },
      areaServed: INDIAN_CITIES.map(c => ({
        '@type': 'City',
        name: `${c.name}, ${c.state}`,
      })),
      makesOffer: LAPTOP_CATEGORIES.map(cat => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: cat.name, description: cat.description },
        priceCurrency: 'INR',
        price: cat.priceRange.split(' - ')[0].replace(/[₹,]/g, ''),
        url: `${BASE}/category/${cat.id}`,
      })),
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      }],
    },
    generateBreadcrumbSchema([{ name: 'Home', url: `${BASE}/` }]),
    generateFAQSchema(),
  ],
  body: `
    <main>
      <h1>Laptop Rental in India - Flexible Monthly Plans from ₹849</h1>
      <p>LaptopRent rents laptops on rent across ${INDIAN_CITIES.length} Indian cities, with same-day
      delivery and flexible plans from one day to twelve months. Every rental includes a
      18% GST invoice under HSN 997315, so registered businesses can claim full input tax credit.</p>

      <h2>Why rent a laptop instead of buying one?</h2>
      <p>Renting spreads the cost of a device over the period you actually need it. A
      ₹1,20,000 business laptop used for eight months costs about ₹8,000 per month on rent
      and leaves you with no depreciation, no resale effort and no maintenance overhead.
      When the requirement changes, you upgrade rather than write off a device.</p>

      <h2>Laptop rental categories</h2>
      <ul>
        ${LAPTOP_CATEGORIES.map(cat => `<li><a href="/category/${cat.id}/">${esc(cat.name)}</a> - ${esc(cat.description)}. ${esc(cat.priceRange)}.</li>`).join('\n        ')}
      </ul>

      <h2>Where we deliver</h2>
      <p>We deliver same-day in ${TIER1.map(c => c.name).join(', ')} and across
      ${INDIAN_CITIES.length} cities including ${INDIAN_CITIES.filter(c => c.tier !== 1).slice(0, 8).map(c => c.name).join(', ')}.</p>
      <ul>
        ${TOP_CITIES.map(c => `<li><a href="/rental/${c.slug}/">Laptop rental in ${esc(c.name)}</a> - same-day delivery in ${esc(c.name)}, ${esc(c.state)}.</li>`).join('\n        ')}
      </ul>
      <p><a href="/cities/">See all ${INDIAN_CITIES.length} cities we serve</a>.</p>

      <h2>Frequently asked questions</h2>
      ${FAQ_QUESTIONS.slice(0, 4).map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('\n      ')}

      <h2>Talk to a laptop rental specialist</h2>
      <p>Call +91-80-8090-0666 or browse the <a href="/categories/">full category list</a> to
      find the right device for your requirement.</p>
    </main>`,
});

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
  body: `
    <main>
      <h1>Laptop Rental in ${INDIAN_CITIES.length}+ Indian Cities</h1>
      <p>LaptopRent delivers rental laptops to ${INDIAN_CITIES.length} cities across India, with
      same-day delivery in tier-1 metros. Choose a city to see local pricing, popular models and
      delivery details.</p>
      <ul>
        ${INDIAN_CITIES.map(c => `<li><a href="/rental/${c.slug}/">Laptop rental in ${esc(c.name)}</a> - ${esc(c.state)} - same-day delivery, from ₹849/month.</li>`).join('\n        ')}
      </ul>
    </main>`,
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
  body: `
    <main>
      <h1>Laptop Rental Categories in India</h1>
      <p>Rent laptops by category across ${INDIAN_CITIES.length} Indian cities. All rentals include
      maintenance support, a 18% GST invoice and flexible terms from one month to twelve months.</p>
      <ul>
        ${LAPTOP_CATEGORIES.map(cat => `<li><a href="/category/${cat.id}/">${esc(cat.name)}</a> - ${esc(cat.description)}. ${esc(cat.priceRange)}.</li>`).join('\n        ')}
      </ul>
    </main>`,
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
  body: `
    <main>
      <h1>Laptop Rental Blog - Guides, Comparisons and City Guides</h1>
      <p>Practical writing on renting a laptop in India: cost analysis, model guides, corporate
      and student rental advice, and city-specific delivery information.</p>
      <ul>
        ${BLOG_POSTS.map(p => `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a> - ${esc(p.readTime || '5 min read')}.</li>`).join('\n        ')}
      </ul>
    </main>`,
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
    body: `
    <main>
      <h1>${esc(cat.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()))} - LaptopRent Blog</h1>
      <p>Articles on ${esc(cat.replace(/-/g, ' '))} for laptop rental in India, written to help
      businesses and individuals decide whether to rent or buy, and which model fits the budget
      and workload. Every rental we offer includes a 18% GST invoice under HSN 997315 and same-day
      delivery in ${INDIAN_CITIES.length} cities.</p>
      <h2>In this section</h2>
      <ul>
        ${posts.map(p => `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a> - ${esc(p.readTime || '5 min')} read.</li>`).join('\n        ')}
      </ul>
      <h2>Ready to rent?</h2>
      <p>Compare <a href="/categories/">all laptop rental categories</a> or check
      <a href="/rental/${INDIAN_CITIES[0].slug}/">rental in ${esc(INDIAN_CITIES[0].name)}</a>.
      Call +91-80-8090-0666 to talk to a specialist.</p>
    </main>`,
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
    body: `
    <main>
      <h1>${esc(post.title)}</h1>
      <p>${esc(body)}</p>
      <h2>Key takeaways</h2>
      <ul>
        <li>Rental spreads cost over the period you actually need the device.</li>
        <li>Every LaptopRent rental includes a 18% GST invoice under HSN 997315.</li>
        <li>Same-day delivery is available in ${INDIAN_CITIES.length} cities.</li>
      </ul>
      <p>Browse <a href="/categories/">rental categories</a> or see
      <a href="/rental/${INDIAN_CITIES[0].slug}/">rental in ${esc(INDIAN_CITIES[0].name)}</a>.</p>
    </main>`,
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
    body: `
    <main>
      <h1>Laptop Rental in ${esc(city.name)}</h1>
      <p>${esc(description)}</p>
      <h2>Popular laptop categories in ${esc(city.name)}</h2>
      <ul>
        ${LAPTOP_CATEGORIES.slice(0, 8).map(cat => `<li><a href="/category/${cat.id}/">${esc(cat.name)}</a> in ${esc(city.name)} - ${esc(cat.priceRange)}.</li>`).join('\n        ')}
      </ul>
      <h2>Delivery areas in ${esc(city.name)}</h2>
      <p>We deliver to ${areas.map(a => esc(a)).join(', ')} and surrounding localities in
      ${esc(city.name)}, ${esc(city.state)}. Renting starts from ${esc(price)} with same-day
      delivery for orders confirmed before 2 PM.</p>
      <h2>Why rent a laptop in ${esc(city.name)}?</h2>
      <p>Businesses and students in ${esc(city.name)} rent rather than buy because it keeps
      capital free, allows upgrades as requirements change, and includes a 18% GST invoice that
      registered entities can claim against input tax credit.</p>
      <p>Browse <a href="/rental/${city.slug}/">laptop rental in ${esc(city.name)}</a> or compare
      <a href="/categories/">all rental categories</a>. Nearby: ${INDIAN_CITIES.filter(c => c.slug !== city.slug).slice(0, 5).map(c => `<a href="/rental/${c.slug}/">${esc(c.name)}</a>`).join(', ')}.</p>
    </main>`,
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
    body: `
    <main>
      <h1>${esc(cat.name)} in India</h1>
      <p>${esc(cat.description)}. Rent from ${esc(cat.priceRange)} with same-day delivery in
      ${INDIAN_CITIES.length} cities, maintenance included and a 18% GST invoice on every order.</p>
      <h2>What is included</h2>
      <ul>
        <li>Delivery to your city within 24 hours</li>
        <li>Maintenance and hardware support for the rental term</li>
        <li>18% GST invoice under HSN 997315</li>
        <li>Flexible upgrade path if your requirement changes</li>
      </ul>
      <h2>Available in</h2>
      <p>${INDIAN_CITIES.slice(0, 10).map(c => `<a href="/rental/${c.slug}/">${esc(c.name)}</a>`).join(', ')}
      and ${INDIAN_CITIES.length - 10} more cities.</p>
      <h2>Frequently asked questions</h2>
      ${FAQ_QUESTIONS.slice(0, 3).map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('\n      ')}
    </main>`,
  });
}

console.log('Prerender complete.');

// ---- Sitemaps (trailing-slash URLs matching generated pages) -------------
const TODAY = toDate(new Date().toISOString());
const loc = (p: string) => (p === '/' ? `${BASE}/` : `${BASE}${p.replace(/\/$/, '')}/`);

const sitemap = (entries: Array<{ url: string; priority?: number; freq?: string }>) =>
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map(e => `  <url>\n    <loc>${loc(e.url)}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${e.freq || 'monthly'}</changefreq>\n    <priority>${e.priority || '0.7'}</priority>\n  </url>`).join('\n') +
  '\n</urlset>\n';

const sitemapIndex = (names: string[]) =>
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  names.map(n => `  <sitemap>\n    <loc>${BASE}/${n}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`).join('\n') +
  '\n</sitemapindex>\n';

writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap([
  { url: '/', priority: 1.0, freq: 'daily' },
  { url: '/categories', priority: 0.9 },
  { url: '/cities', priority: 0.9 },
  { url: '/blog', priority: 0.8 },
  ...LAPTOP_CATEGORIES.map(c => ({ url: `/category/${c.id}`, priority: 0.8 })),
  ...INDIAN_CITIES.map(c => ({ url: `/rental/${c.slug}`, priority: 0.9 })),
]));

writeFileSync(resolve(DIST, 'sitemap-cities.xml'), sitemap(
  INDIAN_CITIES.map(c => ({ url: `/rental/${c.slug}`, priority: 0.9, freq: 'weekly' })),
));

writeFileSync(resolve(DIST, 'sitemap-categories.xml'), sitemap(
  LAPTOP_CATEGORIES.map(c => ({ url: `/category/${c.id}`, priority: 0.8 })),
));

writeFileSync(resolve(DIST, 'sitemap-blog.xml'), sitemap([
  { url: '/blog', priority: 0.7 },
  ...[...new Set(BLOG_POSTS.map(p => p.category))].map(c => ({ url: `/blog/category/${c}`, priority: 0.6 })),
  ...BLOG_POSTS.map(p => ({ url: `/blog/${p.slug}`, priority: 0.6, freq: 'monthly' })),
]));

writeFileSync(resolve(DIST, 'sitemap-index.xml'), sitemapIndex([
  'sitemap.xml',
  'sitemap-cities.xml',
  'sitemap-categories.xml',
  'sitemap-blog.xml',
]));

console.log('Sitemaps generated.');