import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import {
  INDIAN_CITIES,
  CITY_META,
  LAPTOP_CATEGORIES,
  BLOG_POSTS,
  FAQ_QUESTIONS,
  ORGANIZATION,
} from '../src/frontend/data/seo-data';
import { MOCK_PRODUCTS } from '../src/frontend/data/products';
import {
  generateBreadcrumbSchema,
  generateCityPageSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateProductSchema,
  buildEntityGraph,
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
  ogImage?: string;
  ogType?: string;
  body?: string;
}) {
  const {
    route, title, description, keywords, canonical, ogTitle, ogUrl, jsonLd,
    hreflang = [], geo, ogImage, ogType = 'website', body = '',
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
  // Product pages pass the model's own hero so social cards show the laptop
  // rather than the site-wide default image.
  if (ogImage) html = replaceHead(html, 'og:image', ogImage);
  html = replaceHead(html, 'og:type', ogType);
  html = replaceHead(html, 'twitter:url', canonicalUrl);
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
  // The Vite build already rendered the React SEO layer into this HTML, which
  // emits one ld+json block per component: the built pages carried 13 blocks,
  // including three byte-identical LocalBusiness and three identical
  // BreadcrumbList entries. Fold those in, drop exact duplicates, and emit a
  // single @graph so each page states its entities exactly once.
  const EXISTING = /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/g;
  const built = (html.match(EXISTING) || [])
    .map((b) => {
      try { return JSON.parse(b.replace(/<[^>]+>/g, '')); } catch { return null; }
    })
    .filter(Boolean);
  const merged = [...built, ...jsonLd].filter(Boolean);
  const seen = new Set<string>();
  const deduped = merged.filter((s) => {
    const o = s as Record<string, unknown>;
    const k = JSON.stringify(o, Object.keys(o).sort());
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // The built template already carries the site-wide FAQPage, so any page that
  // also passes generateFAQSchema() shipped two FAQPage entities in its graph.
  // Only one is valid per page. Exact-duplicate removal cannot catch it because
  // the two carry different question sets, so collapse by entity type, keeping
  // the page-specific schema that was passed in after the template's.
  const SINGLETON_TYPES = new Set([
    'FAQPage', 'Product', 'ItemList', 'BreadcrumbList', 'Service',
    'Article', 'BlogPosting', 'LocalBusiness', 'CollectionPage', 'WebPage',
  ]);
  const typeOfSchema = (s: unknown): string => {
    const o = s as Record<string, unknown>;
    const t = o['@type'];
    return Array.isArray(t) ? String(t[0]) : String(t ?? '');
  };
  const lastByType = new Map<string, number>();
  deduped.forEach((s, i) => {
    const t = typeOfSchema(s);
    if (SINGLETON_TYPES.has(t)) lastByType.set(t, i);
  });
  const singleton = deduped.filter((s, i) => {
    const t = typeOfSchema(s);
    return !SINGLETON_TYPES.has(t) || lastByType.get(t) === i;
  });

  // One @graph per page. The generators return standalone documents, so folding
  // them here is what gives every page shared, resolvable entity @ids.
  const entityGraph = buildEntityGraph(singleton, {
    url: canonicalUrl,
    name: title,
    description,
    isHome: route === '/',
  });
  const jsonLdBlocks = `\n    <script type="application/ld+json">\n    ${JSON.stringify(entityGraph, null, 2)}\n    </script>`;

  html = html.replace(EXISTING, '');
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
  description: 'Rent laptops in India from ₹849/month. MacBook, gaming, business and student laptops from HP, Dell, Lenovo, ASUS, Acer and Surface. Same-day delivery in 25+ cities with refundable security deposit.',
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
      legalName: ORGANIZATION.legalName,
      description: 'Laptop rental service in India offering MacBook, gaming, business and student laptops on flexible monthly plans with same-day delivery in 25+ cities.',
      url: `${BASE}/`,
      telephone: ORGANIZATION.contactPoint.telephone,
      email: ORGANIZATION.email,
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'UPI, Credit Card, Debit Card, Net Banking',
      image: `${BASE}/assets/og-default.jpg`,
      logo: `${BASE}/assets/logo.svg`,
      address: ORGANIZATION.address,
      areaServed: INDIAN_CITIES.map(c => ({
        '@type': 'City',
        name: `${c.name}, ${c.state}`,
        ...(c.wikidata ? { sameAs: c.wikidata } : {}),
      })),
      knowsAbout: ORGANIZATION.knowsAbout,
      sameAs: ORGANIZATION.sameAs,
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
      <div class="geo-answer-first" style="background:#f0f7ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem 0;border-radius:8px;">
        <p style="margin:0;font-size:0.98rem;font-weight:500;color:#0f172a;line-height:1.7;">
          <strong>Direct Answer:</strong> <strong>LaptopRent</strong> (laptoponrent.online) is an enterprise and retail laptop rental network operating across <strong>25+ Indian technology hubs</strong> including Bangalore, Mumbai, Delhi NCR, Hyderabad, Chennai, and Pune. LaptopRent provides flexible short-term and long-term rental plans starting from <strong>₹849/month</strong> for student models, <strong>₹1,200/month</strong> for corporate business laptops, and <strong>₹2,999/month</strong> for Apple MacBook Air/Pro (M1/M2/M3 chips) and RTX gaming rigs. All rentals feature <strong>same-day doorstep delivery</strong>, complimentary maintenance, zero capital depreciation, and fully refundable security deposits and zero hidden charges.
        </p>
      </div>
      <p>LaptopRent rents laptops on rent across ${INDIAN_CITIES.length} Indian cities, with same-day
      delivery and flexible plans from one day to twelve months. Every rental includes a
      Rent and deposit are the final amount payable – no GST is added.</p>

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
      <p>Call +91-78922-40243 or WhatsApp us at +91-78922-40243, or browse the <a href="/categories/">full category list</a> to
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
      maintenance support, transparent refundable deposits and flexible terms from one month to twelve months.</p>
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
      and workload. Every rental we offer includes transparent refundable security deposits and same-day
      delivery in ${INDIAN_CITIES.length} cities.</p>
      <h2>In this section</h2>
      <ul>
        ${posts.map(p => `<li><a href="/blog/${p.slug}/">${esc(p.title)}</a> - ${esc(p.readTime || '5 min')} read.</li>`).join('\n        ')}
      </ul>
      <h2>Ready to rent?</h2>
      <p>Compare <a href="/categories/">all laptop rental categories</a> or check
      <a href="/rental/${INDIAN_CITIES[0].slug}/">rental in ${esc(INDIAN_CITIES[0].name)}</a>.
      Call or WhatsApp +91-78922-40243 to talk to a specialist.</p>
    </main>`,
  });
}

// ---- Blog detail pages ----------------------------------------------------
const BLOG_BODY: Record<string, string> = {
  guides: 'This guide covers the essential considerations for choosing a rental laptop in India, including specifications, budgets, and rental terms. We compare the best options across popular laptop types to help you decide quickly and confidently.',
  comparisons: 'In this comparison we analyse total cost of ownership, flexibility, upgrade paths, and exit options to help you decide between renting and buying a laptop in India.',
  'city-guides': 'Our city-specific rental guide covers the best laptop rental options, local delivery areas, and practical tips for getting a rental laptop delivered quickly in this Indian city.',
  business: 'This article explains how corporate and SME teams can simplify device management with flexible laptop rental, including zero maintenance costs, flexible tenure, and fast onboarding.',
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
        <li>Rent and deposit are the final amount payable – no GST is added.</li>
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
      areaServed: { '@type': 'City', name: city.name, ...(city.wikidata ? { sameAs: city.wikidata } : {}) },
      serviceType: 'Laptop Rental',
      category: {
        '@type': 'DefinedTerm',
        name: 'Laptop Rental',
        sameAs: 'https://www.wikidata.org/wiki/Q1358656',
      },
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
      <div class="geo-answer-first" style="background:#f0f7ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem 0;border-radius:8px;">
        <p style="margin:0;font-size:0.98rem;font-weight:500;color:#0f172a;line-height:1.7;">
          <strong>Direct Answer:</strong> LaptopRent delivers on-demand laptop rentals across <strong>${esc(city.name)}, ${esc(city.state)}</strong> with same-day doorstep dispatch for orders placed before 2 PM. Monthly rental plans start at <strong>${esc(price)}</strong> with no capital commitment. Inventory includes Apple MacBooks (Air &amp; Pro), Lenovo ThinkPads, Dell Latitudes, HP ProBooks, and high-spec gaming/engineering rigs, fully supported with end-to-end hardware warranties and 100% refundable security deposits.
        </p>
      </div>
      <div style="display:flex;gap:12px;margin:1.5rem 0;flex-wrap:wrap;align-items:center;">
        <a href="/booking/?city=${encodeURIComponent(city.slug)}" style="display:inline-flex;align-items:center;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;font-size:1rem;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
          ⚡ Book Laptop in ${esc(city.name)} from ${esc(price)} →
        </a>
        <a href="/category/daily-short-term-laptop-rental/" style="display:inline-flex;align-items:center;background:#fef3c7;color:#92400e;border:1px solid #fde68a;padding:11px 20px;border-radius:8px;font-weight:600;text-decoration:none;font-size:0.95rem;">
          ⏱️ Daily Rentals from ₹99/day
        </a>
        <a href="/category/business-laptop-rental/" style="display:inline-flex;align-items:center;background:#f8fafc;color:#1e293b;border:1px solid #cbd5e1;padding:11px 20px;border-radius:8px;font-weight:600;text-decoration:none;font-size:0.95rem;">
          💼 View HP &amp; ThinkPad Stock
        </a>
      </div>
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
      capital free, allows upgrades as requirements change, and includes transparent terms where
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
        category: {
          '@type': 'DefinedTerm',
          name: cat.name,
          sameAs: cat.wikidata || 'https://www.wikidata.org/wiki/Q3962',
        },
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
    body: cat.id === 'daily-short-term-laptop-rental' ? `
    <main>
      <h1>${esc(cat.name)} in India</h1>
      <div class="geo-answer-first" style="background:#f0f7ff;border-left:4px solid #2563eb;padding:1.25rem;margin:1rem 0;border-radius:8px;">
        <p style="margin:0 0 10px 0;font-size:1.05rem;font-weight:600;color:#0f172a;">
          ⚡ Need a Laptop for 1 Day, a Weekend Hackathon, or a 1-Week Project?
        </p>
        <p style="margin:0;font-size:0.95rem;color:#334155;line-height:1.7;">
          <strong>Direct Answer:</strong> LaptopRent provides emergency short-term and per-day laptop rentals starting from <strong>₹99/day</strong> across 25+ cities. Available with <strong>Zero Security Deposit for GST-registered companies</strong> and 2–4 hour express doorstep delivery. Includes pre-loaded Windows 11/macOS, MS Office, charger, mouse, and hardware warranty.
        </p>
        <div style="display:flex;gap:12px;margin-top:14px;flex-wrap:wrap;">
          <a href="/booking/?category=daily-short-term-laptop-rental" style="display:inline-flex;align-items:center;background:#2563eb;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:0.95rem;">
            Book Daily Rental Now →
          </a>
          <a href="https://wa.me/917892240243?text=Hi%2C%20I%20need%20a%20laptop%20on%20rent%20per%20day" style="display:inline-flex;align-items:center;background:#16a34a;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:0.95rem;">
            💬 WhatsApp for 2-Hour Express Delivery
          </a>
        </div>
      </div>

      <h2>Daily & Short-Term Laptop Rental Pricing</h2>
      <div style="overflow-x:auto;margin:1.5rem 0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.95rem;">
          <thead>
            <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;">
              <th style="padding:10px 14px;">Tier &amp; Machine Profile</th>
              <th style="padding:10px 14px;">Daily Rate (1–3 Days)</th>
              <th style="padding:10px 14px;">Weekly Pass (7 Days)</th>
              <th style="padding:10px 14px;">Deposit Terms</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:12px 14px;"><strong>Standard Core i5</strong><br><small style="color:#64748b;">8GB RAM / 256GB SSD (Dell Latitude / HP ProBook)</small></td>
              <td style="padding:12px 14px;color:#16a34a;font-weight:700;">₹99 / day</td>
              <td style="padding:12px 14px;font-weight:600;">₹499 / week</td>
              <td style="padding:12px 14px;"><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-size:0.85rem;font-weight:600;">Zero Deposit Corporate</span></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:12px 14px;"><strong>High-Performance Business</strong><br><small style="color:#64748b;">Core i7 / 16GB RAM / 512GB SSD (ThinkPad / Dell XPS)</small></td>
              <td style="padding:12px 14px;color:#16a34a;font-weight:700;">₹149 / day</td>
              <td style="padding:12px 14px;font-weight:600;">₹799 / week</td>
              <td style="padding:12px 14px;"><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-size:0.85rem;font-weight:600;">Zero Deposit Corporate</span></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:12px 14px;"><strong>Apple MacBook Air (M1/M2)</strong><br><small style="color:#64748b;">Retina Display / 18hr Battery / Lightweight</small></td>
              <td style="padding:12px 14px;color:#16a34a;font-weight:700;">₹299 / day</td>
              <td style="padding:12px 14px;font-weight:600;">₹1,499 / week</td>
              <td style="padding:12px 14px;"><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-size:0.85rem;font-weight:600;">Zero Deposit Corporate</span></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:12px 14px;"><strong>Gaming &amp; AI Workstation</strong><br><small style="color:#64748b;">RTX 3060/4060 / 32GB RAM / i7 or Ryzen 7</small></td>
              <td style="padding:12px 14px;color:#16a34a;font-weight:700;">₹399 / day</td>
              <td style="padding:12px 14px;font-weight:600;">₹1,999 / week</td>
              <td style="padding:12px 14px;"><span style="background:#dcfce7;color:#15803d;padding:2px 8px;border-radius:4px;font-size:0.85rem;font-weight:600;">Zero Deposit Corporate</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Why Choose Short-Term Daily Laptop Rental?</h2>
      <ul>
        <li><strong>Zero Security Deposit:</strong> Available for GST-registered companies, startups, and corporate teams.</li>
        <li><strong>2–4 Hour Express Dispatch:</strong> Immediate courier doorstep delivery in Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, and Kolkata.</li>
        <li><strong>Exam &amp; Hackathon Ready:</strong> Laptops come fully sanitized, factory-reset, and configured with Google Chrome, Zoom, MS Teams, and Office suite.</li>
        <li><strong>Doorstep Pickup:</strong> When your rental period ends, our logistics partner collects the laptop from your doorstep.</li>
      </ul>

      <h2>Available for Immediate Delivery In</h2>
      <p>${INDIAN_CITIES.slice(0, 15).map(c => `<a href="/rental/${c.slug}/">${esc(c.name)}</a>`).join(', ')} and 10+ more cities.</p>

      <h2>Frequently Asked Questions on Daily Laptop Rentals</h2>
      <h3>Can I rent a laptop for just 1 or 2 days?</h3>
      <p>Yes. We specialize in short-term daily rentals for urgent business presentations, exams, software audits, and temporary office visits. Pricing starts at ₹99/day.</p>

      <h3>How does the Zero Deposit corporate option work?</h3>
      <p>Companies with a valid GSTIN or verified corporate email domain qualify for 100% zero-deposit rental passes. Billing is issued with GST tax invoices for input tax credit.</p>

      <h3>How quickly can I get the laptop delivered?</h3>
      <p>In tier-1 metros (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai), we offer 2 to 4-hour express courier delivery for bookings confirmed before 4 PM.</p>
    </main>` : `
    <main>
      <h1>${esc(cat.name)} in India</h1>
      <div class="geo-answer-first" style="background:#f0f7ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem 0;border-radius:8px;">
        <p style="margin:0;font-size:0.98rem;font-weight:500;color:#0f172a;line-height:1.7;">
          <strong>Direct Answer:</strong> LaptopRent provides on-demand <strong>${esc(cat.name)}</strong> across 25+ Indian tech hubs starting from <strong>${esc(cat.priceRange)}</strong>. Suitable for corporate teams, independent developers, students, and events with flexible 1-day to 12-month tenure, full hardware warranty, same-day delivery, and 100% refundable security deposits.
        </p>
      </div>
      <p>${esc(cat.description)}. Rent from ${esc(cat.priceRange)} with same-day delivery in
      ${INDIAN_CITIES.length} cities, maintenance included and refundable security deposits on every order.</p>
      <h2>What is included</h2>
      <ul>
        <li>Delivery to your city within 24 hours</li>
        <li>Maintenance and hardware support for the rental term</li>
        <li>Rent and deposit are the final amount payable – no GST is added</li>
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

// ---- Product listing and product detail pages ---------------------------
// `/products` and `/products/<id>` are client-only routes: nothing wrote them
// into dist, so GitHub Pages served a 404 for the catalog and for every product
// URL a shared link pointed at. The homepage itself redirects to
// `/products?category=laptop&sort=newest`, so a hard refresh on any listing the
// user reached also 404'd. Both are prerendered here so the catalog and the
// carousel are crawlable and survive a refresh.

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const productUrl = (id: string) => `${BASE}/products/${id}/`;
const heroOf = (p: (typeof MOCK_PRODUCTS)[number]) =>
  (p.images.find(i => i.isPrimary) || p.images[0]).url;
const firstSpec = (p: (typeof MOCK_PRODUCTS)[number], label: string) =>
  p.specifications.find(s => s.key.toLowerCase() === label)?.value || '';

const BRAND_LIST = [...new Set(MOCK_PRODUCTS.map(p => p.brand))].sort();
const SORTED_PRODUCTS = [...MOCK_PRODUCTS].sort((a, b) => a.pricing.monthly - b.pricing.monthly);
const CHEAPEST = SORTED_PRODUCTS[0].pricing.monthly;

buildPage({
  route: '/products',
  title: `All Laptop Rental Models in India | From ${inr(CHEAPEST)}/month | LaptopRent`,
  description: `Browse all ${MOCK_PRODUCTS.length} laptops available to rent in India from ${inr(CHEAPEST)}/month. HP, Dell, Lenovo, ASUS, Acer, Apple and Samsung models with same-day delivery, maintenance included and refundable security deposits.`,
  keywords: 'laptop rental, rent laptop india, laptop on rent, laptop rental models, macbook rental, gaming laptop rental',
  canonical: `${BASE}/products`,
  ogTitle: `Laptop Rental Models in India | From ${inr(CHEAPEST)}/month`,
  ogUrl: `${BASE}/products`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Laptop rental models in India',
      description: `All ${MOCK_PRODUCTS.length} laptop models available to rent across India.`,
      url: `${BASE}/products`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: MOCK_PRODUCTS.length,
        itemListElement: SORTED_PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: productUrl(p.id),
          name: p.name,
        })),
      },
    },
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Laptops', url: `${BASE}/products` },
    ]),
  ],
  body: `
    <main>
      <h1>Laptop rental models in India</h1>
      <div class="geo-answer-first" style="background:#f0f7ff;border-left:4px solid #2563eb;padding:1rem 1.25rem;margin:1rem 0;border-radius:8px;">
        <p style="margin:0;font-size:0.98rem;font-weight:500;color:#0f172a;line-height:1.7;">
          <strong>Direct Answer:</strong> LaptopRent stocks ${MOCK_PRODUCTS.length}+ certified laptop models available for immediate rent starting from <strong>${inr(CHEAPEST)}/month</strong>. Device options span business laptops (ThinkPad, Latitude), ultra-portable MacBooks (M1/M2/M3), dedicated AI/ML mobile workstations, and high-FPS gaming machines. Every order features zero security deposit options for GST-registered entities, pre-loaded OS/software, full hardware warranty, and same-day delivery across 25+ Indian cities.
        </p>
      </div>
      <p>All ${MOCK_PRODUCTS.length} laptops we stock are available to rent from
      ${inr(CHEAPEST)}/month. Every rental includes delivery, maintenance for the term and a
      transparent deposits, with same-day delivery in ${INDIAN_CITIES.length} cities.</p>
      <h2>All models</h2>
      <ul>
        ${SORTED_PRODUCTS.map(p => `<li><a href="/products/${p.id}/">${esc(p.name)}</a>
        ${esc(p.brand)} &middot; ${esc(firstSpec(p, 'processor') || p.shortDescription)} &middot;
        from ${inr(p.pricing.monthly)}/month</li>`).join('\n        ')}
      </ul>
      <h2>Shop by brand</h2>
      <ul>
        ${BRAND_LIST.map(b => `<li><a href="/products/?brand=${encodeURIComponent(b)}">${esc(b)}</a></li>`).join('\n        ')}
      </ul>
      <h2>Browse by need</h2>
      <ul>
        ${LAPTOP_CATEGORIES.slice(0, 6).map(c => `<li><a href="/category/${c.id}/">${esc(c.name)}</a> from ${esc(c.priceRange)}</li>`).join('\n        ')}
      </ul>
      <h2>Available in</h2>
      <p>${INDIAN_CITIES.slice(0, 10).map(c => `<a href="/rental/${c.slug}/">${esc(c.name)}</a>`).join(', ')}
      and ${INDIAN_CITIES.length - 10} more cities.</p>
    </main>`,
});

