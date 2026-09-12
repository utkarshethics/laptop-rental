import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/utils';

const BRANDS = ['HP', 'Dell', 'Lenovo', 'Apple', 'ASUS', 'Acer'];
const CATEGORIES = ['laptop', 'desktop', 'monitor', 'tablet', 'accessories'];
const STATUS_OPTIONS = ['active', 'inactive', 'out_of_stock', 'discontinued'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'HP EliteBook 840 G9', brand: 'HP', category: 'laptop', price: 1199, stock: 15, status: 'active', featured: true, createdAt: '2024-01-15' },
  { id: '2', name: 'Dell Latitude 5430', brand: 'Dell', category: 'laptop', price: 1099, stock: 22, status: 'active', featured: false, createdAt: '2024-01-10' },
  { id: '3', name: 'MacBook Air M2', brand: 'Apple', category: 'laptop', price: 1299, stock: 8, status: 'active', featured: true, createdAt: '2024-01-20' },
  { id: '4', name: 'Lenovo ThinkPad X1 Carbon', brand: 'Lenovo', category: 'laptop', price: 1249, stock: 12, status: 'active', featured: true, createdAt: '2024-01-18' },
  { id: '5', name: 'ASUS ROG Zephyrus G14', brand: 'ASUS', category: 'laptop', price: 1299, stock: 6, status: 'active', featured: false, createdAt: '2024-01-22' },
  { id: '6', name: 'Acer Swift Go 14', brand: 'Acer', category: 'laptop', price: 999, stock: 18, status: 'active', featured: false, createdAt: '2024-01-25' },
  { id: '7', name: 'MacBook Pro 14', brand: 'Apple', category: 'laptop', price: 1299, stock: 6, status: 'active', featured: true, createdAt: '2026-01-25' },
  { id: '8', name: 'HP Spectre x360 14', brand: 'HP', category: 'laptop', price: 1249, stock: 9, status: 'active', featured: true, createdAt: '2026-01-22' },
  { id: '9', name: 'Lenovo IdeaPad Slim 5', brand: 'Lenovo', category: 'laptop', price: 899, stock: 14, status: 'active', featured: false, createdAt: '2026-01-20' },
  { id: '10', name: 'HP Pavilion 15', brand: 'HP', category: 'laptop', price: 899, stock: 20, status: 'active', featured: false, createdAt: '2026-01-18' },
  { id: '11', name: 'Dell Inspiron 15', brand: 'Dell', category: 'laptop', price: 849, stock: 18, status: 'active', featured: false, createdAt: '2026-01-16' },
  { id: '12', name: 'ASUS VivoBook 15', brand: 'ASUS', category: 'laptop', price: 799, stock: 25, status: 'active', featured: false, createdAt: '2026-01-14' },
  { id: '13', name: 'Samsung Galaxy Book3 Pro', brand: 'Samsung', category: 'laptop', price: 1099, stock: 7, status: 'active', featured: false, createdAt: '2026-01-12' },
  { id: '14', name: 'MSI GF63 Thin', brand: 'MSI', category: 'laptop', price: 1099, stock: 11, status: 'active', featured: true, createdAt: '2026-01-10' },
  { id: '15', name: 'Acer Nitro V 15', brand: 'Acer', category: 'laptop', price: 949, stock: 16, status: 'active', featured: false, createdAt: '2026-01-08' },
  { id: '16', name: 'MacBook Air 15 M3', brand: 'Apple', category: 'laptop', price: 1299, stock: 10, status: 'active', featured: true, createdAt: '2026-01-07' },
  { id: '17', name: 'Dell XPS 13 Plus', brand: 'Dell', category: 'laptop', price: 1249, stock: 8, status: 'active', featured: true, createdAt: '2026-01-05' },
  { id: '18', name: 'Lenovo ThinkPad T14 Gen 4', brand: 'Lenovo', category: 'laptop', price: 1199, stock: 13, status: 'active', featured: false, createdAt: '2026-01-03' },
  { id: '19', name: 'HP Victus 15', brand: 'HP', category: 'laptop', price: 949, stock: 17, status: 'active', featured: false, createdAt: '2026-01-01' },
  { id: '20', name: 'ASUS ROG Strix G16', brand: 'ASUS', category: 'laptop', price: 1299, stock: 5, status: 'active', featured: true, createdAt: '2025-12-28' },
  { id: '21', name: 'MacBook Pro 16 M4', brand: 'Apple', category: 'laptop', price: 1299, stock: 4, status: 'active', featured: true, createdAt: '2025-12-25' },
  { id: '22', name: 'Dell Latitude 7450', brand: 'Dell', category: 'laptop', price: 1199, stock: 12, status: 'active', featured: false, createdAt: '2025-12-23' },
  { id: '23', name: 'Lenovo Yoga 9i', brand: 'Lenovo', category: 'laptop', price: 1249, stock: 7, status: 'active', featured: true, createdAt: '2025-12-22' },
  { id: '24', name: 'HP EliteBook 860 G9', brand: 'HP', category: 'laptop', price: 1199, stock: 11, status: 'active', featured: false, createdAt: '2025-12-21' },
  { id: '25', name: 'Acer Aspire 7', brand: 'Acer', category: 'laptop', price: 849, stock: 19, status: 'active', featured: false, createdAt: '2025-12-20' },
];

