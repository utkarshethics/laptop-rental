// Runs after scripts/prerender-seo.ts. Prerenders /category/second-hand-laptops
// and links it from the prerendered homepage, categories index and sitemap.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import {
  SECOND_HAND_FAQS,
  SECOND_HAND_GRADES,
  SECOND_HAND_MIN_PRICE,
  SECOND_HAND_MODELS,
  SECOND_HAND_ROUTE,
  SECOND_HAND_STEPS,
  SECOND_HAND_TRUST,
  formatINR,
} from '../src/frontend/data/second-hand';

const DIST = resolve(process.cwd(), 'dist/frontend');
const BASE = 'https://laptoponrent.online';
const URL = `${BASE}${SECOND_HAND_ROUTE}/`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = (p: string) => readFileSync(resolve(DIST, p), 'utf8');
const write = (p: string, s: string) => {
  const f = resolve(DIST, p);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, s);
};
function mustReplace(html: string, re: RegExp | string, to: string, what: string): string {
  const out = html.replace(re as RegExp, to);
  if (out === html) throw new Error(`prerender-second-hand: could not update ${what}`);
  return out;
}

const LINK_LI = `<li><a href="${SECOND_HAND_ROUTE}/">Buy Second-Hand Laptops</a> - Certified, quality-checked used laptops from Dell, HP, Lenovo, Apple and ASUS with warranty. From ${formatINR(SECOND_HAND_MIN_PRICE)}.</li>`;

// ---- The page itself, built from the prerendered categories index as a shell ----
const TITLE = 'Buy Second-Hand Laptops in India | Certified Refurbished | LaptopRent';
const DESC = 'Buy certified second-hand and refurbished laptops from Dell, HP, Lenovo, Apple and ASUS. Quality-checked, warranty included, doorstep delivery across 25+ Indian cities.';
const KEYWORDS = 'second hand laptop, used laptop, refurbished laptop, buy used laptop india, second hand macbook, refurbished thinkpad, second hand laptop bangalore';
const OG_TITLE = 'Buy Certified Second-Hand Laptops | LaptopRent';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${URL}#webpage`,
      url: URL,
      name: TITLE,
      description: DESC,
      isPartOf: { '@id': `${BASE}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Categories', item: `${BASE}/categories/` },
        { '@type': 'ListItem', position: 3, name: 'Second-Hand Laptops', item: URL },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Second-Hand Laptops',
      itemListElement: SECOND_HAND_MODELS.map((m, i) => ({
        '@type': 'ListItem', position: i + 1, name: `${m.brand} ${m.name} (second-hand)`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: SECOND_HAND_FAQS.map(f => ({
        '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

const body = `
  <main>
    <h1>Certified Second-Hand Laptops — Quality-Checked, Ready to Use</h1>
    <p>Business-grade Dell, HP, Lenovo, Apple and ASUS laptops at a fraction of the new price. Every unit is tested,
    cleaned, graded honestly and delivered to your door with warranty.</p>
    <ul>
      ${SECOND_HAND_TRUST.map(t => `<li><strong>${esc(t.title)}</strong> - ${esc(t.text)}</li>`).join('\n      ')}
    </ul>
    <h2>Popular second-hand models</h2>
    <p>Indicative starting prices. Availability, grade and final price of a specific unit are confirmed on WhatsApp before you pay.</p>
    <ul>
      ${SECOND_HAND_MODELS.map(m => `<li><strong>${esc(m.brand)} ${esc(m.name)}</strong> - ${esc(m.specs.join(', '))} - from ${formatINR(m.priceFrom)}</li>`).join('\n      ')}
    </ul>
    <h2>How we grade every laptop</h2>
    ${SECOND_HAND_GRADES.map(g => `<h3>${esc(g.name)}</h3><p>${esc(g.text)}</p>`).join('\n    ')}
    <h2>How buying works</h2>
    <ol>
      ${SECOND_HAND_STEPS.map(s => `<li><strong>${esc(s.title)}</strong> - ${esc(s.text)}</li>`).join('\n      ')}
    </ol>
    <h2>Frequently asked questions</h2>
    ${SECOND_HAND_FAQS.map(f => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('\n    ')}
    <p>Call or WhatsApp +91-78922-40243, or email connect@laptoponrent.online. Prefer to rent?
    See <a href="/categories/">all rental categories</a>.</p>
  </main>`;

let page = read('categories/index.html');
page = mustReplace(page, /<title>[\s\S]*?<\/title>/, `<title>${TITLE}</title>`, 'title');
page = mustReplace(page, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(DESC)}" />`, 'description');
page = page.replace(/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${esc(KEYWORDS)}" />`);
page = mustReplace(page, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${URL}" />`, 'canonical');
page = page.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(OG_TITLE)}" />`);
page = page.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(DESC)}" />`);
page = page.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${URL}" />`);
page = page.replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${URL}" />`);
page = page.replace(/<meta property="twitter:url"[^>]*>/, `<meta property="twitter:url" content="${URL}" />`);
page = page.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(OG_TITLE)}" />`);
page = page.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(DESC)}" />`);
page = page.replace(/<link rel="alternate" hreflang[^>]*>\s*/g, '');
page = mustReplace(
  page,
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n    ${JSON.stringify(graph, null, 2)}\n    </script>`,
  'structured data',
);
page = mustReplace(
  page,
  /<div class="seo-static">[\s\S]*?<\/main>\s*<\/div>/,
  `<div class="seo-static">${body}</div>`,
  'page body',
);
write(`${SECOND_HAND_ROUTE.replace(/^\//, '')}/index.html`, page);
console.log(`  prerender -> ${SECOND_HAND_ROUTE}`);

// ---- Link it from the homepage and the categories index ----
{
  let home = read('index.html');
  home = mustReplace(
    home,
    /(<h2>Laptop rental categories<\/h2>\s*<ul>[\s\S]*?)(\s*<\/ul>)/,
    `$1\n        ${LINK_LI}$2\n\n      <h2>Want to own instead of rent?</h2>\n      <p>LaptopRent also sells certified second-hand laptops: quality-checked Dell, HP, Lenovo and MacBook models from ${formatINR(SECOND_HAND_MIN_PRICE)}, with warranty, 7-day replacement and doorstep delivery. <a href="${SECOND_HAND_ROUTE}/">Browse second-hand laptops</a>.</p>`,
    'homepage categories list',
  );
  write('index.html', home);

  let cats = read('categories/index.html');
  cats = mustReplace(
    cats,
    /(<div class="seo-static">[\s\S]*?<ul>[\s\S]*?)(\s*<\/ul>)/,
    `$1\n        ${LINK_LI}$2`,
    'categories index list',
  );
  write('categories/index.html', cats);
}

// ---- Sitemap ----
{
  const today = new Date().toISOString().slice(0, 10);
  let sm = read('sitemap-categories.xml');
  if (!sm.includes(URL)) {
    sm = mustReplace(
      sm,
      '</urlset>',
      `  <url>\n    <loc>${URL}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`,
      'sitemap',
    );
    write('sitemap-categories.xml', sm);
  }
}
console.log('Second-hand laptops page prerendered and linked.');