for (const p of MOCK_PRODUCTS) {
  const specs = Object.fromEntries(p.specifications.map(s => [s.key, s.value]));
  const deposit = p.pricing.deposit;
  const cats = LAPTOP_CATEGORIES.filter(c => p.tags.some(t => c.id.includes(t) || t.includes(c.id)));
  const related = MOCK_PRODUCTS
    .filter(o => o.id !== p.id && (o.brand === p.brand || o.tags.some(t => p.tags.includes(t))))
    .slice(0, 6);
  const gallery = [heroOf(p), ...p.images.filter(i => !i.isPrimary).map(i => i.url)];

  buildPage({
    route: `/products/${p.id}`,
    title: `${p.name} Rental in India | ${inr(p.pricing.monthly)}/month | LaptopRent`,
    description: `Rent ${p.name} in India from ${inr(p.pricing.monthly)}/month (${inr(p.pricing.quarterly)}/quarter, ${inr(p.pricing.yearly)}/year). ${p.shortDescription}. ${inr(deposit)} refundable deposit, maintenance included, same-day delivery in ${INDIAN_CITIES.length} cities.`,
    keywords: `${p.name.toLowerCase()} rental, rent ${p.name.toLowerCase()}, ${p.brand.toLowerCase()} laptop rental, ${p.name.toLowerCase()} on rent`,
    canonical: `${BASE}/products/${p.id}`,
    ogTitle: `${p.name} on rent from ${inr(p.pricing.monthly)}/month`,
    ogUrl: `${BASE}/products/${p.id}`,
    ogImage: `${BASE}${heroOf(p)}`,
    ogType: 'product',
    jsonLd: [
      generateProductSchema({
        id: p.id,
        name: p.name,
        description: p.description,
        brand: p.brand,
        model: p.name,
        specs,
        price: p.pricing.monthly,
        currency: p.pricing.currency,
        availability: p.availability.inStock > 0 ? 'in_stock' : 'out_of_stock',
        image: gallery.map(u => `${BASE}${u}`),
        url: productUrl(p.id),
        category: cats[0]?.name || 'Laptop Rental',
        rentalPeriod: 'month',
        rating: p.rating,
        reviewCount: p.reviewCount,
      }),
      generateBreadcrumbSchema([
        { name: 'Home', url: `${BASE}/` },
        { name: 'Laptops', url: `${BASE}/products` },
        { name: p.name, url: productUrl(p.id) },
      ]),
      generateFAQSchema(),
    ],
    body: `
    <main>
      <h1>${esc(p.name)} rental in India</h1>
      <p>${esc(p.description)}. Rent the ${esc(p.name)} from
      ${inr(p.pricing.monthly)}/month, ${inr(p.pricing.quarterly)}/quarter or
      ${inr(p.pricing.yearly)}/year with a ${inr(deposit)} fully refundable deposit.</p>
      <p>Rated ${p.rating} out of 5 from ${p.reviewCount} rental reviews.
      ${p.availability.inStock > 0
        ? `${p.availability.inStock} units in stock, available in ${p.availability.cities.slice(0, 3).join(', ')} and other cities.`
        : 'Currently unavailable, enquire for the next available date.'}</p>
      <h2>Specifications</h2>
      <table>
        <tbody>
          ${p.specifications.map(s => `<tr><th scope="row">${esc(s.key)}</th><td>${esc(s.value)}</td></tr>`).join('\n          ')}
        </tbody>
      </table>
      <h2>Rental plans</h2>
      <ul>
        <li>Monthly: ${inr(p.pricing.monthly)}</li>
        <li>Quarterly: ${inr(p.pricing.quarterly)}</li>
        <li>Yearly: ${inr(p.pricing.yearly)}</li>
        <li>Refundable deposit: ${inr(deposit)}</li>
      </ul>
      <div style="margin:1.5rem 0;">
        <a href="/booking/?model=${encodeURIComponent(p.name)}" style="display:inline-flex;align-items:center;background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;font-size:1rem;box-shadow:0 4px 14px rgba(37,99,235,0.3);">
          ⚡ Rent ${esc(p.name)} from ${inr(p.pricing.monthly)}/mo →
        </a>
      </div>
      <h2>What is included</h2>
      <ul>
        <li>Doorstep delivery in ${INDIAN_CITIES.length} cities, same day for orders before 2 PM</li>
        <li>Maintenance and hardware support for the rental term</li>
        <li>Rent and deposit are the final amount payable – no GST is added</li>
        <li>Free upgrade to an equivalent model if your requirement changes</li>
      </ul>
      <h2>Available in</h2>
      <p>${p.availability.cities.slice(0, 5).map(city =>
        `<a href="/rental/${(INDIAN_CITIES.find(c => c.name === city)?.slug || '')}/">${esc(city)}</a>`).join(', ')}
      and ${INDIAN_CITIES.length - 5} more cities.</p>
      <h2>Frequently asked questions</h2>
      ${FAQ_QUESTIONS.slice(0, 3).map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('\n      ')}
      ${related.length ? `<h2>Similar laptops</h2>
      <ul>
        ${related.map(o => `<li><a href="/products/${o.id}/">${esc(o.name)}</a> from ${inr(o.pricing.monthly)}/month</li>`).join('\n        ')}
      </ul>` : ''}
    </main>`,
  });
}


