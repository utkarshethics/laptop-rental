import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <svg className="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          <span className="font-bold text-xl text-secondary-900">LaptopRent</span>
        </Link>
        <h1 className="text-heading-lg font-bold text-secondary-900">Welcome Back</h1>
        <p className="text-secondary-500 mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-5 h-5" />}
          autoComplete="email"
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          leftIcon={<Lock className="w-5 h-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-secondary-400 hover:text-secondary-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-body-sm text-secondary-600">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-body-sm text-primary-600 hover:text-primary-700">Forgot password?</Link>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-secondary-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => toast('Google login coming soon')}>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>
        <Button variant="outline" onClick={() => toast('Apple login coming soon')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 17.29c-.64-.64-1.68-.64-2.32 0l-4.59 4.59-2.3-2.3c-.64-.64-1.68-.64-2.32 0s-.64 1.68 0 2.32l3 3c.32.32.74.48 1.16.48s.84-.16 1.16-.48l5-5c.64-.63.64-1.67 0-2.3zm-8.71-4.29c.64.64 1.68.64 2.32 0l4.59-4.59 2.3 2.3c.64.64 1.68.64 2.32 0s.64-1.68 0-2.32l-3-3c-.32-.32-.74-.48-1.16-.48s-.84.16-1.16.48l-5 5c-.64.63-.64 1.67 0 2.3z"/></svg>
          Apple
        </Button>
      </div>

      <p className="text-center text-body-sm text-secondary-500 mt-6">
        Don't have an account? <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">Sign up</Link>
      </p>
    </div>
  );
}