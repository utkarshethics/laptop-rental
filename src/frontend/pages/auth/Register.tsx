import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
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
        <h1 className="text-heading-lg font-bold text-secondary-900">Create Your Account</h1>
        <p className="text-secondary-500 mt-2">Start renting premium laptops in minutes</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            leftIcon={<User className="w-5 h-5" />}
            autoComplete="name"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 digit number"
            required
            leftIcon={<Phone className="w-5 h-5" />}
            autoComplete="tel"
            maxLength={10}
          />
        </div>

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-5 h-5" />}
          autoComplete="email"
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
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
          autoComplete="new-password"
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          leftIcon={<Lock className="w-5 h-5" />}
          autoComplete="new-password"
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="terms" className="text-body-sm text-secondary-600">
            I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>
          </label>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-secondary-400">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => toast('Google signup coming soon')}>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </Button>
        <Button variant="outline" onClick={() => toast('Apple signup coming soon')}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 17.29c-.64-.64-1.68-.64-2.32 0l-4.59 4.59-2.3-2.3c-.64-.64-1.68-.64-2.32 0s-.64 1.68 0 2.32l3 3c.32.32.74.48 1.16.48s.84-.16 1.16-.48l5-5c.64-.63.64-1.67 0-2.3zm-8.71-4.29c.64.64 1.68.64 2.32 0l4.59-4.59 2.3 2.3c.64.64 1.68.64 2.32 0s.64-1.68 0-2.32l-3-3c-.32-.32-.74-.48-1.16-.48s-.84.16-1.16.48l-5 5c-.64.63-.64 1.67 0 2.3z"/></svg>
          Apple
        </Button>
      </div>

      <p className="text-center text-body-sm text-secondary-500 mt-6">
        Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">Sign in</Link>
      </p>
    </div>
  );
}