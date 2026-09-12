import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Grid, List, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card, ProductCard } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, cn } from '@/lib/utils';
import { Product, Brand, Category, ProductFilters } from '@/types';

const BRANDS: { value: Brand; label: string }[] = [
  { value: 'HP', label: 'HP' },
  { value: 'Dell', label: 'Dell' },
  { value: 'Lenovo', label: 'Lenovo' },
  { value: 'Apple', label: 'Apple' },
  { value: 'ASUS', label: 'ASUS' },
  { value: 'Acer', label: 'Acer' },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'laptop', label: 'Laptops' },
  { value: 'desktop', label: 'Desktops' },
  { value: 'monitor', label: 'Monitors' },
  { value: 'tablet', label: 'Tablets' },
  { value: 'accessories', label: 'Accessories' },
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

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'HP EliteBook 840 G9', brand: 'HP', category: 'laptop',
    description: 'Business laptop with Intel i7, 16GB RAM, 512GB SSD',
    shortDescription: 'Premium business laptop for professionals',
    images: [
      { url: '/assets/products/hp/elitebook-840-g9/hero.jpg', alt: 'HP EliteBook 840 G9', isPrimary: true, order: 0 },
      { url: '/assets/products/hp/elitebook-840-g9/angle-1.jpg', alt: 'HP EliteBook 840 G9 — screen open', isPrimary: false, order: 1 },
    ],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1255U', category: 'processor' },
      { key: 'RAM', value: '16GB DDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" FHD IPS', category: 'display' },
      { key: 'OS', value: 'Windows 11 Pro', category: 'os' },
    ],
    pricing: { monthly: 1199, quarterly: 3299, yearly: 11999, deposit: 4000, currency: 'INR' },
    availability: { inStock: 15, totalStock: 20, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'] },
    rating: 4.8, reviewCount: 124, featured: true, tags: ['business', 'premium'], createdAt: '2024-01-15', updatedAt: '2024-01-15',
  },
  {
    id: '2', name: 'Dell Latitude 5430', brand: 'Dell', category: 'laptop',
    description: 'Reliable business laptop with Intel i5, 8GB RAM, 256GB SSD',
    shortDescription: 'Affordable business laptop for everyday work',
    images: [{ url: '/assets/products/dell/latitude-5430/hero.jpg', alt: 'Dell Latitude 5430', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-1235U', category: 'processor' },
      { key: 'RAM', value: '8GB DDR4', category: 'memory' },
      { key: 'Storage', value: '256GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" FHD', category: 'display' },
      { key: 'OS', value: 'Windows 11 Pro', category: 'os' },
    ],
    pricing: { monthly: 1099, quarterly: 2999, yearly: 10999, deposit: 3000, currency: 'INR' },
    availability: { inStock: 22, totalStock: 30, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Pune'] },
    rating: 4.7, reviewCount: 98, featured: false, tags: ['business', 'budget'], createdAt: '2024-01-10', updatedAt: '2024-01-10',
  },
  {
    id: '3', name: 'MacBook Air M2', brand: 'Apple', category: 'laptop',
    description: 'Ultra-portable with M2 chip, 8GB RAM, 256GB SSD',
    shortDescription: 'Apple\'s most portable laptop with incredible performance',
    images: [
      { url: '/assets/products/apple/macbook-air-m2/hero.jpg', alt: 'MacBook Air M2 (Midnight)', isPrimary: true, order: 0 },
      { url: '/assets/products/apple/macbook-air-m2/angle-1.jpg', alt: 'MacBook Air M2 — front', isPrimary: false, order: 1 },
      { url: '/assets/products/apple/macbook-air-m2/angle-2.jpg', alt: 'MacBook Air M2 (Starlight)', isPrimary: false, order: 2 },
      { url: '/assets/products/apple/macbook-air-m2/angle-3.jpg', alt: 'MacBook Air M2 — rear ports', isPrimary: false, order: 3 },
    ],
    specifications: [
      { key: 'Processor', value: 'Apple M2', category: 'processor' },
      { key: 'RAM', value: '8GB Unified', category: 'memory' },
      { key: 'Storage', value: '256GB SSD', category: 'storage' },
      { key: 'Display', value: '13.6" Liquid Retina', category: 'display' },
      { key: 'OS', value: 'macOS Sonoma', category: 'os' },
    ],
    pricing: { monthly: 1299, quarterly: 3499, yearly: 12999, deposit: 8000, currency: 'INR' },
    availability: { inStock: 8, totalStock: 15, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    rating: 4.9, reviewCount: 210, featured: true, tags: ['premium', 'creative', 'student'], createdAt: '2024-01-20', updatedAt: '2024-01-20',
  },
  {
    id: '4', name: 'Lenovo ThinkPad X1 Carbon Gen 11', brand: 'Lenovo', category: 'laptop',
    description: 'Ultra-light business laptop with Intel i7, 16GB RAM, 512GB SSD',
    shortDescription: 'The ultimate business ultrabook',
    images: [
      { url: '/assets/products/lenovo/thinkpad-x1-carbon/hero.jpg', alt: 'ThinkPad X1 Carbon Gen 11', isPrimary: true, order: 0 },
      { url: '/assets/products/lenovo/thinkpad-x1-carbon/angle-1.jpg', alt: 'ThinkPad X1 Carbon Gen 11 — 180° view', isPrimary: false, order: 1 },
    ],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1355U', category: 'processor' },
      { key: 'RAM', value: '16GB LPDDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" 2.8K OLED', category: 'display' },
      { key: 'OS', value: 'Windows 11 Pro', category: 'os' },
    ],
    pricing: { monthly: 1249, quarterly: 3399, yearly: 12499, deposit: 5000, currency: 'INR' },
    availability: { inStock: 12, totalStock: 18, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'] },
    rating: 4.8, reviewCount: 156, featured: true, tags: ['business', 'premium', 'ultrabook'], createdAt: '2024-01-18', updatedAt: '2024-01-18',
  },
  {
    id: '5', name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', category: 'laptop',
    description: 'Gaming laptop with AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4060',
    shortDescription: 'Compact gaming powerhouse',
    images: [{ url: '/assets/products/asus/rog-zephyrus-g14/hero.jpg', alt: 'ROG Zephyrus G14', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'AMD Ryzen 9 7940HS', category: 'processor' },
      { key: 'RAM', value: '16GB DDR5', category: 'memory' },
      { key: 'Storage', value: '1TB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" QHD 165Hz', category: 'display' },
      { key: 'Graphics', value: 'NVIDIA RTX 4060', category: 'graphics' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 1299, quarterly: 3499, yearly: 12999, deposit: 10000, currency: 'INR' },
    availability: { inStock: 6, totalStock: 10, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    rating: 4.7, reviewCount: 87, featured: false, tags: ['gaming', 'performance'], createdAt: '2024-01-22', updatedAt: '2024-01-22',
  },
  {
    id: '6', name: 'Acer Swift Go 14', brand: 'Acer', category: 'laptop',
    description: 'Lightweight laptop with Intel i5, 16GB RAM, 512GB SSD, OLED display',
    shortDescription: 'Affordable OLED laptop for students',
    images: [{ url: '/assets/products/acer/swift-go-14/hero.jpg', alt: 'Acer Swift Go 14', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-13500H', category: 'processor' },
      { key: 'RAM', value: '16GB LPDDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" 2.8K OLED 90Hz', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 999, quarterly: 2749, yearly: 9999, deposit: 3000, currency: 'INR' },
    availability: { inStock: 18, totalStock: 25, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'] },
    rating: 4.6, reviewCount: 73, featured: false, tags: ['student', 'budget', 'oled'], createdAt: '2024-01-25', updatedAt: '2024-01-25',
  },
  {
    id: '7', name: 'MacBook Pro 14 M3', brand: 'Apple', category: 'laptop',
    description: 'Pro laptop with M3 Pro chip, 18GB unified memory, 512GB SSD',
    shortDescription: 'Apple\'s pro powerhouse for creators and developers',
    images: [
      { url: '/assets/products/apple/macbook-pro-14/hero.jpg', alt: 'MacBook Pro 14 M3', isPrimary: true, order: 0 },
      { url: '/assets/products/apple/macbook-pro-14/angle-1.jpg', alt: 'MacBook Pro 14 — lid open', isPrimary: false, order: 1 },
      { url: '/assets/products/apple/macbook-pro-14/angle-2.jpg', alt: 'MacBook Pro 14 — display', isPrimary: false, order: 2 },
      { url: '/assets/products/apple/macbook-pro-14/angle-3.jpg', alt: 'MacBook Pro 14 — ports', isPrimary: false, order: 3 },
    ],
    specifications: [
      { key: 'Processor', value: 'Apple M3 Pro', category: 'processor' },
      { key: 'RAM', value: '18GB Unified', category: 'memory' },
      { key: 'Storage', value: '512GB SSD', category: 'storage' },
      { key: 'Display', value: '14.2" Liquid Retina XDR', category: 'display' },
      { key: 'OS', value: 'macOS Sonoma', category: 'os' },
    ],
    pricing: { monthly: 1299, quarterly: 3499, yearly: 12999, deposit: 10000, currency: 'INR' },
    availability: { inStock: 6, totalStock: 12, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'] },
    rating: 4.9, reviewCount: 186, featured: true, tags: ['premium', 'creative', 'developer'], createdAt: '2026-01-25', updatedAt: '2026-01-25',
  },
  {
    id: '8', name: 'HP Spectre x360 14', brand: 'HP', category: 'laptop',
    description: 'Premium 2-in-1 convertible with Intel i7, 16GB RAM, 1TB SSD',
    shortDescription: 'Stunning OLED convertible for business and creative work',
    images: [
      { url: '/assets/products/hp/spectre-x360-14/hero.jpg', alt: 'HP Spectre x360 14', isPrimary: true, order: 0 },
      { url: '/assets/products/hp/spectre-x360-14/angle-1.jpg', alt: 'HP Spectre x360 14 — tent mode', isPrimary: false, order: 1 },
    ],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1355U', category: 'processor' },
      { key: 'RAM', value: '16GB LPDDR5', category: 'memory' },
      { key: 'Storage', value: '1TB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '13.5" 3K2K OLED Touch', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 1249, quarterly: 3399, yearly: 12499, deposit: 6000, currency: 'INR' },
    availability: { inStock: 9, totalStock: 15, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Pune'] },
    rating: 4.8, reviewCount: 84, featured: true, tags: ['premium', 'creative', 'student'], createdAt: '2026-01-22', updatedAt: '2026-01-22',
  },
  {
    id: '9', name: 'Lenovo IdeaPad Slim 5', brand: 'Lenovo', category: 'laptop',
    description: 'Slim everyday laptop with Ryzen 5, 16GB RAM, 512GB SSD',
    shortDescription: 'Lightweight student laptop with great battery life',
    images: [{ url: '/assets/products/lenovo/ideapad-slim-5/hero.jpg', alt: 'Lenovo IdeaPad Slim 5', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'AMD Ryzen 5 7530U', category: 'processor' },
      { key: 'RAM', value: '16GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD IPS', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 899, quarterly: 2499, yearly: 8999, deposit: 3000, currency: 'INR' },
    availability: { inStock: 14, totalStock: 20, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    rating: 4.5, reviewCount: 67, featured: false, tags: ['budget', 'student'], createdAt: '2026-01-20', updatedAt: '2026-01-20',
  },
  {
    id: '10', name: 'HP Pavilion 15', brand: 'HP', category: 'laptop',
    description: 'All-round laptop with Intel i5, 16GB RAM, 512GB SSD',
    shortDescription: 'Best-selling family and student laptop',
    images: [{ url: '/assets/products/hp/pavilion-15/hero.jpg', alt: 'HP Pavilion 15', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-1334U', category: 'processor' },
      { key: 'RAM', value: '16GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD IPS', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 899, quarterly: 2499, yearly: 8999, deposit: 3000, currency: 'INR' },
    availability: { inStock: 20, totalStock: 30, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'] },
    rating: 4.4, reviewCount: 112, featured: false, tags: ['budget', 'student', 'multimedia'], createdAt: '2026-01-18', updatedAt: '2026-01-18',
  },
  {
    id: '11', name: 'Dell Inspiron 15', brand: 'Dell', category: 'laptop',
    description: 'Value laptop with Intel i5, 16GB RAM, 512GB SSD',
    shortDescription: 'Reliable everyday laptop for work and study',
    images: [{ url: '/assets/products/dell/inspiron-15/hero.jpg', alt: 'Dell Inspiron 15', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-1335U', category: 'processor' },
      { key: 'RAM', value: '16GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 849, quarterly: 2349, yearly: 8499, deposit: 3000, currency: 'INR' },
    availability: { inStock: 18, totalStock: 25, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Kolkata'] },
    rating: 4.4, reviewCount: 91, featured: false, tags: ['budget', 'student'], createdAt: '2026-01-16', updatedAt: '2026-01-16',
  },
  {
    id: '12', name: 'ASUS VivoBook 15', brand: 'ASUS', category: 'laptop',
    description: 'Entry-level laptop with Intel i3, 8GB RAM, 512GB SSD',
    shortDescription: 'Lightest budget laptop for daily browsing and study',
    images: [{ url: '/assets/products/asus/vivobook-15/hero.jpg', alt: 'ASUS VivoBook 15', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i3-1315U', category: 'processor' },
      { key: 'RAM', value: '8GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 799, quarterly: 2199, yearly: 7999, deposit: 3000, currency: 'INR' },
    availability: { inStock: 25, totalStock: 35, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'] },
    rating: 4.3, reviewCount: 143, featured: false, tags: ['budget', 'student'], createdAt: '2026-01-14', updatedAt: '2026-01-14',
  },
  {
    id: '13', name: 'Samsung Galaxy Book3 Pro', brand: 'Samsung', category: 'laptop',
    description: 'Ultra-thin premium laptop with Intel i7, 16GB RAM, 512GB SSD',
    shortDescription: 'Featherlight AMOLED display laptop for professionals',
    images: [{ url: '/assets/products/samsung/galaxy-book3-pro/hero.jpg', alt: 'Samsung Galaxy Book3 Pro', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1360P', category: 'processor' },
      { key: 'RAM', value: '16GB LPDDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" 3K AMOLED', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 1099, quarterly: 2999, yearly: 10999, deposit: 5000, currency: 'INR' },
    availability: { inStock: 7, totalStock: 12, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    rating: 4.7, reviewCount: 58, featured: false, tags: ['premium', 'student', 'creative'], createdAt: '2026-01-12', updatedAt: '2026-01-12',
  },
  {
    id: '14', name: 'MSI GF63 Thin', brand: 'MSI', category: 'laptop',
    description: 'Gaming laptop with RTX 3050, 16GB RAM, 512GB SSD',
    shortDescription: 'Entry gaming laptop with 144Hz display',
    images: [{ url: '/assets/products/msi/gf63-thin/hero.jpg', alt: 'MSI GF63 Thin', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-12450H', category: 'processor' },
      { key: 'Graphics', value: 'NVIDIA RTX 3050 4GB', category: 'graphics' },
      { key: 'RAM', value: '16GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD 144Hz', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 1099, quarterly: 2999, yearly: 10999, deposit: 6000, currency: 'INR' },
    availability: { inStock: 11, totalStock: 18, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'] },
    rating: 4.5, reviewCount: 76, featured: true, tags: ['gaming', 'premium'], createdAt: '2026-01-10', updatedAt: '2026-01-10',
  },
  {
    id: '15', name: 'Acer Nitro V 15', brand: 'Acer', category: 'laptop',
    description: 'Budget gaming laptop with RTX 4050, 16GB RAM, 512GB SSD',
    shortDescription: 'Affordable RTX gaming laptop for students',
    images: [{ url: '/assets/products/acer/nitro-v-15/hero.jpg', alt: 'Acer Nitro V 15', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'AMD Ryzen 5 7535HS', category: 'processor' },
      { key: 'Graphics', value: 'NVIDIA RTX 4050 6GB', category: 'graphics' },
      { key: 'RAM', value: '16GB DDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD 144Hz', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 949, quarterly: 2599, yearly: 9499, deposit: 5000, currency: 'INR' },
    availability: { inStock: 16, totalStock: 24, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune'] },
    rating: 4.6, reviewCount: 39, featured: false, tags: ['gaming', 'budget'], createdAt: '2026-01-08', updatedAt: '2026-01-08',
  },

  {
    id: '16', name: 'MacBook Air 15 M3', brand: 'Apple', category: 'laptop',
    description: 'Big-screen ultrabook with M3 chip, 16GB unified memory, 512GB SSD',
    shortDescription: 'Apple\'s 15-inch Air with the versatile M3 chip',
    images: [
      { url: '/assets/products/apple/macbook-air-15/hero.jpg', alt: 'MacBook Air 15 M3', isPrimary: true, order: 0 },
      { url: '/assets/products/apple/macbook-air-15/angle-1.jpg', alt: 'MacBook Air 15 — screen open', isPrimary: false, order: 1 },
      { url: '/assets/products/apple/macbook-air-15/angle-2.jpg', alt: 'MacBook Air 15 — display', isPrimary: false, order: 2 },
      { url: '/assets/products/apple/macbook-air-15/angle-3.jpg', alt: 'MacBook Air 15 — rear ports', isPrimary: false, order: 3 },
    ],
    specifications: [
      { key: 'Processor', value: 'Apple M3', category: 'processor' },
      { key: 'RAM', value: '16GB Unified', category: 'memory' },
      { key: 'Storage', value: '512GB SSD', category: 'storage' },
      { key: 'Display', value: '15.3" Liquid Retina', category: 'display' },
      { key: 'OS', value: 'macOS Sonoma', category: 'os' },
    ],
    pricing: { monthly: 1299, quarterly: 3499, yearly: 12999, deposit: 8000, currency: 'INR' },
    availability: { inStock: 10, totalStock: 16, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'] },
    rating: 4.8, reviewCount: 132, featured: true, tags: ['premium', 'student', 'creative'], createdAt: '2026-01-07', updatedAt: '2026-01-07',
  },
  {
    id: '17', name: 'Dell XPS 13 Plus', brand: 'Dell', category: 'laptop',
    description: 'Ultra-premium thin laptop with Intel i7, 16GB RAM, 512GB SSD',
    shortDescription: 'Stunning edge-to-edge keyboard designer laptop',
    images: [{ url: '/assets/products/dell/xps-13-plus/hero.jpg', alt: 'Dell XPS 13 Plus', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1360P', category: 'processor' },
      { key: 'RAM', value: '16GB LPDDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '13.4" FHD+ OLED Touch', category: 'display' },
      { key: 'OS', value: 'Windows 11 Pro', category: 'os' },
    ],
    pricing: { monthly: 1249, quarterly: 3399, yearly: 12499, deposit: 6000, currency: 'INR' },
    availability: { inStock: 8, totalStock: 14, cities: ['Bangalore', 'Mumbai', 'Delhi'] },
    rating: 4.7, reviewCount: 64, featured: true, tags: ['premium', 'business'], createdAt: '2026-01-05', updatedAt: '2026-01-05',
  },
  {
    id: '18', name: 'Lenovo ThinkPad T14 Gen 4', brand: 'Lenovo', category: 'laptop',
    description: 'Business workhorse with Intel i7, 16GB RAM, 512GB SSD',
    shortDescription: 'Legendary ThinkPad reliability for professionals',
    images: [{ url: '/assets/products/lenovo/thinkpad-t14/hero.jpg', alt: 'Lenovo ThinkPad T14 Gen 4', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-1355U', category: 'processor' },
      { key: 'RAM', value: '16GB DDR5', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '14" FHD IPS', category: 'display' },
      { key: 'OS', value: 'Windows 11 Pro', category: 'os' },
    ],
    pricing: { monthly: 1199, quarterly: 3299, yearly: 11999, deposit: 5000, currency: 'INR' },
    availability: { inStock: 13, totalStock: 20, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'] },
    rating: 4.8, reviewCount: 118, featured: false, tags: ['business', 'premium'], createdAt: '2026-01-03', updatedAt: '2026-01-03',
  },
  {
    id: '19', name: 'HP Victus 15', brand: 'HP', category: 'laptop',
    description: 'Entry gaming laptop with RTX 3050, 16GB RAM, 512GB SSD',
    shortDescription: 'Budget gaming powerhouse from HP',
    images: [{ url: '/assets/products/hp/victus-15/hero.jpg', alt: 'HP Victus 15', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-12500H', category: 'processor' },
      { key: 'Graphics', value: 'NVIDIA RTX 3050 4GB', category: 'graphics' },
      { key: 'RAM', value: '16GB DDR4', category: 'memory' },
      { key: 'Storage', value: '512GB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '15.6" FHD 144Hz', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 949, quarterly: 2599, yearly: 9499, deposit: 5000, currency: 'INR' },
    availability: { inStock: 17, totalStock: 25, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai'] },
    rating: 4.5, reviewCount: 88, featured: false, tags: ['gaming', 'budget'], createdAt: '2026-01-01', updatedAt: '2026-01-01',
  },
  {
    id: '20', name: 'ASUS ROG Strix G16', brand: 'ASUS', category: 'laptop',
    description: 'High-refresh gaming laptop with RTX 4060, 16GB RAM, 1TB SSD',
    shortDescription: 'Serious esports-ready gaming rig',
    images: [{ url: '/assets/products/asus/rog-strix-g16/hero.jpg', alt: 'ASUS ROG Strix G16', isPrimary: true, order: 0 }],
    specifications: [
      { key: 'Processor', value: 'Intel Core i7-13650HX', category: 'processor' },
      { key: 'Graphics', value: 'NVIDIA RTX 4060 8GB', category: 'graphics' },
      { key: 'RAM', value: '16GB DDR5', category: 'memory' },
      { key: 'Storage', value: '1TB NVMe SSD', category: 'storage' },
      { key: 'Display', value: '16" QHD+ 165Hz', category: 'display' },
      { key: 'OS', value: 'Windows 11 Home', category: 'os' },
    ],
    pricing: { monthly: 1299, quarterly: 3499, yearly: 12999, deposit: 10000, currency: 'INR' },
    availability: { inStock: 5, totalStock: 10, cities: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'] },
    rating: 4.7, reviewCount: 95, featured: true, tags: ['gaming', 'premium'], createdAt: '2025-12-28', updatedAt: '2025-12-28',
  },

];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    brands: searchParams.get('brand')?.split(',') as Brand[] || [],
    categories: searchParams.get('category')?.split(',') as Category[] || [],
    priceRange: searchParams.get('minPrice') && searchParams.get('maxPrice')
      ? [Number(searchParams.get('minPrice')), Number(searchParams.get('maxPrice'))]
      : undefined,
    sortBy: (searchParams.get('sort') as ProductFilters['sortBy']) || 'newest',
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.brands?.length) params.set('brand', filters.brands.join(','));
    if (filters.categories?.length) params.set('category', filters.categories.join(','));
    if (filters.priceRange) {
      params.set('minPrice', String(filters.priceRange[0]));
      params.set('maxPrice', String(filters.priceRange[1]));
    }
    if (filters.sortBy) params.set('sort', filters.sortBy);
    if (filters.page && filters.page > 1) params.set('page', String(filters.page));
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (filters.brands?.length) {
      result = result.filter(p => filters.brands!.includes(p.brand));
    }
    if (filters.categories?.length) {
      result = result.filter(p => filters.categories!.includes(p.category));
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
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [filters, selectedRentalPeriod]);

  const totalPages = Math.ceil(filteredProducts.length / (filters.limit || 12));
  const paginatedProducts = filteredProducts.slice(
    ((filters.page || 1) - 1) * (filters.limit || 12),
    (filters.page || 1) * (filters.limit || 12)
  );

  const activeFilterCount = (filters.brands?.length || 0) + (filters.categories?.length || 0) + (filters.priceRange ? 1 : 0);

  const clearFilters = () => {
    setFilters({ ...filters, brands: [], categories: [], priceRange: undefined, page: 1 });
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200 sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-heading-lg font-bold text-secondary-900">Products</h1>
              <span className="text-body-sm text-secondary-500">{filteredProducts.length} products found</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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

              <div className="relative">
                <Dropdown
                  options={SORT_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
                  value={filters.sortBy}
                  onChange={value => setFilters(prev => ({ ...prev, sortBy: value as ProductFilters['sortBy'], page: 1 }))}
                  placeholder="Sort by"
                  className="w-48"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterModalOpen(true)}
                className={cn('gap-2', activeFilterCount > 0 && 'bg-primary-50 border-primary-200 text-primary-700')}
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-body-sm text-secondary-600">
              <span>View prices:</span>
              <div className="flex bg-secondary-100 rounded-lg p-1">
                {RENTAL_PERIODS.map(period => (
                  <button
                    key={period.value}
                    onClick={() => setSelectedRentalPeriod(period.value as 'monthly' | 'quarterly' | 'yearly')}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
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
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
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
                          <span className="text-body-sm text-secondary-700">{brand.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-3">Categories</label>
                    <div className="space-y-2">
                      {CATEGORIES.map(category => (
                        <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.categories?.includes(category.value) || false}
                            onChange={e => setFilters(prev => ({
                              ...prev,
                              categories: e.target.checked
                                ? [...(prev.categories || []), category.value]
                                : prev.categories?.filter(c => c !== category.value),
                              page: 1,
                            }))}
                            className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-body-sm text-secondary-700">{category.label}</span>
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
                  'gap-6',
                  viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'
                )}>
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={{
                        ...product,
                        pricing: {
                          ...product.pricing,
                          monthly: product.pricing.monthly,
                        }
                      }}
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
                  <span className="text-body-sm text-secondary-700">{brand.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-3">Categories</label>
            <div className="space-y-2">
              {CATEGORIES.map(category => (
                <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(category.value) || false}
                    onChange={e => setFilters(prev => ({
                      ...prev,
                      categories: e.target.checked
                        ? [...(prev.categories || []), category.value]
                        : prev.categories?.filter(c => c !== category.value),
                      page: 1,
                    }))}
                    className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-body-sm text-secondary-700">{category.label}</span>
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
            <Button onClick={() => setFilterModalOpen(false)}>Apply Filters</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}