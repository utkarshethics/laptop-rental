import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MainLayout } from './components/layout/MainLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const Profile = lazy(() => import('./pages/account/Profile').then(m => ({ default: m.Profile })));
const Orders = lazy(() => import('./pages/account/Orders').then(m => ({ default: m.Orders })));
const OrderDetail = lazy(() => import('./pages/account/OrderDetail').then(m => ({ default: m.OrderDetail })));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const AdminProducts = lazy(() => import('./pages/admin/Products').then(m => ({ default: m.AdminProducts })));
const AdminOrders = lazy(() => import('./pages/admin/Orders').then(m => ({ default: m.AdminOrders })));
const AdminUsers = lazy(() => import('./pages/admin/Users').then(m => ({ default: m.AdminUsers })));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics').then(m => ({ default: m.AdminAnalytics })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
<Route path="/" element={<MainLayout />}>
  <Route index element={<Navigate to="/products?category=laptop&sort=newest" replace />} />
  <Route path="home" element={<Home />} />
  <Route path="products" element={<Products />} />
                  <Route path="products/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="login" element={<AuthLayout><Login /></AuthLayout>} />
                  <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
                  <Route path="forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
                  <Route path="account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="account/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                  <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                  <Route path="admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                  <Route path="admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                  <Route path="admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '0.75rem',
              padding: '1rem',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;