# Graphics Assets & Optimization

## Directory Structure

```
src/frontend/public/assets/
├── products/           # Product photography (by brand/model)
│   ├── hp/
│   ├── dell/
│   ├── lenovo/
│   ├── apple/
│   ├── asus/
│   └── acer/
├── heroes/             # Homepage hero banners
├── icons/
│   ├── categories/     # Product category icons
│   ├── brands/         # Brand logos
│   ├── ui/             # UI element icons
│   └── payments/       # Payment method icons
├── illustrations/      # Custom illustrations
│   ├── onboarding/
│   ├── empty-states/
│   └── errors/
├── locations/          # Map markers, warehouse graphics
│   ├── city-markers/
│   └── warehouse/
└── optimized/          # Auto-generated optimized variants (gitignored)
```

## Placeholder System

All directories contain **SVG placeholders** for development. These are:
- ✅ Lightweight (1-3 KB each)
- ✅ Resolution-independent
- ✅ Customizable via CSS `currentColor`
- ✅ Consistent visual language
- ✅ MIT licensed (safe for development)

**Replace with production assets before launch.**

## Optimization Pipeline

Run the optimization script to generate responsive WebP/AVIF variants:

```bash
# Install dependencies
npm install sharp glob

# Run optimization
node scripts/optimize-images.js
```

### Output

```
src/frontend/public/assets/optimized/
├── manifest.json           # Asset manifest with all variants
├── picture-helper.js       # Frontend helper for <picture> elements
├── products/
│   └── hp/
│       └── elitebook-840-g9/
│           ├── hero-320w.webp
│           ├── hero-320w.avif
│           ├── hero-480w.webp
│           └── ...
├── heroes/
├── icons/
└── ...
```

### Using in Frontend (React Example)

```jsx
import { getPictureSources } from '@/assets/optimized/picture-helper';

function ProductImage({ assetKey, alt, className }) {
  const sources = getPictureSources(assetKey);
  if (!sources) return <div className={className} />;
  
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={sources.avif} />
      <source type="image/webp" srcSet={sources.webp} />
      <img 
        src={sources.fallback} 
        alt={alt} 
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

// Usage
<ProductImage assetKey="products/hp/elitebook-840-g9/hero" alt="HP EliteBook 840 G9" />
```

## Sourcing Tracker

See `GRAPHICS_SOURCING_TRACKER.md` for:
- Complete asset inventory
- Licensing status per asset
- Source URLs and contacts
- Budget tracking
- Compliance checklist

## Key Guidelines

### Brand Logos
- **Never use placeholders in production**
- Request official assets from brand partner portals
- Follow each brand's usage guidelines exactly
- Apple assets require special compliance review

### Product Photography
- Source from manufacturer press kits (free with partner access)
- Minimum 3 angles per model (hero, side, detail)
- Include specs sheet PDF download
- Maintain consistent lighting/background

### Hero Banners
- 1200×500px minimum
- Safe zone: 960×400px center (for text overlay)
- Test on mobile (320px width)

### Icons
- All SVG, `currentColor` for theming
- 24×24px viewBox standard
- Stroke width: 2px for consistency

### Illustrations
- Consistent stroke weight (1.5px)
- Limited color palette (grays + 1 accent)
- Dashed stroke for container boundaries
- Text labels for context in placeholders

## License Compliance

| Asset Type | License Required | Source |
|------------|------------------|--------|
| Brand Logos | Written permission | Brand partner portals |
| Stock Photos | Standard/Enhanced | Shutterstock, Adobe Stock |
| Custom Photography | Full ownership | Contractor agreement |
| AI Generated | Commercial use per TOS | Midjourney, DALL-E 3 |
| Custom SVG Icons | MIT (our codebase) | Internal |
| Manufacturer Press Kit | Editorial/Commercial | Verify per brand |

## Performance Targets

- **Hero images**: < 100 KB (WebP), < 80 KB (AVIF)
- **Product thumbnails**: < 30 KB (WebP), < 25 KB (AVIF)
- **Icons**: < 2 KB (SVG inline)
- **Illustrations**: < 15 KB (SVG)
- **Total page weight (images)**: < 500 KB initial load

## Automation

Add to `package.json`:
```json
{
  "scripts": {
    "optimize:images": "node scripts/optimize-images.js",
    "build": "npm run optimize:images && next build"
  }
}
```

## Accessibility

- All content images: descriptive `alt` text
- Decorative images: `alt=""` or `role="presentation"`
- Complex charts/diagrams: long description or data table alternative
- SVG icons: `aria-hidden="true"` with visible label nearby