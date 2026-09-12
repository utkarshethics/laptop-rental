export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  specifications: Specification[];
  pricing: Pricing;
  availability: Availability;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Specification {
  key: string;
  value: string;
  category: 'processor' | 'memory' | 'storage' | 'display' | 'graphics' | 'battery' | 'ports' | 'os' | 'dimensions' | 'weight' | 'other';
}

export interface Pricing {
  monthly: number;
  quarterly: number;
  yearly: number;
  deposit: number;
  currency: 'INR';
}

export interface Availability {
  inStock: number;
  totalStock: number;
  cities: string[];
  nextAvailableDate?: string;
}

export type Brand = 'HP' | 'Dell' | 'Lenovo' | 'Apple' | 'ASUS' | 'Acer';
export type Category = 'laptop' | 'desktop' | 'monitor' | 'tablet' | 'accessories';

export interface ProductFilters {
  brands?: Brand[];
  categories?: Category[];
  priceRange?: [number, number];
  specifications?: Record<string, string[]>;
  cities?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  rentalPeriod: RentalPeriod;
  startDate: string;
  endDate: string;
  city: string;
  price: number;
}

export type RentalPeriod = 'monthly' | 'quarterly' | 'yearly';

export interface RentalPeriodOption {
  value: RentalPeriod;
  label: string;
  days: number;
  discount: number;
}

export const RENTAL_PERIODS: RentalPeriodOption[] = [
  { value: 'monthly', label: 'Monthly', days: 30, discount: 0 },
  { value: 'quarterly', label: 'Quarterly', days: 90, discount: 25 },
  { value: 'yearly', label: 'Yearly', days: 365, discount: 35 },
];

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  discount: number;
  tax: number;
  deposit: number;
  total: number;
  currency: 'INR';
  shippingAddress: Address;
  billingAddress: Address;
  payment: PaymentInfo;
  rentalStartDate: string;
  rentalEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  brand: Brand;
  quantity: number;
  rentalPeriod: RentalPeriod;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'active'
  | 'returned'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface Address {
  name: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gstin?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  amount: number;
}

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  pincodePrefix: string;
  active: boolean;
  deliveryDays: number;
  warehouseId?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address: Address;
  cityId: string;
  managerName: string;
  managerPhone: string;
  capacity: number;
  active: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export type NotificationType =
  | 'order_confirmed'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_return_reminder'
  | 'payment_received'
  | 'payment_failed'
  | 'refund_processed'
  | 'promo_offer'
  | 'system';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface SearchParams {
  q?: string;
  brand?: Brand[];
  category?: Category[];
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}