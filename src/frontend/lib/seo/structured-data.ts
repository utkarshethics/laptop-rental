import type { CityMeta } from '../../data/seo-data';
import { ORGANIZATION, FAQ_QUESTIONS, LAPTOP_CATEGORIES, CITY_META } from '../../data/seo-data';

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
  image: string | string[];
  url: string;
  category: string;
  rentalPeriod: string;
  rating?: number;
  reviewCount?: number;
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
    // Aggregate rating is only emitted when the caller supplies the product's
    // real rating. It previously shipped hardcoded 4.5/127 with a fabricated
    // review attached, which is invalid review markup on every product page.
    ...(product.rating && product.reviewCount ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(product.rating),
        reviewCount: String(product.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
    } : {}),
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
// ---------------------------------------------------------------------------
// Entity graph assembly
//
// The generators above each return a standalone document, so every page used
// to emit several separate ld+json blocks in which the organization was
// re-declared inline as an unrelated node each time. Nothing shared an @id, so
// no engine could tell that the "LaptopRent" in the Service, the Brand and the
// publisher was the same company.
//
// buildEntityGraph folds the per-page documents into a single @graph, gives
// every top-level node an @id, and rewrites repeated inline copies of the
// global entities as references to one page-independent node. Nested values
// keep no @id, so every reference always resolves inside the same graph.
// ---------------------------------------------------------------------------

const BASE = 'https://laptoponrent.online';

type Json = Record<string, unknown>;

const typeOf = (n: Json): string[] => (Array.isArray(n['@type']) ? (n['@type'] as string[]) : [String(n['@type'] ?? '')]);

/** Page-independent entities: the same node on every page of the site. */
const GLOBAL_SLUG: Record<string, string> = {
  Organization: 'organization',
  WebSite: 'website',
  Brand: 'brand',
};

const slugify = (s: string) => s.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

const GLOBAL_SLUG_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(GLOBAL_SLUG).map(([t, s]) => [s, t]),
);

const isBareRef = (v: unknown): v is Json =>
  !!v && typeof v === 'object' && !Array.isArray(v)
  && typeof (v as Json)['@id'] === 'string' && Object.keys(v as Json).length === 1;

/** True for an inline copy of one of the global entities. */
function isGlobalCopy(v: unknown, slug: string): boolean {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Json;
  // Checked inline rather than via the isBareRef type guard, which would narrow
  // this branch to `never` and make every property access below an error.
  if (typeof o['@id'] === 'string' && Object.keys(o).length === 1) return false;
  if (!typeOf(o).some((t) => GLOBAL_SLUG[t] === slug)) return false;
  return o['name'] === ORGANIZATION.name || slug === 'website' || slug === 'brand';
}

/** Replace inline duplicates of a global entity with a reference to its @id. */
function derefGlobals(node: unknown, globalIds: Map<string, string>, selfId?: string): unknown {
  if (Array.isArray(node)) return node.map((v) => derefGlobals(v, globalIds, selfId));
  if (!node || typeof node !== 'object') return node;
  const o = node as Json;
  for (const [slug, id] of globalIds) {
    // Never rewrite a node into a reference to itself: the page's own
    // Organization/WebSite node is a global copy too, and collapsing it leaves a
    // bare {"@id": ...} node with no @type, which is not a valid entity.
    if (id === selfId) continue;
    if (isGlobalCopy(o, slug)) return { '@id': id };
  }
  const out: Json = {};
  for (const [k, v] of Object.entries(o)) out[k] = derefGlobals(v, globalIds, selfId);
  return out;
}