// ---- Company & Legal Policy Pages (Payment Gateway & Compliance) -------
buildPage({
  route: '/about',
  title: 'About LaptopRent | Premium Laptop Rentals by STAGE-X',
  description: "Learn about LaptopRent, India's trusted laptop rental service operating across 25+ cities. LaptopRent is a brand of STAGE-X, based in Bengaluru.",
  keywords: 'about laptoprent, stage-x bengaluru, laptop rentals india, laptop on rent',
  canonical: `${BASE}/about`,
  ogTitle: 'About LaptopRent | Premium Laptop Rentals by STAGE-X',
  ogUrl: `${BASE}/about`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About LaptopRent',
      description: 'Learn about LaptopRent, a brand owned and operated by STAGE-X Bengaluru.',
      url: `${BASE}/about/`,
    },
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'About Us', url: `${BASE}/about/` },
    ]),
  ],
  body: `
  <main>
    <h1>About LaptopRent</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <p>LaptopRent is India's leading laptop and IT equipment rental platform, serving startups, enterprise teams, remote professionals, and students across 25+ cities.</p>
    <h2>Legal Entity & Operations</h2>
    <p>LaptopRent is a brand owned and operated by <strong>STAGE-X</strong>, a registered sole proprietorship headquartered in Bengaluru, Karnataka, India.</p>
    <h2>Our Core Pillars</h2>
    <ul>
      <li>Enterprise Hardware: Apple MacBook, Lenovo ThinkPad, Dell Latitude, HP ProBook, RTX Gaming and Mobile Workstations.</li>
      <li>Speed & Convenience: Same-day doorstep delivery in major metros for orders confirmed before 2:00 PM.</li>
      <li>Transparent Pricing: Advance token of ₹50 adjusted in your 1st month rent, no hidden charges, and zero GST added.</li>
      <li>Comprehensive Support: 100% free hardware defect repairs and swaps for maximum uptime.</li>
    </ul>
    <h2>Contact & Office Address</h2>
    <p>Registered Office: 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India.</p>
    <p>Email: <a href="mailto:connect@laptoponrent.online">connect@laptoponrent.online</a> | Phone: +91 78922 40243 (Mon-Sun, 6:00 AM - 7:00 PM IST)</p>
  </main>`,
});

