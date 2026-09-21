import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://laptoponrent.online';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Indian cities for location pages
const INDIAN_CITIES = [
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka', population: '12M', tier: 1 },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', population: '20M', tier: 1 },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', population: '30M', tier: 1 },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', population: '10M', tier: 1 },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', population: '11M', tier: 1 },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', population: '7M', tier: 1 },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', population: '15M', tier: 1 },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', population: '8M', tier: 1 },
  { slug: 'gurgaon', name: 'Gurgaon', state: 'Haryana', population: '2M', tier: 2 },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', population: '2M', tier: 2 },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', population: '4M', tier: 2 },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', population: '3M', tier: 2 },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', population: '3M', tier: 2 },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', population: '2M', tier: 2 },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', population: '2M', tier: 2 },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', population: '2M', tier: 2 },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab', population: '1M', tier: 2 },
  { slug: 'patna', name: 'Patna', state: 'Bihar', population: '2M', tier: 2 },
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', population: '3M', tier: 2 },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', population: '7M', tier: 1 },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', population: '2M', tier: 2 },
  { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', population: '1M', tier: 3 },
  { slug: 'mysore', name: 'Mysore', state: 'Karnataka', population: '1M', tier: 3 },
  { slug: 'guwahati', name: 'Guwahati', state: 'Assam', population: '1M', tier: 3 },
  { slug: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', population: '1M', tier: 3 },
];

// Laptop categories
const CATEGORIES = [
  { slug: 'macbook-rental', name: 'MacBook Rental', description: 'MacBook Air & Pro rentals' },
  { slug: 'gaming-laptop-rental', name: 'Gaming Laptop Rental', description: 'High-performance gaming laptops' },
  { slug: 'business-laptop-rental', name: 'Business Laptop Rental', description: 'Office & corporate laptops' },
  { slug: 'student-laptop-rental', name: 'Student Laptop Rental', description: 'Affordable laptops for students' },
  { slug: 'gaming-laptop-rental', name: 'Gaming Laptop Rental', description: 'RTX 30/40 series gaming laptops' },
  { slug: 'macbook-air-rental', name: 'MacBook Air Rental', description: 'M1, M2, M3 MacBook Air' },
  { slug: 'macbook-pro-rental', name: 'MacBook Pro Rental', description: 'M1/M2/M3 Pro & Max models' },
  { slug: 'dell-laptop-rental', name: 'Dell Laptop Rental', description: 'XPS, Inspiron, Latitude, Vostro' },
  { slug: 'hp-laptop-rental', name: 'HP Laptop Rental', description: 'Spectre, Envy, Pavilion, ProBook' },
  { slug: 'lenovo-laptop-rental', name: 'Lenovo Laptop Rental', description: 'ThinkPad, IdeaPad, Yoga, Legion' },
  { slug: 'asus-laptop-rental', name: 'ASUS Laptop Rental', description: 'ZenBook, Vivobook, ROG, TUF' },
  { slug: 'acer-laptop-rental', name: 'Acer Laptop Rental', description: 'Swift, Aspire, Predator, Nitro' },
  { slug: 'microsoft-surface-rental', name: 'Surface Laptop Rental', description: 'Surface Laptop, Pro, Book, Go' },
  { slug: 'workstation-rental', name: 'Mobile Workstation Rental', description: 'RTX A-series, Xeon, 32GB+ RAM' },
  { slug: 'budget-laptop-rental', name: 'Budget Laptop Rental', description: 'Under ₹1,500/month laptops' },
];

// Blog categories and posts
const BLOG_POSTS = [
  { slug: 'laptop-rental-vs-buying-india', title: 'Laptop Rental vs Buying in India: Cost Analysis 2024', category: 'guides' },
  { slug: 'best-laptops-for-students-rental', title: 'Best Laptops for Students on Rent in India', category: 'guides' },
  { slug: 'macbook-rental-guide-india', title: 'MacBook Rental in India: Complete Guide 2024', category: 'guides' },
  { slug: 'gaming-laptop-rental-india', title: 'Gaming Laptop Rental in India: RTX 30/40 Series', category: 'guides' },
  { slug: 'laptop-rental-vs-emi-comparison', title: 'Laptop Rental vs EMI: Which Saves More Money?', category: 'comparisons' },
  { slug: 'how-to-choose-rental-laptop', title: 'How to Choose the Right Rental Laptop for Your Needs', category: 'guides' },
  { slug: 'bangalore-laptop-rental-guide', title: 'Laptop Rental in Bangalore: Complete City Guide', category: 'city-guides' },
  { slug: 'mumbai-laptop-rental-guide', title: 'Laptop Rental in Mumbai: Complete City Guide', category: 'city-guides' },
  { slug: 'delhi-laptop-rental-guide', title: 'Laptop Rental in Delhi NCR: Complete Guide', category: 'city-guides' },
  { slug: 'hyderabad-laptop-rental-guide', title: 'Laptop Rental in Hyderabad: Complete Guide', category: 'city-guides' },
  { slug: 'chennai-laptop-rental-guide', title: 'Laptop Rental in Chennai: Complete Guide', category: 'city-guides' },
  { slug: 'pune-laptop-rental-guide', title: 'Laptop Rental in Pune: Complete Guide', category: 'city-guides' },
  { slug: 'corporate-laptop-rental-benefits', title: 'Corporate Laptop Rental: Benefits for Startups & SMEs', category: 'business' },
  { slug: 'event-laptop-rental-guide', title: 'Event Laptop Rental: Conferences, Training & Exams', category: 'events' },
  { slug: 'gst-laptop-rental-india', title: 'GST on Laptop Rental in India: 18% Input Credit Guide', category: 'business' },
  { slug: 'short-term-vs-long-term-rental', title: 'Short-term vs Long-term Laptop Rental: Which is Better?', category: 'comparisons' },
  { slug: 'laptop-rental-deposit-guide', title: 'Laptop Rental Deposit Guide: Refundable Security Deposits', category: 'guides' },
  { slug: 'ram-storage-rental-guide', title: 'RAM & Storage Guide for Rental Laptops: 8GB vs 16GB vs 32GB', category: 'guides' },
  { slug: 'processor-guide-rental-laptops', title: 'Processor Guide: i3 vs i5 vs i7 vs i9 vs M1/M2/M3', category: 'guides' },
  { slug: 'rental-laptop-insurance', title: 'Laptop Rental Insurance & Damage Protection in India', category: 'guides' },
];

function generateUrl(url: string, lastmod: string = LAST_MOD, changefreq: string = 'weekly', priority: number = 0.8): string {
  return `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

function generateMainSitemap(): string {
  const urls = [
    generateUrl('/', LAST_MOD, 'daily', 1.0),
    generateUrl('/laptops', LAST_MOD, 'daily', 0.9),
    generateUrl('/macbooks', LAST_MOD, 'daily', 0.9),
    generateUrl('/categories', LAST_MOD, 'weekly', 0.8),
    generateUrl('/cities', LAST_MOD, 'weekly', 0.8),
    generateUrl('/pricing', LAST_MOD, 'weekly', 0.8),
    generateUrl('/how-it-works', LAST_MOD, 'monthly', 0.7),
    generateUrl('/about', LAST_MOD, 'monthly', 0.6),
    generateUrl('/contact', LAST_MOD, 'monthly', 0.6),
    generateUrl('/faq', LAST_MOD, 'weekly', 0.7),
    generateUrl('/blog', LAST_MOD, 'daily', 0.8),
    generateUrl('/corporate-rental', LAST_MOD, 'weekly', 0.8),
    generateUrl('/event-rental', LAST_MOD, 'weekly', 0.7),
    generateUrl('/student-rental', LAST_MOD, 'weekly', 0.7),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;
}

function generateCitiesSitemap(): string {
  const urls = INDIAN_CITIES.map(city => 
    generateUrl(`/rental/${city.slug}`, LAST_MOD, 'weekly', 0.85)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

function generateCategoriesSitemap(): string {
  const urls = CATEGORIES.map(cat => 
    generateUrl(`/category/${cat.slug}`, LAST_MOD, 'weekly', 0.8)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

function generateBlogSitemap(): string {
  const urls = BLOG_POSTS.map(post => 
    generateUrl(`/blog/${post.slug}`, LAST_MOD, 'monthly', 0.7)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;
}

function generateSitemapIndex(): string {
  const sitemaps = [
    { file: 'sitemap.xml', lastmod: LAST_MOD },
    { file: 'sitemap-cities.xml', lastmod: LAST_MOD },
    { file: 'sitemap-categories.xml', lastmod: LAST_MOD },
    { file: 'sitemap-blog.xml', lastmod: LAST_MOD },
  ];

  const entries = sitemaps.map(sm => `  <sitemap>
    <loc>${BASE_URL}/${sm.file}</loc>
    <lastmod>${sm.lastmod}</lastmod>
  </sitemap>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

// Generate all sitemaps
const publicDir = join(process.cwd(), 'public');

writeFileSync(join(publicDir, 'sitemap.xml'), generateMainSitemap());
writeFileSync(join(publicDir, 'sitemap-cities.xml'), generateCitiesSitemap());
writeFileSync(join(publicDir, 'sitemap-categories.xml'), generateCategoriesSitemap());
writeFileSync(join(publicDir, 'sitemap-blog.xml'), generateBlogSitemap());
writeFileSync(join(publicDir, 'sitemap-index.xml'), generateSitemapIndex());

console.log('✅ Sitemaps generated successfully!');
console.log(`- sitemap.xml (${INDIAN_CITIES.length + CATEGORIES.length + BLOG_POSTS.length + 14} URLs)`);
console.log(`- sitemap-cities.xml (${INDIAN_CITIES.length} city pages)`);
console.log(`- sitemap-categories.xml (${CATEGORIES.length} category pages)`);
console.log(`- sitemap-blog.xml (${BLOG_POSTS.length} blog posts)`);
console.log('- sitemap-index.xml (index file)');