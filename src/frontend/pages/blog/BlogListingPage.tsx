import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, CITY_META, INDIAN_CITIES, FAQ_QUESTIONS, LAPTOP_CATEGORIES } from '../../data/seo-data';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema as genArticle } from '../../lib/seo/structured-data';
import { format } from 'date-fns';

interface BlogListingProps {
  category?: string;
  tag?: string;
  page?: number;
}

export function BlogListingPage({ category, tag, page = 1 }: BlogListingProps) {
  let filteredPosts = BLOG_POSTS;
  if (category) {
    filteredPosts = filteredPosts.filter(p => p.category === category);
  }

  const categories = [...new Set(BLOG_POSTS.map(p => p.category))];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "LaptopRent Blog",
      "description": "Expert guides on laptop rental, MacBook rental, gaming laptops, and tech comparisons in India",
      "url": "https://laptoponrent.online/blog",
      "publisher": {
        "@type": "Organization",
        "name": "LaptopRent",
        "logo": { "@type": "ImageObject", "url": "https://laptoponrent.online/assets/logo.svg" }
      },
      "blogPosts": filteredPosts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `https://laptoponrent.online/blog/${post.slug}`,
        "datePublished": post.date,
        "author": { "@type": "Person", "name": "LaptopRent Team" },
        "articleSection": post.category,
      }))
    }
  ];

  return (
    <>
      <Helmet>
        <title>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Guides` : 'Laptop Rental Blog'} | Expert Guides & Comparisons | LaptopRent</title>
        <meta name="description" content={category ? `Expert ${category} guides for laptop rental in India` : 'Expert guides on laptop rental, MacBook rental, gaming laptops, and tech comparisons in India. Read our latest articles.'} />
        <meta name="keywords" content={category ? `${category} guides, laptop rental ${category}, ${category} comparison` : 'laptop rental blog, macbook rental guide, gaming laptop guide, laptop rental comparison, laptop rental vs buying'} />
        <link rel="canonical" href={`https://laptoponrent.online/blog${category ? `/category/${category}` : ''}${page > 1 ? `?page=${page}` : ''}`} />
        <meta property="og:title" content={category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Guides | LaptopRent Blog` : 'Laptop Rental Blog | Expert Guides & Comparisons'} />
        <meta property="og:description" content={category ? `Expert ${category} guides for laptop rental in India` : 'Expert guides on laptop rental, MacBook rental, gaming laptops, and tech comparisons in India.'} />
        <meta property="og:image" content="https://laptoponrent.online/assets/og-blog.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas, null, 2) }} />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                Laptop Rental <span className="text-blue-600">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Expert guides, comparisons, and city guides for laptop rental in India. Stay updated with latest trends.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    to={`/blog/category/${cat}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Posts */}
              <div className="lg:w-2/3">
                <div className="space-y-8">
                  {filteredPosts.slice(0, 10).map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 flex-shrink-0">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <svg className="w-12 h-12 text-blue-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v2m2 -4a0 0 0 00-2 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-2">
                              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{post.description || 'Read our expert guide on laptop rental in India.'}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                              <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
                            </div>
                            <span className="text-sm text-gray-500">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {filteredPosts.length > 10 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                      Previous
                    </button>
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</span>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:w-1/3">
                <div className="sticky top-24 space-y-8">
                  {/* Categories */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                    <ul className="space-y-2">
                      {categories.map(cat => (
                        <li key={cat}>
                          <Link to={`/blog/category/${cat}`} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${cat === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <span className="capitalize">{cat}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recent Posts */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Posts</h3>
                    <ul className="space-y-3">
                      {BLOG_POSTS.slice(0, 5).map((post) => (
                        <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
                          <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">{post.title}</p>
                          <p className="text-xs text-gray-500">{format(new Date(post.date), 'MMM d, yyyy')} • {post.readTime}</p>
                        </Link>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-blue-600 rounded-xl p-6 text-white">
                    <h3 className="font-bold text-xl mb-2">Stay Updated</h3>
                    <p className="text-blue-100 mb-4">Get latest laptop rental guides and deals in your inbox</p>
                    <form className="flex gap-2">
                      <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg bg-blue-700 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white" />
                      <button type="submit" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50">Subscribe</button>
                    </form>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Weekly Laptop Rental Insights</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join 5,000+ subscribers getting weekly guides on laptop rental, MacBook reviews, and tech comparisons.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" />
              <button type="submit" className="px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors">Subscribe</button>
            </form>
            <p className="text-blue-200 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default BlogListingPage;