buildPage({
  route: '/contact',
  title: 'Contact LaptopRent | Support & Office Address - STAGE-X',
  description: 'Contact LaptopRent customer support, sales, and registered office in Bengaluru. Email connect@laptoponrent.online or call +91 78922 40243.',
  keywords: 'contact laptoprent, stage-x contact, laptop rental support bangalore, laptop rental customer service',
  canonical: `${BASE}/contact`,
  ogTitle: 'Contact LaptopRent | Support & Office Address - STAGE-X',
  ogUrl: `${BASE}/contact`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact LaptopRent',
      description: 'Contact information and registered office details for LaptopRent operated by STAGE-X.',
      url: `${BASE}/contact/`,
    },
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Contact Us', url: `${BASE}/contact/` },
    ]),
  ],
  body: `
  <main>
    <h1>Contact LaptopRent</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>Customer Support & Enquiries</h2>
    <p>Our dedicated team is available 7 days a week, 6:00 AM to 7:00 PM IST to assist with bookings, KYC, delivery tracking, and technical support.</p>
    <ul>
      <li>General & Business Enquiries: <a href="mailto:connect@laptoponrent.online">connect@laptoponrent.online</a></li>
      <li>Phone & WhatsApp: +91 78922 40243</li>
      <li>Registered Office: STAGE-X, 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India</li>
    </ul>
    <h2>Payments Notice</h2>
    <p>Payments on this website are processed by <strong>STAGE-X</strong> via secure RBI-licensed payment aggregators.</p>
  </main>`,
});