export function AdminProducts() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = !brandFilter || p.brand === brandFilter;
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesBrand && matchesCategory && matchesStatus;
  });

  const handleAddProduct = (productData: any) => {
    const newProduct = { ...productData, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] };
    setProducts([newProduct, ...products]);
    setShowAddModal(false);
    toast.success('Product added successfully');
  };

  const handleEditProduct = (productData: any) => {
    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    setEditingProduct(null);
    toast.success('Product updated successfully');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleToggleFeatured = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const handleStatusChange = (id: string, status: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-heading-lg font-bold text-secondary-900">Products Management</h1>
            <p className="text-secondary-500 mt-1">Manage your laptop inventory</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} rightIcon={<Plus className="w-5 h-5" />}>
            Add Product
          </Button>
        </div>

        <Card padding="lg">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              className="flex-1 max-w-md"
            />
            <Dropdown
              options={[{ value: '', label: 'All Brands' }, ...BRANDS.map(b => ({ value: b, label: b }))]}
              value={brandFilter}
              onChange={setBrandFilter}
              placeholder="Filter by Brand"
              className="w-40"
            />
            <Dropdown
              options={[{ value: '', label: 'All Categories' }, ...CATEGORIES.map(c => ({ value: c, label: c }))]}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder="Category"
              className="w-40"
            />
            <Dropdown
              options={[{ value: '', label: 'All Status' }, ...STATUS_OPTIONS.map(s => ({ value: s, label: s }))]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Status"
              className="w-40"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200">
                  <th className="text-left p-4 font-medium text-secondary-500">Product</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden md:table-cell">Brand</th>
                  <th className="text-left p-4 font-medium text-secondary-500 hidden lg:table-cell">Category</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Price/Month</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Stock</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Status</th>
                  <th className="text-left p-4 font-medium text-secondary-500">Featured</th>
                  <th className="text-right p-4 font-medium text-secondary-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {filteredProducts.map(product => (
                  <Fragment key={product.id}>
                    <tr className={cn('hover:bg-secondary-50 transition-colors', expandedRow === product.id && 'bg-primary-50')}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center overflow-hidden">
                            <span className="text-2xl font-bold text-secondary-600">{product.brand.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-secondary-900">{product.name}</p>
                            <p className="text-body-sm text-secondary-500">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">{product.brand}</td>
                      <td className="p-4 hidden lg:table-cell capitalize">{product.category}</td>
                      <td className="p-4 font-medium text-secondary-900">{formatCurrency(product.price)}/mo</td>
                      <td className="p-4">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium',
                          product.stock > 10 ? 'bg-green-100 text-green-700' :
                          product.stock > 5 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        )}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <Dropdown
                          options={STATUS_OPTIONS.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
                          value={product.status}
                          onChange={status => handleStatusChange(product.id, status)}
                          className="w-32"
                        />
                      </td>
                      <td className="p-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={product.featured}
                            onChange={() => handleToggleFeatured(product.id)}
                            className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-body-sm text-secondary-600">Featured</span>
                        </label>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setExpandedRow(expandedRow === product.id ? null : product.id)} className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100" aria-label={expandedRow === product.id ? 'Collapse' : 'Expand'}>
                            {expandedRow === product.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                          <button onClick={() => setEditingProduct(product)} className="p-2 rounded-lg text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100" aria-label="Edit">
                            <Edit className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-2 rounded-lg text-secondary-400 hover:text-error-600 hover:bg-error-50" aria-label="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === product.id && (
                      <tr>
                        <td colSpan={8} className="p-4 bg-primary-50 border-t border-primary-100">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-body-sm text-secondary-500">Daily Price</p>
                              <p className="font-medium">{formatCurrency(Math.round(product.price / 30))}/day</p>
                            </div>
                            <div>
                              <p className="text-body-sm text-secondary-500">Weekly Price</p>
                              <p className="font-medium">{formatCurrency(Math.round(product.price / 4))}/week</p>
                            </div>
                            <div>
                              <p className="text-body-sm text-secondary-500">Deposit</p>
                              <p className="font-medium">{formatCurrency(5000)}</p>
                            </div>
                            <div className="md:col-span-3">
                              <p className="text-body-sm text-secondary-500">Specifications: Intel i7, 16GB RAM, 512GB SSD, 14" FHD, Windows 11 Pro</p>
                            </div>
                            <div className="md:col-span-3 flex gap-2">
                              <Button variant="outline" size="sm">Edit Specs</Button>
                              <Button variant="outline" size="sm">Manage Images</Button>
                              <Button variant="outline" size="sm">View Analytics</Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p className="text-secondary-500">No products found matching your criteria</p>
            </div>
          )}
        </Card>
      </div>

      <Modal isOpen={showAddModal} onClose={() => { setShowAddModal(false); setEditingProduct(null); }} title={editingProduct ? 'Edit Product' : 'Add New Product'} size="xl">
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onClose={() => { setShowAddModal(false); setEditingProduct(null); }}
          loading={loading}
        />
      </Modal>
    </div>
  );
}

