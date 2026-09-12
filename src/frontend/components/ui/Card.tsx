import { cn } from '@/lib/utils';

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

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    category: string;
    images: { url: string; alt: string }[];
    pricing: { daily: number; monthly: number };
    rating: number;
    reviewCount: number;
    availability: { inStock: number; cities: string[] };
    featured?: boolean;
  };
  onAddToCart?: () => void;
  onClick?: () => void;
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <Card hover padding="none" className="group overflow-hidden" onClick={onClick}>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary-50">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <h3 className="text-heading-sm font-semibold text-secondary-900 truncate">{product.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-secondary-500">
            <svg className="w-4 h-4 fill-current text-warning-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-caption">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.availability.cities.slice(0, 3).map(city => (
            <span key={city} className="badge badge-secondary text-xs">
              {city}
            </span>
          ))}
          {product.availability.cities.length > 3 && (
            <span className="badge badge-secondary text-xs">+{product.availability.cities.length - 3} more</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-heading-md font-bold text-primary-600">
              ₹{product.pricing.monthly.toLocaleString()}<span className="text-body-sm font-normal text-secondary-500">/month</span>
            </p>
            <p className="text-caption text-secondary-500">
              from ₹{product.pricing.daily.toLocaleString()}/day <span className="text-success-600 font-medium">(Save {Math.round((1 - product.pricing.monthly / (product.pricing.daily * 30)) * 100)}% vs daily)</span>
            </p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAddToCart?.(); }}
            className="btn-primary btn-sm whitespace-nowrap"
            disabled={product.availability.inStock === 0}
            aria-label={`Add ${product.name} to cart`}
          >
            Rent Now
          </button>
        </div>
      </div>
    </Card>
  );
}