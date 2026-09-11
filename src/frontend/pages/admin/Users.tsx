import { useState, useMemo } from 'react';
import { Search, Filter, Download, UserPlus, UserX, Mail, Phone, Shield, Loader2, MoreVertical, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate, formatRelativeTime, cn } from '@/lib/utils';

const ROLE_OPTIONS = ['customer', 'admin'];
const STATUS_OPTIONS = ['active', 'inactive', 'suspended'];

const MOCK_USERS = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', role: 'customer', status: 'active', city: 'Bangalore', orders: 5, totalSpent: 45999, createdAt: '2023-06-15T10:30:00Z', lastLogin: '2024-01-20T09:15:00Z', avatar: 'RS' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', role: 'customer', status: 'active', city: 'Mumbai', orders: 3, totalSpent: 28999, createdAt: '2023-08-22T14:20:00Z', lastLogin: '2024-01-19T16:45:00Z', avatar: 'PP' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', role: 'customer', status: 'active', city: 'Delhi', orders: 8, totalSpent: 67999, createdAt: '2023-04-10T09:15:00Z', lastLogin: '2024-01-20T11:30:00Z', avatar: 'AK' },
  { id: '4', name: 'Sneha Singh', email: 'sneha@example.com', phone: '9876543213', role: 'customer', status: 'inactive', city: 'Hyderabad', orders: 2, totalSpent: 12999, createdAt: '2023-11-05T16:20:00Z', lastLogin: '2024-01-10T08:00:00Z', avatar: 'SS' },
  { id: '5', name: 'Vikram Jain', email: 'vikram@example.com', phone: '9876543214', role: 'customer', status: 'active', city: 'Chennai', orders: 12, totalSpent: 89999, createdAt: '2023-02-18T14:10:00Z', lastLogin: '2024-01-19T12:00:00Z', avatar: 'VJ' },
  { id: '6', name: 'Admin User', email: 'admin@laptoprent.in', phone: '9876543215', role: 'admin', status: 'active', city: 'Bangalore', orders: 0, totalSpent: 0, createdAt: '2023-01-01T00:00:00Z', lastLogin: '2024-01-20T10:00:00Z', avatar: 'AU' },
];

export function AdminUsers() {
  const [users] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      const matchesCity = !cityFilter || user.city === cityFilter;
      return matchesSearch && matchesRole && matchesStatus && matchesCity;
    });
  }, [search, roleFilter, statusFilter, cityFilter]);

  const cities = [...new Set(users.map(u => u.city))].sort();

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-heading-lg font-bold text-secondary-900">User Management</h1>
            <p className="text-secondary-500 mt-1">Manage customer accounts and administrators</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} rightIcon={<UserPlus className="w-5 h-5" />}>
            Add User
          </Button>
        </div>

        <Card padding="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Input
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              className="flex-1"
            />
            <Dropdown
              options={[{ value: '', label: 'All Roles' }, ...ROLE_OPTIONS.map(r => ({ value: r, label: r }))]}
              value={roleFilter}
              onChange={setRoleFilter}
              placeholder="Role"
              className="w-36"
            />
            <Dropdown
              options={[{ value: '', label: 'All Status' }, ...STATUS_OPTIONS.map(s => ({ value: s, label: s }))]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              className="w-36"
            />
            <Dropdown
              options={[{ value: '', label: 'All Cities' }, ...['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'].map(c => ({ value: c, label: c }))]}
              value={cityFilter}
              onChange={setCityFilter}
              placeholder="City"
              className="w-36"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left p-4 font-medium text-secondary-500">User</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Contact</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden md:table-cell">Role</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden md:table-cell">Status</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden lg:table-cell">City</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Orders</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Total Spent</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Joined</th>
                  <th className="text-right p-4 font-medium text-secondary-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-secondary-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="font-medium text-primary-700">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{user.name}</p>
                          <p className="text-body-sm text-secondary-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-secondary-900">{user.email}</p>
                      <p className="text-body-sm text-secondary-500">{user.phone}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                        user.status === 'active' ? 'bg-green-100 text-green-700' :
                        user.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">{user.city}</td>
                    <td className="p-4 font-medium text-secondary-900">{user.orders}</td>
                    <td className="p-4 font-medium text-secondary-900">{formatCurrency(user.totalSpent)}</td>
                    <td className="p-4 text-body-sm text-secondary-500">{formatDate(user.createdAt)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100" aria-label="View details">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100" aria-label="Edit user">
                          <Shield className="w-5 h-5" />
                        </button>
                        {user.status === 'active' && (
                          <Button variant="ghost" size="sm" onClick={() => toast(`User ${user.name} suspended`)} className="gap-1">
                            <UserX className="w-4 h-4" /> Suspend
                          </Button>
                        )}
                        {user.status === 'inactive' && (
                          <Button variant="ghost" size="sm" onClick={() => toast(`User ${user.name} activated`)} className="gap-1">
                            <Shield className="w-4 h-4" /> Activate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p className="text-secondary-500">No users found matching your criteria</p>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card padding="lg" className="text-center">
            <Users className="w-10 h-10 mx-auto mb-3 text-primary-600" />
            <p className="text-heading-lg font-bold text-secondary-900">{users.length}</p>
            <p className="text-secondary-500">Total Users</p>
          </Card>
          <Card padding="lg" className="text-center">
            <UserPlus className="w-10 h-10 mx-auto mb-3 text-green-600" />
            <p className="text-heading-lg font-bold text-secondary-900">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-secondary-500">Active Users</p>
          </Card>
          <Card padding="lg" className="text-center">
            <Shield className="w-10 h-10 mx-auto mb-3 text-purple-600" />
            <p className="text-heading-lg font-bold text-secondary-900">{users.filter(u => u.role === 'admin').length}</p>
            <p className="text-secondary-500">Administrators</p>
          </Card>
          <Card padding="lg" className="text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-3 text-orange-600" />
            <p className="text-heading-lg font-bold text-secondary-900">{formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}</p>
            <p className="text-secondary-500">Total Revenue</p>
          </Card>
        </div>
      </div>
    </div>
  );
}