buildPage({
  route: '/terms',
  title: 'Terms of Service | LaptopRent (a brand of STAGE-X)',
  description: 'Official Terms of Service for laptoponrent.online, operated by STAGE-X Bengaluru. Outlining ₹50 booking token, security deposits, warranty, and rental agreements.',
  keywords: 'terms of service, laptop rent terms, stage-x terms, rental agreement',
  canonical: `${BASE}/terms`,
  ogTitle: 'Terms of Service | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/terms`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Terms of Service', url: `${BASE}/terms/` },
    ]),
  ],
  body: `
  <main>
    <h1>Terms of Service</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Customer Care: +91 78922 40243 · connect@laptoponrent.online.</strong>
    </div>
    <h2>1. Ownership and Agreement</h2>
    <p>This website (laptoponrent.online) and its rental services are operated by STAGE-X, a sole proprietorship based in Bengaluru, Karnataka, India. By accessing or booking through this website, you agree to these Terms.</p>
    <h2>2. ₹50 Reservation Token</h2>
    <p>A nominal ₹50 reservation token confirms delivery dispatch and is 100% credited against your first month invoice. If cancelled prior to dispatch, it is fully refundable within 24 to 48 hours.</p>
    <h2>3. Security Deposits & Payments</h2>
    <p>Payments on this website are processed by STAGE-X. Refundable security deposits are returned within 5 to 7 business days following device return and inspection.</p>
    <h2>4. Hardware Warranty & Care</h2>
    <p>We provide complimentary repair or device swap for regular operational hardware failures. Renter is responsible for reasonable safeguarding of the equipment.</p>
    <h2>5. Governing Law & Jurisdiction</h2>
    <p>These terms are governed by the laws of India, subject to the jurisdiction of courts in Bengaluru, Karnataka.</p>
    <h2>6. Contact & Support Desk</h2>
    <p>For any inquiries regarding these terms or your rental contract: STAGE-X, 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Customer Care: +91 78922 40243 | Email: <a href="mailto:connect@laptoponrent.online">connect@laptoponrent.online</a> (Mon–Sat, 10:00 AM – 7:00 PM IST).</p>
  </main>`,
});

buildPage({
  route: '/privacy',
  title: 'Privacy Policy | LaptopRent (a brand of STAGE-X)',
  description: 'Digital Personal Data Protection Act (DPDP 2023) compliant privacy policy for laptoponrent.online operated by STAGE-X Bengaluru.',
  keywords: 'privacy policy, dpdp 2023, data protection, laptoprent privacy, stage-x privacy',
  canonical: `${BASE}/privacy`,
  ogTitle: 'Privacy Policy | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/privacy`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Privacy Policy', url: `${BASE}/privacy/` },
    ]),
  ],
  body: `
  <main>
    <h1>Privacy Policy</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>1. Introduction & Compliance</h2>
    <p>STAGE-X operates laptoponrent.online in compliance with the Digital Personal Data Protection Act 2023 (DPDP Act) and the Information Technology Act 2000.</p>
    <h2>2. Information We Collect</h2>
    <p>We collect identity details (name, contact information, delivery address), KYC verification documents required for asset rental, and transaction records.</p>
    <h2>3. Payment Data Security</h2>
    <p>Payments on this website are processed by STAGE-X via PCI-DSS compliant gateways (such as Razorpay). We do not store sensitive card PINs, CVVs, or net banking credentials on our servers.</p>
    <h2>4. Data Sanitization Guarantee</h2>
    <p>All returned rental devices undergo certified DoD 5220.22-M / NIST SP 800-88 data sanitization to guarantee complete privacy between rental cycles.</p>
    <h2>5. Grievance Redressal Officer</h2>
    <p>Grievance Officer, STAGE-X, 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038. Email: connect@laptoponrent.online.</p>
  </main>`,
});

buildPage({
  route: '/cancellation-refund-policy',
  title: 'Cancellation & Refund Policy | LaptopRent (a brand of STAGE-X)',
  description: 'Comprehensive cancellation timelines, ₹50 token refund protocol, security deposit return windows, and rental early return terms for LaptopRent operated by STAGE-X Bengaluru.',
  keywords: 'cancellation policy, refund policy, deposit refund, laptop rental cancellation, stage-x refunds',
  canonical: `${BASE}/cancellation-refund-policy`,
  ogTitle: 'Cancellation & Refund Policy | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/cancellation-refund-policy`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Cancellation & Refund Policy', url: `${BASE}/cancellation-refund-policy/` },
    ]),
  ],
  body: `
  <main>
    <h1>Cancellation & Refund Policy</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>1. ₹50 Token Advance Refund</h2>
    <p>If you cancel prior to dispatch, or if verification cannot be completed, the ₹50 token is refunded 100% within 24 to 48 hours to the original payment source.</p>
    <h2>2. Security Deposit Refund</h2>
    <p>Security deposits are processed for 100% refund within 5 to 7 business days following device return and physical inspection. Normal wear-and-tear is never deducted.</p>
    <h2>3. Early Return & Lease Termination</h2>
    <p>Subscriptions can be adjusted with standard 7 days advance notice. Unused tenure balance is reconciled transparently.</p>
    <h2>4. How to Request a Refund</h2>
    <p>Reach out to connect@laptoponrent.online or WhatsApp +91 78922 40243 with your booking reference.</p>
  </main>`,
});

