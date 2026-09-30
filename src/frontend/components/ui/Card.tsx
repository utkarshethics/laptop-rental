import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { openTokenBooking } from '@/lib/tokenBooking';
import { useCity } from '@/context/CityContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  as: Component = 'div',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <Component
      className={cn(
        'bg-white rounded-xl border border-secondary-200 shadow-card transition-all duration-300',
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className, action }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>{children}</div>
      {action && <div className="flex-shrink-0 ml-4">{action}</div>}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn('text-heading-md font-semibold text-secondary-900', className)}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={cn('text-body-sm text-secondary-500 mt-1', className)}>{children}</p>;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-secondary-100', className)}>
      {children}
    </div>
  );
}

function specSummary(specifications: { key: string; value: string; category: string }[] | undefined): string | null {
  if (!specifications || specifications.length === 0) return null;
  const pick = (cats: string[]) => specifications.find(s => cats.includes(s.category));
  const ram = pick(['memory']);
  const storage = pick(['storage']);
  const chip = pick(['graphics']) || pick(['processor']);
  const parts = [ram?.value, storage?.value, chip?.value].filter(Boolean) as string[];
  return parts.length ? parts.join(' · ') : null;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    category: string;
    images: { url: string; alt: string; isPrimary?: boolean }[];
    pricing: { daily?: number; monthly: number; quarterly?: number; yearly?: number };
    rating: number;
    reviewCount: number;
    availability: { inStock: number; cities: string[] };
    featured?: boolean;
    specifications?: { key: string; value: string; category: string }[];
  };
  periodLabel?: 'monthly' | 'quarterly' | 'yearly';
  onAddToCart?: () => void;
  onClick?: () => void;
}

export function ProductCard({ product, periodLabel = 'monthly', onAddToCart, onClick }: ProductCardProps) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
  const { city } = useCity();
  const servedInCity = product.availability.cities.includes(city);
  const specs = specSummary(product.specifications);

  const periodSuffix = periodLabel === 'quarterly' ? '/quarter' : periodLabel === 'yearly' ? '/year' : '/month';

  return (
    <Card hover padding="none" className="group overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary-50">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary-400">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 badge bg-primary-600 text-white">Featured</span>
        )}
        {product.availability.inStock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="badge bg-error-500 text-white text-sm px-3 py-1">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-caption text-secondary-500 font-medium uppercase tracking-wide">{product.brand}</p>
            <Link
              to={`/products/${product.id}`}
              onClick={e => e.stopPropagation()}
              className="hover:text-primary-600 transition-colors"
            >
              <h3 className="text-heading-sm font-semibold text-secondary-900 line-clamp-2 min-h-10">{product.name}</h3>
            </Link>
          </div>
          <div className="flex items-center gap-1 text-secondary-500 flex-shrink-0">
            <svg className="w-4 h-4 fill-current text-warning-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-caption">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {specs && (
            <span className="w-full text-caption text-secondary-600 truncate" title={specs}>
              {specs}
            </span>
          )}
          {servedInCity && product.availability.inStock > 0 ? (
            <span className="badge badge-success text-xs">
              In stock · {city} ({product.availability.inStock} available)
            </span>
          ) : (
            <span className="badge badge-warning text-xs">On request · {city}</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1.5 pt-1">
          <div className="min-w-0">
            <span className="text-heading-sm font-bold text-primary-600 whitespace-nowrap">
              ₹{product.pricing.monthly.toLocaleString()}
            </span>
            <span className="text-caption text-secondary-500 block leading-tight whitespace-nowrap">
              {periodSuffix}
            </span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              openTokenBooking({
                id: product.id,
                name: product.name,
                brand: product.brand,
                imageUrl: primaryImage?.url,
                monthlyPrice: product.pricing.monthly,
              });
            }}
            className="btn-primary btn-sm whitespace-nowrap flex-shrink-0"
            disabled={product.availability.inStock === 0}
            aria-label={`Book ${product.name} at doorstep for ₹50`}
          >
            Book for ₹50
          </button>
        </div>
        <p className="text-caption text-secondary-500 mt-2">
          ₹50 refundable booking token · adjusted in your 1st month's rent
        </p>
      </div>
    </Card>
  );
}