function ProductForm({ product, onSubmit, onClose, loading }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || 'laptop',
    dailyPrice: product?.dailyPrice || '',
    weeklyPrice: product?.weeklyPrice || '',
    monthlyPrice: product?.monthlyPrice || product?.price || '',
    quarterlyPrice: product?.quarterlyPrice || '',
    yearlyPrice: product?.yearlyPrice || '',
    deposit: product?.deposit || 5000,
    stock: product?.stock || 0,
    status: product?.status || 'active',
    featured: product?.featured || false,
    description: product?.description || '',
    specifications: product?.specifications || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="HP EliteBook 840 G9" />
        <Dropdown label="Brand" options={BRANDS.map(b => ({ value: b, label: b }))} value={formData.brand} onChange={v => setFormData({ ...formData, brand: v })} required />
        <Dropdown label="Category" options={CATEGORIES.map(c => ({ value: c, label: c }))} value={formData.category} onChange={v => setFormData({ ...formData, category: v })} required />
        <Dropdown label="Status" options={STATUS_OPTIONS.map(s => ({ value: s, label: s }))} value={formData.status} onChange={v => setFormData({ ...formData, status: v })} />
        <Input label="Daily Price (₹)" type="number" value={formData.dailyPrice} onChange={e => setFormData({ ...formData, dailyPrice: e.target.value })} placeholder="499" />
        <Input label="Weekly Price (₹)" type="number" value={formData.weeklyPrice} onChange={e => setFormData({ ...formData, weeklyPrice: e.target.value })} placeholder="2999" />
        <Input label="Monthly Price (₹)" type="number" value={formData.monthlyPrice} onChange={e => setFormData({ ...formData, monthlyPrice: e.target.value })} required placeholder="8999" />
        <Input label="Quarterly Price (₹)" type="number" value={formData.quarterlyPrice} onChange={e => setFormData({ ...formData, quarterlyPrice: e.target.value })} placeholder="24999" />
        <Input label="Yearly Price (₹)" type="number" value={formData.yearlyPrice} onChange={e => setFormData({ ...formData, yearlyPrice: e.target.value })} placeholder="89999" />
        <Input label="Security Deposit (₹)" type="number" value={formData.deposit} onChange={e => setFormData({ ...formData, deposit: e.target.value })} required />
        <Input label="Stock Quantity" type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required min="0" />
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-body-sm text-secondary-700">Featured Product</span>
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">Description</label>
        <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border border-secondary-300 px-4 py-2.5 text-sm text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none min-h-[100px] resize-y" placeholder="Product description..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">Specifications (JSON)</label>
        <textarea value={formData.specifications} onChange={e => setFormData({ ...formData, specifications: e.target.value })} className="w-full rounded-lg border border-secondary-300 px-4 py-2.5 text-sm text-secondary-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none min-h-[100px] resize-y font-mono text-xs" placeholder='[{"key": "Processor", "value": "Intel Core i7-1255U", "category": "processor"}]' />
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" loading={loading}>{product ? 'Update Product' : 'Create Product'}</Button>
      </div>
    </form>
  );
}

import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';