buildPage({
  route: '/delivery-policy',
  title: 'Doorstep Delivery Policy | LaptopRent (a brand of STAGE-X)',
  description: 'Doorstep delivery timelines, verification protocols, and coverage zones across 25+ Indian cities for LaptopRent operated by STAGE-X Bengaluru.',
  keywords: 'delivery policy, doorstep laptop rental delivery, shipping policy, same day delivery laptops',
  canonical: `${BASE}/delivery-policy`,
  ogTitle: 'Doorstep Delivery Policy | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/delivery-policy`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Delivery Policy', url: `${BASE}/delivery-policy/` },
    ]),
  ],
  body: `
  <main>
    <h1>Delivery & Logistics Policy</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>1. Free Doorstep Delivery & Pickup</h2>
    <p>Complimentary delivery and pickup across 25+ Indian cities. Zero courier or hidden fees on standard rental agreements.</p>
    <h2>2. Same-Day Delivery Cutoff</h2>
    <p>Orders verified by 2:00 PM IST receive same-day delivery in major metro areas (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai). Next-day delivery across other cities.</p>
    <h2>3. Delivery Handover & Inspection</h2>
    <p>Each laptop is delivered sanitized with charger, accessories, and pre-installed OS. The customer inspects physical and booting condition upon delivery.</p>
    <h2>4. Logistics Desk</h2>
    <p>STAGE-X, Indiranagar Bengaluru. Email: connect@laptoponrent.online | WhatsApp: +91 78922 40243.</p>
  </main>`,
});

buildPage({
  route: '/pricing-disclaimer',
  title: 'Pricing & Billing Disclaimer | LaptopRent (a brand of STAGE-X)',
  description: 'Transparent monthly rental rates, ₹50 token credit policy, security deposit terms, and final pricing for LaptopRent operated by STAGE-X Bengaluru.',
  keywords: 'pricing disclaimer, laptop rental prices, deposit terms, stage-x pricing',
  canonical: `${BASE}/pricing-disclaimer`,
  ogTitle: 'Pricing & Billing Disclaimer | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/pricing-disclaimer`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Pricing Disclaimer', url: `${BASE}/pricing-disclaimer/` },
    ]),
  ],
  body: `
  <main>
    <h1>Pricing, Deposits & Billing Disclaimer</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>1. Transparent Monthly Rental Structure</h2>
    <p>Student laptops from ₹849/mo, corporate business laptops from ₹1,200/mo, Apple MacBook Air from ₹2,999/mo, MacBook Pro from ₹4,500/mo, and gaming rigs from ₹3,500/mo.</p>
    <h2>2. ₹50 Reservation Token Advance</h2>
    <p>The ₹50 token confirms reservation and is 100% credited against your 1st month rental invoice. Refunded in 24-48 hours if cancelled before dispatch.</p>
    <h2>3. Taxes & Final Pricing</h2>
    <p>Rent and security deposits are the final amount payable – no GST is added. The deposit is refunded within 7 working days of return.</p>
    <h2>4. Payment Processing</h2>
    <p>Payments on this website are processed by STAGE-X via Razorpay. Support: connect@laptoponrent.online.</p>
  </main>`,
});


buildPage({
  route: '/pricing',
  title: 'Laptop Rental Pricing & Security Deposit Rates | LaptopRent',
  description: 'View complete rental rates and refundable security deposits for 32+ laptop models. Prices from ₹799/month. Rent and deposit are final – no GST added.',
  keywords: 'laptop rental pricing, laptop rent per month, security deposit laptops, laptoprent rates',
  canonical: `${BASE}/pricing`,
  ogTitle: 'Laptop Rental Pricing & Security Deposit Rates | LaptopRent',
  ogUrl: `${BASE}/pricing`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Pricing', url: `${BASE}/pricing/` },
    ]),
  ],
  body: `
  <main>
    <h1>Product & Pricing Schedule</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Customer Care: +91 78922 40243 · connect@laptoponrent.online.</strong>
    </div>
    <p>Rent premium laptops from ₹799 to ₹1,899 per month with transparent, 100% refundable security deposits.</p>
    <div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:1rem;margin:1rem 0;">
      <strong>Pricing Guarantee:</strong> Rent and deposit are the final amount payable – no GST is added. The deposit is refunded within 7 working days of return.
    </div>
    <h2>Featured Laptop Rates</h2>
    <ul>
      <li>ASUS VivoBook 15: Rent ₹799/month · Refundable Deposit ₹2,000</li>
      <li>Dell Latitude 5430: Rent ₹999/month · Refundable Deposit ₹3,000</li>
      <li>HP EliteBook 840 G9: Rent ₹1,199/month · Refundable Deposit ₹4,000</li>
      <li>MacBook Air M2: Rent ₹1,899/month · Refundable Deposit ₹5,000</li>
      <li>MacBook Pro 16 M4: Rent ₹1,899/month · Refundable Deposit ₹5,000</li>
      <li>HP ZBook Fury 16: Rent ₹1,899/month · Refundable Deposit ₹5,000</li>
    </ul>
    <p><a href="/booking">Book a Laptop Online</a></p>
  </main>`,
});

buildPage({
  route: '/booking',
  title: 'Book a Laptop on Rent | Online Reservation | LaptopRent',
  description: 'Book your rental laptop online. All mandatory customer details, doorstep delivery date, and instant order summary. Powered by STAGE-X.',
  keywords: 'book laptop rental, rent a laptop online, laptop reservation, laptoprent booking',
  canonical: `${BASE}/booking`,
  ogTitle: 'Book a Laptop on Rent | Online Reservation | LaptopRent',
  ogUrl: `${BASE}/booking`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Booking', url: `${BASE}/booking/` },
    ]),
  ],
  body: `
  <main>
    <h1>Book Your Rental Laptop</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Customer Care: +91 78922 40243 · connect@laptoponrent.online.</strong>
    </div>
    <p>Complete your booking online with doorstep delivery across major Indian cities.</p>
    <p>You are paying STAGE-X (laptoponrent.online). Rent and the refundable security deposit are the final amount payable – no GST is added. Your laptop will be delivered by a rental partner in your city.</p>
  </main>`,
});

buildPage({
  route: '/book',
  title: 'Book a Laptop on Rent | Online Reservation | LaptopRent',
  description: 'Book your rental laptop online. Powered by STAGE-X.',
  canonical: `${BASE}/book`,
  jsonLd: [],
  body: `<main><h1>Redirecting to Booking...</h1><p><a href="/booking">Click here to book a laptop</a></p></main>`,
});

buildPage({
  route: '/damage-protection-policy',
  title: 'Damage Protection & Hardware Warranty Policy | LaptopRent (a brand of STAGE-X)',
  description: 'Comprehensive damage protection, hardware defect replacement guarantee, and repair guidelines for LaptopRent operated by STAGE-X Bengaluru.',
  keywords: 'damage protection, hardware warranty, laptop repair policy, replacement guarantee, stage-x warranty',
  canonical: `${BASE}/damage-protection-policy`,
  ogTitle: 'Damage Protection & Hardware Warranty Policy | LaptopRent (a brand of STAGE-X)',
  ogUrl: `${BASE}/damage-protection-policy`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Damage Protection Policy', url: `${BASE}/damage-protection-policy/` },
    ]),
  ],
  body: `
  <main>
    <h1>Damage Protection & Hardware Warranty Policy</h1>
    <div class="policy-owner" style="background:#eff6ff;border-left:4px solid #2563eb;padding:1rem;margin-bottom:1.5rem;font-size:0.9rem;">
      <strong>These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: connect@laptoponrent.online.</strong>
    </div>
    <h2>1. 100% Free Hardware Defect Guarantee</h2>
    <p>Internal hardware malfunctions (RAM, SSD, motherboard, thermal fans, battery failure) under normal use are repaired or swapped at zero cost to the customer within 24-48 hours.</p>
    <h2>2. Normal Wear vs Physical Damage</h2>
    <p>Normal wear-and-tear is accepted with zero charges. Accidental damage (screen cracks, liquid spills) is repaired at actual OEM cost without administrative surcharges.</p>
    <h2>3. Incident Reporting</h2>
    <p>Report issues to WhatsApp +91 78922 40243 or connect@laptoponrent.online for swift remote diagnostics or doorstep device swap.</p>
  </main>`,
});


