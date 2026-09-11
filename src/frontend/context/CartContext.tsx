import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { CartItem, Product, RentalPeriod } from '@/types';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  depositTotal: number;
  total: number;
  addItem: (product: Product, rentalPeriod: RentalPeriod, startDate: string, endDate: string, city: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateRentalPeriod: (itemId: string, rentalPeriod: RentalPeriod) => void;
  updateDates: (itemId: string, startDate: string, endDate: string) => void;
  updateCity: (itemId: string, city: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_KEY = 'laptoprent_cart';

const RENTAL_PERIOD_DAYS: Record<RentalPeriod, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  quarterly: 90,
  yearly: 365,
};

const RENTAL_PERIOD_DISCOUNTS: Record<RentalPeriod, number> = {
  daily: 0,
  weekly: 5,
  monthly: 15,
  quarterly: 25,
  yearly: 35,
};

function calculateItemPrice(product: Product, rentalPeriod: RentalPeriod, quantity: number): { price: number; deposit: number } {
  const basePrice = product.pricing[rentalPeriod];
  const discount = RENTAL_PERIOD_DISCOUNTS[rentalPeriod];
  const discountedPrice = basePrice * (1 - discount / 100);
  const totalPrice = discountedPrice * quantity;
  const deposit = product.pricing.deposit * quantity;
  return { price: totalPrice, deposit };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const depositTotal = items.reduce((sum, item) => sum + (item.product.pricing.deposit * item.quantity), 0);
  const total = subtotal + depositTotal;

  const addItem = useCallback((
    product: Product,
    rentalPeriod: RentalPeriod,
    startDate: string,
    endDate: string,
    city: string
  ) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.rentalPeriod === rentalPeriod && item.city === city
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        const { price } = calculateItemPrice(product, rentalPeriod, updated[existingIndex].quantity);
        updated[existingIndex].price = price;
        toast.success('Quantity updated in cart');
        return updated;
      }

      const { price, deposit } = calculateItemPrice(product, rentalPeriod, 1);
      const newItem: CartItem = {
        id: generateId(),
        productId: product.id,
        product,
        quantity: 1,
        rentalPeriod,
        startDate,
        endDate,
        city,
        price,
      };
      toast.success(`${product.name} added to cart`);
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => {
      const item = prev.find(i => i.id === itemId);
      if (item) {
        toast.success(`${item.product.name} removed from cart`);
      }
      return prev.filter(item => item.id !== itemId);
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item) return prev;
      const { price } = calculateItemPrice(item.product, item.rentalPeriod, quantity);
      return prev.map(i =>
        i.id === itemId ? { ...i, quantity, price } : i
      );
    });
  }, []);

  const updateRentalPeriod = useCallback((itemId: string, rentalPeriod: RentalPeriod) => {
    setItems(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item) return prev;
      const days = RENTAL_PERIOD_DAYS[rentalPeriod];
      const startDate = new Date(item.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + days);
      const { price } = calculateItemPrice(item.product, rentalPeriod, item.quantity);
      return prev.map(i =>
        i.id === itemId
          ? { ...i, rentalPeriod, endDate: endDate.toISOString().split('T')[0], price }
          : i
      );
    });
  }, []);

  const updateDates = useCallback((itemId: string, startDate: string, endDate: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, startDate, endDate } : item
      )
    );
  }, []);

  const updateCity = useCallback((itemId: string, city: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, city } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success('Cart cleared');
  }, []);

  const isInCart = useCallback((productId: string) => {
    return items.some(item => item.productId === productId);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        depositTotal,
        total,
        addItem,
        removeItem,
        updateQuantity,
        updateRentalPeriod,
        updateDates,
        updateCity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}