import { useState } from 'react';
import { User, Mail, Phone, Building2, CreditCard, Settings, Bell, Shield, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export function Profile() {
  const { user, updateProfile, logout, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payment' | 'notifications' | 'security'>('profile');
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(profileData);
      await refreshUser();
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: Building2 },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-heading-lg font-bold text-secondary-900">My Account</h1>
          <p className="text-secondary-500 mt-1">Manage your profile, orders, and settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card padding="lg" className="sticky top-24">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="w-24 h-24 rounded-full" />
                  ) : (
                    <span className="text-3xl font-bold text-primary-700">{user?.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <h3 className="font-semibold text-secondary-900">{user?.name}</h3>
                <p className="text-body-sm text-secondary-500">{user?.email}</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 mt-2">
                  {user?.role === 'admin' ? 'Admin' : 'Customer'}
                </span>
              </div>

              <nav className="mt-6 space-y-1" role="navigation" aria-label="Account sections">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium text-error-600 hover:bg-error-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </Card>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <Card padding="lg">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <h3 className="font-semibold text-secondary-900">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      leftIcon={<User className="w-5 h-5" />}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      leftIcon={<Mail className="w-5 h-5" />}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={profileData.phone}
                      onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      leftIcon={<Phone className="w-5 h-5" />}
                    />
                  </div>
                  <Button type="submit" loading={loading}>Save Changes</Button>
                </form>
              </Card>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-secondary-900">Saved Addresses</h3>
                  <Button size="sm">Add New Address</Button>
                </div>
                <Card padding="lg">
                  <p className="text-secondary-500 text-center py-8">No saved addresses yet. Add one during checkout.</p>
                </Card>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-secondary-900">Payment Methods</h3>
                  <Button size="sm" variant="outline">Add Card</Button>
                </div>
                <Card padding="lg">
                  <p className="text-secondary-500 text-center py-8">No saved payment methods. Add one during checkout.</p>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { id: 'email_orders', label: 'Order Updates', desc: 'Receive email updates about your orders', default: true },
                    { id: 'email_promo', label: 'Promotional Emails', desc: 'Get notified about special offers and discounts', default: true },
                    { id: 'sms_orders', label: 'SMS Notifications', desc: 'Receive SMS for order status changes', default: false },
                    { id: 'push_orders', label: 'Push Notifications', desc: 'Get real-time updates on your device', default: true },
                  ].map(item => (
                    <label key={item.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-secondary-900">{item.label}</p>
                        <p className="text-body-sm text-secondary-500">{item.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={item.default}
                        className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                    </label>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card padding="lg">
                <h3 className="font-semibold text-secondary-900 mb-6">Security Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-secondary-900">Two-Factor Authentication</p>
                      <p className="text-body-sm text-secondary-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-secondary-900">Change Password</p>
                      <p className="text-body-sm text-secondary-500">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-secondary-900">Active Sessions</p>
                      <p className="text-body-sm text-secondary-500">Manage devices logged into your account</p>
                    </div>
                    <Button variant="outline" size="sm">View Sessions</Button>
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Sign Out"
        description="Are you sure you want to sign out of your account?"
        size="sm"
      >
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Sign Out</Button>
        </div>
      </Modal>
    </div>
  );
}