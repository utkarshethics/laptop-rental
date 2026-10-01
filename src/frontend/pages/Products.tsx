import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card, ProductCard } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { WhatsAppFloat } from '@/components/whatsapp/WhatsAppFloat';
import { formatCurrency, cn } from '@/lib/utils';
import { MOCK_PRODUCTS } from '@/data/products';
import { Brand, Category, ProductFilters } from '@/types';

const BRANDS: { value: Brand; label: string }[] = [
  { value: 'HP', label: 'HP' },
  { value: 'Dell', label: 'Dell' },
  { value: 'Lenovo', label: 'Lenovo' },
  { value: 'Apple', label: 'Apple' },
  { value: 'ASUS', label: 'ASUS' },
  { value: 'Acer', label: 'Acer' },
  { value: 'Samsung', label: 'Samsung' },
  { value: 'MSI', label: 'MSI' },
];

const USE_CASES: { value: string; label: string }[] = [
  { value: 'business', label: 'Business' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'student', label: 'Student' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const RENTAL_PERIODS = [
  { value: 'monthly', label: 'Monthly', key: 'monthly' },
  { value: 'quarterly', label: 'Quarterly', key: 'quarterly' },
  { value: 'yearly', label: 'Yearly', key: 'yearly' },
];

export { MOCK_PRODUCTS };

export function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    brands: searchParams.get('brand')?.split(',') as Brand[] || [],
    categories: searchParams.get('category')?.split(',') as Category[] || [],
    tags: searchParams.get('tag')?.split(',') || [],
    priceRange: searchParams.get('minPrice') && searchParams.get('maxPrice')
      ? [Number(searchParams.get('minPrice')), Number(searchParams.get('maxPrice'))]
      : undefined,
    sortBy: (searchParams.get('sort') as ProductFilters['sortBy']) || 'newest',
    page: Number(searchParams.get('page')) || 1,
    limit: 36,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.brands?.length) params.set('brand', filters.brands.join(','));
    if (filters.categories?.length) params.set('category', filters.categories.join(','));
    if (filters.tags?.length) params.set('tag', filters.tags.join(','));
    if (filters.priceRange) {
      params.set('minPrice', String(filters.priceRange[0]));
      params.set('maxPrice', String(filters.priceRange[1]));
    }
    if (filters.sortBy) params.set('sort', filters.sortBy);
    if (query.trim()) params.set('q', query.trim());
    if (filters.page && filters.page > 1) params.set('page', String(filters.page));
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams, query]);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(p => {
        const haystack = [
          p.name, p.brand, p.category, p.description, p.shortDescription,
          ...p.tags,
          ...p.specifications.map(s => `${s.key} ${s.value}`),
        ].join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }

    if (filters.brands?.length) {
      result = result.filter(p => filters.brands!.includes(p.brand));
    }
    if (filters.categories?.length) {
      result = result.filter(p => filters.categories!.includes(p.category));
    }
    if (filters.tags?.length) {
      result = result.filter(p => filters.tags!.some(t => p.tags.includes(t)));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(p => {
        const price = p.pricing[selectedRentalPeriod];
        return price >= min && price <= max;
      });
    }

    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.pricing[selectedRentalPeriod] - b.pricing[selectedRentalPeriod]);
        break;
      case 'price_desc':
        result.sort((a, b) => b.pricing[selectedRentalPeriod] - a.pricing[selectedRentalPeriod]);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime());
    }

    return result;
  }, [filters, selectedRentalPeriod, query]);

  const totalPages = Math.ceil(filteredProducts.length / (filters.limit || 12));
  const paginatedProducts = filteredProducts.slice(
    ((filters.page || 1) - 1) * (filters.limit || 12),
    (filters.page || 1) * (filters.limit || 12)
  );

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of MOCK_PRODUCTS) counts[p.brand] = (counts[p.brand] || 0) + 1;
    return counts;
  }, []);

  const useCaseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of MOCK_PRODUCTS) for (const t of p.tags) counts[t] = (counts[t] || 0) + 1;
    return counts;
  }, []);

  const activeFilterCount = (filters.brands?.length || 0) + (filters.tags?.length || 0) + (filters.priceRange ? 1 : 0);

  const clearFilters = () => {
    setFilters({ ...filters, brands: [], categories: [], tags: [], priceRange: undefined, page: 1 });
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200 z-30 shadow-sm md:sticky md:top-16">
        <div className="container py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-heading-md sm:text-heading-lg font-bold text-secondary-900">Products</h1>
                <span className="text-body-sm text-secondary-500">({filteredProducts.length} found)</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterModalOpen(true)}
                className={cn('lg:hidden gap-1.5', activeFilterCount > 0 && 'bg-primary-50 border-primary-200 text-primary-700 font-medium')}
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" />
                <Input
                  type="search"
                  placeholder="Search laptops…"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setFilters(prev => ({ ...prev, page: 1 }));
                  }}
                  className="pl-9 w-full"
                />
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Dropdown
                    options={SORT_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
                    value={filters.sortBy}
                    onChange={value => setFilters(prev => ({ ...prev, sortBy: value as ProductFilters['sortBy'], page: 1 }))}
                    placeholder="Sort by"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-secondary-100 sm:border-0 sm:pt-0">
            <div className="flex items-center gap-2 text-xs sm:text-body-sm text-secondary-600">
              <span className="font-medium whitespace-nowrap">View prices:</span>
              <div className="flex bg-secondary-100 rounded-lg p-1">
                {RENTAL_PERIODS.map(period => (
                  <button
                    key={period.value}
                    onClick={() => setSelectedRentalPeriod(period.value as 'monthly' | 'quarterly' | 'yearly')}
                    className={cn(
                      'px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-medium transition-colors',
                      selectedRentalPeriod === period.value
                        ? 'bg-white text-primary-700 shadow-sm'
                        : 'text-secondary-600 hover:text-secondary-900'
                    )}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {filters.brands?.map(brand => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200"
                  >
                    {brand}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, brands: prev.brands?.filter(b => b !== brand), page: 1 }))}
                      className="hover:text-primary-900 ml-0.5"
                      aria-label={`Remove ${brand} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.tags?.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 capitalize"
                  >
                    {tag}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tag), page: 1 }))}
                      className="hover:text-primary-900 ml-0.5"
                      aria-label={`Remove ${tag} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-xs text-secondary-500 hover:text-primary-600 underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-4 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-xl border border-secondary-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-secondary-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-3">Brands</label>
                    <div className="space-y-2">
                      {BRANDS.map(brand => (
                        <label key={brand.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brands?.includes(brand.value) || false}
                            onChange={e => setFilters(prev => ({
                              ...prev,
                              brands: e.target.checked
                                ? [...(prev.brands || []), brand.value]
                                : prev.brands?.filter(b => b !== brand.value),
                              page: 1,
                            }))}
                            className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-body-sm text-secondary-700">{brand.label} <span className="text-secondary-400">({brandCounts[brand.value] || 0})</span></span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-3">Use Case</label>
                    <div className="space-y-2">
                      {USE_CASES.map(useCase => (
                        <label key={useCase.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.tags?.includes(useCase.value) || false}
                            onChange={e => setFilters(prev => ({
                              ...prev,
                              tags: e.target.checked
                                ? [...(prev.tags || []), useCase.value]
                                : prev.tags?.filter(t => t !== useCase.value),
                              page: 1,
                            }))}
                            className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-body-sm text-secondary-700">{useCase.label} <span className="text-secondary-400">({useCaseCounts[useCase.value] || 0})</span></span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-3">Price Range (Monthly)</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange?.[0] || ''}
                        onChange={e => setFilters(prev => ({
                          ...prev,
                          priceRange: [Number(e.target.value) || 0, prev.priceRange?.[1] || 50000],
                          page: 1,
                        }))}
                        className="w-24"
                      />
                      <span className="text-secondary-400">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange?.[1] || ''}
                        onChange={e => setFilters(prev => ({
                          ...prev,
                          priceRange: [prev.priceRange?.[0] || 0, Number(e.target.value) || 50000],
                          page: 1,
                        }))}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 text-secondary-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3 className="text-heading-sm font-semibold text-secondary-900 mb-2">No products found</h3>
                <p className="text-body text-secondary-500 mb-6">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className={cn(
                  'gap-4 sm:gap-6',
                  viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'
                )}>
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        pricing: {
                          ...product.pricing,
                          monthly: (product.pricing as any)[selectedRentalPeriod] || product.pricing.monthly,
                        }
                      }}
                      periodLabel={selectedRentalPeriod}
                      onClick={() => navigate(`/products/${product.id}`)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
                      disabled={filters.page === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                          if ((filters.page || 1) > 3 && (filters.page || 1) < totalPages - 2) {
                            pageNum = (filters.page || 1) - 3 + i;
                          } else if ((filters.page || 1) >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          }
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={(filters.page || 1) === pageNum ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                            className="w-10 h-10"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
                      disabled={filters.page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Modal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        title="Filter Products"
        size="lg"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">Brands</label>
            <div className="space-y-2">
              {BRANDS.map(brand => (
                <label key={brand.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands?.includes(brand.value) || false}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      brands: e.target.checked
                        ? [...(prev.brands || []), brand.value]
                        : prev.brands?.filter(b => b !== brand.value),
                      page: 1,
                    }))}
                    className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-body-sm text-secondary-700">{brand.label} <span className="text-secondary-400">({brandCounts[brand.value] || 0})</span></span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">Use Case</label>
            <div className="space-y-2">
              {USE_CASES.map(useCase => (
                <label key={useCase.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.tags?.includes(useCase.value) || false}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      tags: e.target.checked
                        ? [...(prev.tags || []), useCase.value]
                        : prev.tags?.filter(t => t !== useCase.value),
                      page: 1,
                    }))}
                    className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-body-sm text-secondary-700">{useCase.label} <span className="text-secondary-400">({useCaseCounts[useCase.value] || 0})</span></span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">Price Range (Monthly)</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange?.[0] || ''}
                onChange={e => setFilters(prev => ({
                  ...prev,
                  priceRange: [Number(e.target.value) || 0, prev.priceRange?.[1] || 50000],
                  page: 1,
                }))}
                className="w-24"
              />
              <span className="text-secondary-400">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange?.[1] || ''}
                onChange={e => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange?.[0] || 0, Number(e.target.value) || 50000],
                  page: 1,
                }))}
                className="w-24"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100">
            <Button variant="outline" onClick={clearFilters}>Clear All</Button>
            <Button onClick={() => setFilterModalOpen(false)}>Apply Filters ({filteredProducts.length})</Button>
          </div>
        </div>
      </Modal>

      <WhatsAppFloat />
    </div>
  );
}