export function buildEntityGraph(
  schemas: unknown[],
  opts: { url: string; name?: string; description?: string; isHome?: boolean },
) {
  // Flatten, and separate real definitions from bare references. The React
  // SEO layer emits a nested @graph whose first entries are nothing but
  // {"@id": "...#organization"} with no @type and no properties, i.e.
  // references to entities it never defines.
  const flat: Json[] = [];
  const pendingRefs = new Set<string>();
  const push = (n: Json) => {
    if (Array.isArray(n['@graph'])) { (n['@graph'] as Json[]).forEach(push); return; }
    const bare = isBareRef(n);
    if (bare) {
      const id = n['@id'] as string;
      if (id.startsWith(`${BASE}/#`)) pendingRefs.add(id);
      return;
    }
    flat.push(n);
  };
  schemas.filter(Boolean).forEach((s) => {
    const c = { ...(s as Json) };
    delete c['@context'];
    push(c);
  });

  // A breadcrumb that only points at the homepage describes no trail, so the
  // homepage does not emit one.
  const kept = opts.isHome
    ? flat.filter((d) => !typeOf(d).includes('BreadcrumbList'))
    : flat;

  // Pass 1: which global entities does this page declare?
  const globalIds = new Map<string, string>();
  for (const d of kept) {
    for (const t of typeOf(d)) {
      const slug = GLOBAL_SLUG[t];
      if (slug && !globalIds.has(slug)) globalIds.set(slug, `${BASE}/#${slug}`);
    }
  }
  // A reference to a global entity counts as a need for it, even when this
  // page never defines it.
  for (const id of pendingRefs) {
    const slug = id.slice(`${BASE}/#`.length);
    if (GLOBAL_SLUG_BY_SLUG[slug]) globalIds.set(slug, id);
  }

  // Pass 2: give every top-level node an @id.
  const used = new Set<string>();
  const graph: Json[] = kept.map((d) => {
    const types = typeOf(d);
    const node: Json = {};
    for (const [k, v] of Object.entries(d)) {
      if (k === '@id') continue;
      if (k === '@type' && types.some((t) => GLOBAL_SLUG[t])) continue;
      node[k] = v;
    }
    const global = types.map((t) => GLOBAL_SLUG[t]).find(Boolean);
    if (global) {
      node['@type'] = types.find((t) => !GLOBAL_SLUG[t]) ?? types[0];
      node['@id'] = globalIds.get(global)!;
    } else {
      const base = `${opts.url}#${slugify(types[0] || 'entity')}`;
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      node['@id'] = id;
    }
    return node;
  });

  // Hoist any global entity that other nodes will reference but this page never
  // declared at the top level, so no reference dangles.
  for (const [slug, id] of globalIds) {
    if (graph.some((g) => g['@id'] === id)) continue;
    if (slug === 'organization') {
      graph.unshift({
        '@type': 'Organization', '@id': id, name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName, url: ORGANIZATION.url,
        logo: ORGANIZATION.logo, sameAs: ORGANIZATION.sameAs,
        contactPoint: ORGANIZATION.contactPoint, address: ORGANIZATION.address,
        foundingDate: ORGANIZATION.foundingDate, founders: ORGANIZATION.founders,
      });
    } else if (slug === 'website') {
      graph.unshift({ '@type': 'WebSite', '@id': id, url: `${BASE}/`, name: ORGANIZATION.name });
    } else {
      graph.unshift({ '@type': 'Brand', '@id': id, name: ORGANIZATION.name });
    }
  }

  const derefed = graph.map((n) =>
    derefGlobals(n, globalIds, n['@id'] as string | undefined) as Json);

  // Resolve the remaining dangling references. The React layer points at
  // bare-origin ids such as .../#faqpage and .../#localbusiness, but the
  // entities it means are page-scoped and were assigned .../<path>/#faqpage.
  // Map each such reference onto the node actually declared on this page, and
  // drop it if the page declares no such entity.
  const defined = new Set(derefed.map((n) => n['@id'] as string));
  const bySlug = new Map<string, string>();
  for (const n of derefed) {
    const id = n['@id'] as string;
    const frag = id.includes('#') ? id.slice(id.indexOf('#') + 1) : '';
    if (frag && !bySlug.has(frag)) bySlug.set(frag, id);
  }
  const rebase = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(rebase);
    if (!node || typeof node !== 'object') return node;
    if (isBareRef(node)) {
      const id = node['@id'] as string;
      if (defined.has(id)) return node;
      const frag = id.includes('#') ? id.slice(id.indexOf('#') + 1) : '';
      const target = bySlug.get(frag);
      return target ? { '@id': target } : undefined;
    }
    const out: Json = {};
    for (const [k, v] of Object.entries(node as Json)) {
      const r = rebase(v);
      if (r !== undefined) out[k] = r;
    }
    return out;
  };
  for (let i = 0; i < derefed.length; i++) derefed[i] = rebase(derefed[i]) as Json;

  const has = (t: string) => derefed.some((n) => typeOf(n).includes(t));
  const firstId = (t: string) => derefed.find((n) => typeOf(n).includes(t))?.['@id'];

  // Every page states which page it is, and what it is about.
  const webPage: Json = {
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    ...(opts.name ? { name: opts.name } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    inLanguage: 'en-IN',
  };
  const main = firstId('Service') || firstId('Product') || firstId('BlogPosting') || firstId('ItemList');
  if (main) webPage.mainEntity = { '@id': main };
  if (has('BreadcrumbList')) webPage.breadcrumb = { '@id': `${opts.url}#breadcrumb` };
  derefed.push(webPage);

  return { '@context': 'https://schema.org', '@graph': derefed };
}