buildPage({
  route: '/urgent-laptop-rental',
  title: 'Urgent Laptop on Rent | 2-Hour Emergency Delivery in 25+ Cities | LaptopRent',
  description: 'Need a laptop urgently today? LaptopRent provides emergency same-day laptop rentals with 2 to 4-hour doorstep delivery across 25+ Indian cities. Zero deposit for corporate accounts.',
  keywords: 'urgent laptop on rent, emergency laptop rental, same day laptop delivery, rent laptop 2 hours, laptop rent near me urgent, urgent macbook rental, laptop rent today, laptop kharab ho gaya rent chahiye',
  canonical: `${BASE}/urgent-laptop-rental`,
  ogTitle: 'Urgent Laptop on Rent | 2-Hour Emergency Delivery | LaptopRent',
  ogUrl: `${BASE}/urgent-laptop-rental`,
  jsonLd: [
    generateBreadcrumbSchema([
      { name: 'Home', url: `${BASE}/` },
      { name: 'Urgent Laptop Rental', url: `${BASE}/urgent-laptop-rental` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Emergency & Urgent Laptop Rental',
      description: 'Same-day 2 to 4-hour doorstep emergency laptop delivery across 25+ Indian cities.',
      url: `${BASE}/urgent-laptop-rental`,
      provider: { '@type': 'Organization', name: 'LaptopRent', url: BASE },
      areaServed: 'IN',
      serviceType: 'Urgent Laptop Rental',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: '99',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE}/urgent-laptop-rental/#webpage`,
      url: `${BASE}/urgent-laptop-rental`,
      name: 'Urgent Laptop on Rent | 2-Hour Emergency Delivery',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.geo-answer-first', '.emergency-hotline', '.urgent-faq-q', '.urgent-faq-a'],
      },
    },
    generateFAQSchema(),
  ],
  body: `
  <main>
    <h1>Urgent Laptop on Rent – Same-Day Express Delivery</h1>
    
    <div class="geo-answer-first" style="background:#fef2f2;border-left:4px solid #ef4444;padding:1.25rem;margin:1rem 0;border-radius:8px;">
      <p style="margin:0 0 10px 0;font-size:1.1rem;font-weight:700;color:#991b1b;">
        ⚡ Laptop Crashed or Urgent Deadline? We Deliver in 2 to 4 Hours!
      </p>
      <p style="margin:0;font-size:0.98rem;color:#334155;line-height:1.75;">
        <strong>Direct Answer:</strong> LaptopRent provides rapid emergency laptop rentals across <strong>25+ Indian cities</strong> (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad). If your machine stopped working or you have an emergency hackathon, exam, or audit, our logistics team dispatches ready-to-use, fully configured Core i5/i7 laptops or Apple MacBooks directly to your doorstep in <strong>2 to 4 hours</strong>.
      </p>
      <div class="emergency-hotline" style="display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;align-items:center;">
        <a href="https://wa.me/917892240243?text=EMERGENCY%20LAPTOP%20RENTAL%3A%20I%20need%20a%20laptop%20urgently%20today" style="display:inline-flex;align-items:center;background:#16a34a;color:#ffffff;padding:12px 22px;border-radius:6px;font-weight:700;text-decoration:none;font-size:1rem;box-shadow:0 4px 12px rgba(22,163,74,0.3);">
          💬 WhatsApp for 2-Hour Dispatch →
        </a>
        <a href="tel:+917892240243" style="display:inline-flex;align-items:center;background:#dc2626;color:#ffffff;padding:12px 22px;border-radius:6px;font-weight:700;text-decoration:none;font-size:1rem;">
          📞 Call Hotline: +91-78922-40243
        </a>
        <a href="/booking/?priority=urgent" style="display:inline-flex;align-items:center;background:#f8fafc;color:#1e293b;border:1px solid #cbd5e1;padding:11px 18px;border-radius:6px;font-weight:600;text-decoration:none;font-size:0.95rem;">
          Book Online Now
        </a>
      </div>
    </div>

    <h2>Emergency Machine Dispatch Tiers (Ready in Stock)</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;margin:1.5rem 0;">
      <div style="border:1px solid #e2e8f0;padding:20px;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;font-size:0.8rem;font-weight:700;">2-HOUR DISPATCH</span>
        <h3 style="margin:10px 0 6px 0;">Standard Business Laptop</h3>
        <p style="margin:0 0 10px 0;color:#64748b;font-size:0.9rem;">Dell Latitude / HP ProBook · Core i5 · 8GB/16GB RAM · 256GB SSD</p>
        <div style="font-size:1.3rem;font-weight:800;color:#16a34a;">₹99 <small style="font-size:0.85rem;color:#64748b;">/ day</small></div>
        <p style="margin:8px 0 0 0;font-size:0.85rem;color:#475569;">✓ Windows 11, MS Office, Zoom pre-installed</p>
      </div>

      <div style="border:1px solid #e2e8f0;padding:20px;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;font-size:0.8rem;font-weight:700;">2-HOUR DISPATCH</span>
        <h3 style="margin:10px 0 6px 0;">Performance Workstation</h3>
        <p style="margin:0 0 10px 0;color:#64748b;font-size:0.9rem;">Lenovo ThinkPad / Dell Precision · Core i7 · 16GB/32GB RAM · 512GB SSD</p>
        <div style="font-size:1.3rem;font-weight:800;color:#16a34a;">₹149 <small style="font-size:0.85rem;color:#64748b;">/ day</small></div>
        <p style="margin:8px 0 0 0;font-size:0.85rem;color:#475569;">✓ Heavy coding, Docker, testing ready</p>
      </div>

      <div style="border:1px solid #e2e8f0;padding:20px;border-radius:8px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:4px;font-size:0.8rem;font-weight:700;">2-HOUR DISPATCH</span>
        <h3 style="margin:10px 0 6px 0;">Apple MacBook Air / Pro</h3>
        <p style="margin:0 0 10px 0;color:#64748b;font-size:0.9rem;">M1 / M2 / M3 Chip · Retina Display · 18hr Battery Backup</p>
        <div style="font-size:1.3rem;font-weight:800;color:#16a34a;">₹299 <small style="font-size:0.85rem;color:#64748b;">/ day</small></div>
        <p style="margin:8px 0 0 0;font-size:0.85rem;color:#475569;">✓ Xcode, Final Cut, iOS dev ready</p>
      </div>
    </div>

    <h2>How Emergency Delivery Works in 3 Simple Steps</h2>
    <ol style="line-height:1.85;padding-left:1.25rem;">
      <li><strong>Instant Requirement Check:</strong> WhatsApp or call our urgent hotline (+91 78922 40243) with your city and machine requirements.</li>
      <li><strong>Rapid 5-Minute Digital KYC:</strong> Submit Aadhaar/PAN (for individuals) or Company GSTIN/Work email (for 100% Zero-Deposit corporate pass).</li>
      <li><strong>Express Doorstep Delivery:</strong> Our nearest local hub dispatches an executive on a two-wheeler with your sanitized laptop, original charger, and optical mouse.</li>
    </ol>

    <h2>Zero Security Deposit for Corporate Emergency Orders</h2>
    <p>If you are a startup, SME, or enterprise with a valid GSTIN or verified corporate email, you qualify for our <strong>Zero Deposit Emergency Rental Pass</strong>. No deposit lock-up; transparent daily or weekly invoicing with 18% GST Input Tax Credit.</p>

    <h2>Cities with 2 to 4-Hour Express Delivery</h2>
    <p>${INDIAN_CITIES.slice(0, 15).map(c => `<a href="/rental/${c.slug}/">${esc(c.name)}</a>`).join(', ')} and 10+ more cities nationwide.</p>

    <h2>Frequently Asked Questions on Urgent Laptop Rentals</h2>
    <h3 class="urgent-faq-q">How fast can I get a laptop delivered to my location?</h3>
    <p class="urgent-faq-a">In Tier-1 metro cities (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata), we dispatch via express intra-city courier within 2 to 4 hours of digital verification.</p>

    <h3 class="urgent-faq-q">Can I rent a laptop for just 1 single day?</h3>
    <p class="urgent-faq-a">Yes. We accommodate 1-day emergency rentals starting at ₹99/day for exams, job interviews, presentations, or temporary hardware breakdowns.</p>

    <h3 class="urgent-faq-q">What software is pre-loaded on the rental laptop?</h3>
    <p class="urgent-faq-a">Every laptop arrives fully factory-reset and pre-loaded with Windows 11/macOS, Google Chrome, Zoom, MS Teams, and Office suite. Specific developer IDEs (VS Code, Python, Node.js) can be pre-configured on request.</p>
  </main>`,
});

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

