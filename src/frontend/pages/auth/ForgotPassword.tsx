import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      if (response.data.success) {
        toast.success('OTP sent to your email');
        setStep('verify');
      } else {
        toast.error(response.data.error?.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', { email, otp: otpCode });
      if (response.data.success) {
        toast.success('OTP verified');
        setStep('reset');
      } else {
        toast.error(response.data.error?.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/reset-password', { email, password: newPassword });
      if (response.data.success) {
        toast.success('Password reset successfully!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(response.data.error?.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
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

        {step === 'email' && (
          <>
            <h1 className="text-heading-lg font-bold text-secondary-900">Forgot Password?</h1>
            <p className="text-secondary-500 mt-2">Enter your email and we'll send you a reset code</p>
          </>
        )}

        {step === 'verify' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-heading-lg font-bold text-secondary-900">Check Your Email</h1>
            <p className="text-secondary-500 mt-2">We've sent a 6-digit code to <strong>{email}</strong></p>
          </>
        )}

        {step === 'reset' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h1 className="text-heading-lg font-bold text-secondary-900">Set New Password</h1>
            <p className="text-secondary-500 mt-2">Your new password must be different from previous ones</p>
          </>
        )}
      </div>

      {step === 'email' && (
        <form onSubmit={handleSendOtp} className="space-y-6">
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
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Send Reset Code
          </Button>
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            {[0,1,2,3,4,5].map(i => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={otp[i]}
                onChange={e => handleOtpChange(i, e.target.value)}
                onKeyDown={e => handleOtpKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-semibold rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none bg-white"
                autoComplete="one-time-code"
                inputMode="numeric"
              />
            ))}
          </div>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Verify Code
          </Button>
          <p className="text-center text-body-sm text-secondary-500">
            Didn't receive the code? <button type="button" onClick={handleSendOtp} className="text-primary-600 hover:text-primary-700 font-medium" disabled={loading}>Resend</button>
          </p>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            leftIcon={<Lock className="w-5 h-5" />}
            autoComplete="new-password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            leftIcon={<Lock className="w-5 h-5" />}
            autoComplete="new-password"
          />
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Reset Password
          </Button>
        </form>
      )}

      <p className="text-center text-body-sm text-secondary-500 mt-6">
        Remember your password? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">Sign in</Link>
      </p>
    </div>
  );
}