// Only the top-level pages that no child sitemap owns. Cities, categories and
// the blog (including its category hubs) each have a dedicated child sitemap, so
// re-listing them here duplicated 40 URLs across the sitemap set.
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap([
  { url: '/', priority: 1.0, freq: 'daily' },
  { url: '/products', priority: 0.9 },
  { url: '/categories', priority: 0.9 },
  { url: '/cities', priority: 0.9 },
  { url: '/pricing', priority: 0.8 },
  { url: '/booking', priority: 0.8 },
  { url: '/about', priority: 0.8 },
  { url: '/contact', priority: 0.8 },
  { url: '/terms', priority: 0.7 },
  { url: '/privacy', priority: 0.7 },
  { url: '/cancellation-refund-policy', priority: 0.7 },
  { url: '/delivery-policy', priority: 0.7 },
  { url: '/pricing-disclaimer', priority: 0.7 },
  { url: '/damage-protection-policy', priority: 0.7 },
  { url: '/urgent-laptop-rental', priority: 0.9, freq: 'weekly' },
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

// The catalog and every product page are now prerendered, so they belong in the
// sitemap set. `/products` stays in sitemap.xml with the other top-level pages;
// only the individual model URLs go in the child sitemap.
writeFileSync(resolve(DIST, 'sitemap-products.xml'), sitemap(
  MOCK_PRODUCTS.map(p => ({ url: `/products/${p.id}`, priority: 0.8, freq: 'weekly' })),
));

writeFileSync(resolve(DIST, 'sitemap-index.xml'), sitemapIndex([
  'sitemap.xml',
  'sitemap-cities.xml',
  'sitemap-categories.xml',
  'sitemap-blog.xml',
  'sitemap-products.xml',
]));

// Every URL must be claimed by exactly one child sitemap. A URL in two sitemaps
// wastes crawl budget and is treated as a low-quality sitemap set.
{
  const seen = new Map<string, string>();
  const dupes: string[] = [];
  for (const name of ['sitemap.xml', 'sitemap-cities.xml', 'sitemap-categories.xml', 'sitemap-blog.xml', 'sitemap-products.xml']) {
    const body = readFileSync(resolve(DIST, name), 'utf8');
    for (const m of body.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = m[1];
      const owner = seen.get(url);
      if (owner) dupes.push(`${url} (in ${owner} and ${name})`);
      else seen.set(url, name);
    }
  }
  if (dupes.length) {
    console.error(`\nREFUSING TO WRITE - ${dupes.length} duplicate URLs across sitemaps:`);
    for (const d of dupes) console.error(`  ${d}`);
    process.exit(1);
  }
  console.log(`Sitemaps generated: ${seen.size} unique URLs, no cross-sitemap duplicates.`);
}

// ---- Ontology and Knowledge Graph Triples ---------------------------------
const ontology = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  brand: ORGANIZATION.name,
  legalName: ORGANIZATION.legalName,
  origin: BASE,
  version: '2026-GEO-LLMO-v1',
  description: 'Knowledge Graph & Semantic Entity Ontology for LaptopRent (laptoponrent.online)',
  triples: [
    { subject: 'LaptopRent', predicate: 'providesService', object: 'Laptop Rental (wd:Q1358656)' },
    { subject: 'LaptopRent', predicate: 'providesService', object: 'MacBook Rental (wd:Q11110)' },
    { subject: 'LaptopRent', predicate: 'providesService', object: 'Gaming Laptop Rental (wd:Q1141427)' },
    { subject: 'LaptopRent', predicate: 'providesService', object: 'Workstation Rental (wd:Q192534)' },
    ...INDIAN_CITIES.map(c => ({
      subject: 'LaptopRent',
      predicate: 'operatesInCity',
      object: `${c.name} (${c.wikidata || 'IN'})`,
    })),
    { subject: 'LaptopRent', predicate: 'basePriceStudent', object: '₹849/month' },
    { subject: 'LaptopRent', predicate: 'basePriceBusiness', object: '₹1,200/month' },
    { subject: 'LaptopRent', predicate: 'basePriceMacBook', object: '₹2,999/month' },
    { subject: 'LaptopRent', predicate: 'taxSpecification', object: 'No GST Added - Final Amount Payable' },
    { subject: 'LaptopRent', predicate: 'deliveryModel', object: 'Same-day doorstep delivery' },
    { subject: 'LaptopRent', predicate: 'contactPhone', object: ORGANIZATION.contactPoint.telephone },
  ],
  organization: ORGANIZATION,
  categories: LAPTOP_CATEGORIES,
  cities: INDIAN_CITIES,
};

mkdirSync(resolve(process.cwd(), 'public'), { recursive: true });
writeFileSync(resolve(process.cwd(), 'public/ontology.json'), JSON.stringify(ontology, null, 2), 'utf8');
writeFileSync(resolve(DIST, 'ontology.json'), JSON.stringify(ontology, null, 2), 'utf8');
console.log('✓ Generated ontology.json in public/ and dist/frontend/');

/**
 * GitHub Pages uploads dist/frontend wholesale, so anything left in that
 * directory becomes a live URL. Finder-style duplicates ("sitemap 3.xml",
 * "robots 2.txt", "index 3.html") accumulated there and would publish as
 * indexable junk alongside the real files. Remove them, and any stale copy of
 * a generated sitemap, so the published tree matches the sitemaps exactly.
 */
const junk = readdirSync(DIST, { withFileTypes: true })
  .filter((e) => e.isFile() && /^.+ \d+\.[^.]+$/.test(e.name));
for (const j of junk) {
  unlinkSync(join(DIST, j.name));
  console.log(`removed stray build artifact: ${j.name}`);
}
