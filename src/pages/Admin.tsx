import { useState, useEffect } from 'react';
import { Package, ShoppingBag, Users, DollarSign, Plus, Trash2, Edit2, ShieldAlert, CheckCircle, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Order } from '../types';
import { fetchApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('orders');

  useEffect(() => {
    if (user?.isAdmin) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, ordersData] = await Promise.all([
        fetchApi<Product[]>('/api/products'),
        fetchApi<Order[]>('/api/orders')
      ]);
      setProducts(productsData);
      setOrders(ordersData);
      setError(null);
    } catch (err) {
      setError('Connection refused. Verify terminal status.');
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async (id: string) => {
    try {
      await fetchApi(`/api/orders/${id}/approve`, { method: 'PATCH' });
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'approved' } : o));
    } catch (err) {
      alert('Action failed: Permission denied or network error.');
    }
  };

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Covers',
    image: '',
    description: '',
    stock: 10
  });

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await fetchApi(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify(editingProduct)
      });
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    } catch (err) {
      alert('Failed to update product.');
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await fetchApi<Product>('/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct)
      });
      setProducts([...products, created]);
      setIsAddingProduct(false);
      setNewProduct({ name: '', price: 0, category: 'Covers', image: '', description: '', stock: 10 });
    } catch (err) {
      alert('Failed to add product.');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Permanent deletion requested. Proceed?')) return;
    try {
      await fetchApi(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Deletion failed.');
    }
  };

  if (authLoading) return <div className="p-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 animate-pulse">Authenticating Session...</div>;
  
  if (!user?.isAdmin) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-slate-50">
        <div className="max-w-md w-full bg-white p-12 rounded-[2rem] border border-slate-200 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto">
            <Lock size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-serif italic text-slate-900">Access <span className="font-bold">Restricted</span></h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold leading-relaxed px-4">
              Your account does not have the necessary clearance level to access the management console.
            </p>
          </div>
          <Link to="/login" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
            Switch Account
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 animate-pulse">
        Initializing Secure Terminal...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-full overflow-y-auto">
      <div className="flex justify-between items-end border-b border-slate-200 pb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block mb-2">Management Terminal (HKWPRO)</span>
          <h1 className="text-4xl font-serif italic text-slate-900">Tech Store <span className="font-bold border-b-2 border-indigo-600">Console</span></h1>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400 hover:text-slate-900'}`}
            >
              Order Log
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-400 hover:text-slate-900'}`}
            >
              Inventory
            </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 text-white p-4 rounded-lg flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
          <ShieldAlert size={16} />
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Package, label: 'Active STOCK', value: products.length, trend: '+12%', color: 'indigo' },
          { icon: ShoppingBag, label: 'Pending ORDERS', value: orders.filter(o => o.status === 'pending').length, trend: 'LIVE', color: 'green' },
          { icon: Users, label: 'Active Sessions', value: '1,244', trend: '+12', color: 'slate' },
          { icon: DollarSign, label: 'Total Volume', value: `RS. ${orders.reduce((s,o) => s+o.total, 0)}`, trend: '+5%', color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                <stat.icon size={20} />
              </div>
              <span className={`text-[9px] font-black ${stat.color === 'green' ? 'text-green-500 bg-green-50' : 'text-indigo-500 bg-indigo-50'} px-2 py-1 rounded`}>{stat.trend}</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'inventory' ? (
        <>
          {isAddingProduct && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-slate-900">Add <span className="font-bold underline decoration-indigo-600">New Item</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Inventory Catalog Entry</p>
                </div>
                <form onSubmit={addProduct} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Product Name</label>
                    <input 
                      type="text" 
                      required
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Price (RS.)</label>
                      <input 
                        type="number" 
                        required
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Category</label>
                      <select 
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                      >
                        <option>Covers</option>
                        <option>Glass</option>
                        <option>Chargers</option>
                        <option>Cables</option>
                        <option>AirPods Pro Case</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Image URL</label>
                    <input 
                      type="text" 
                      required
                      value={newProduct.image}
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Description</label>
                    <textarea 
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20 h-24"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsAddingProduct(false)}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                    >
                      Create Unit
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          {editingProduct && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-slate-900">Edit <span className="font-bold underline decoration-indigo-600">Product</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Unit ID: {editingProduct.id}</p>
                </div>
                <form onSubmit={updateProduct} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Product Price (RS.)</label>
                    <input 
                      type="number" 
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Image Asset URL</label>
                    <input 
                      type="text" 
                      value={editingProduct.image}
                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-600/20"
                    >
                      Commit Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 leading-none">Stock Inventory</h3>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="p-2 hover:bg-indigo-600 hover:text-white bg-white border border-slate-200 rounded-lg transition-all shadow-sm flex items-center gap-2 group"
            >
              <Plus size={16} className="text-indigo-600 group-hover:text-white" />
              <span className="text-[9px] font-black uppercase tracking-widest pr-1">New Entry</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4">Product Unit</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Unit Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0">
                         <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      {product.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-green-600 font-bold uppercase text-[9px] bg-green-50 px-2 py-0.5 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        Operational
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-slate-500">
                      RS. {product.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 leading-none">Order Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4">Customer Detail</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Settlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <p>{order.customerName}</p>
                      <p className="text-[9px] font-mono text-slate-400 font-normal tracking-tight">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex -space-x-1">
                            {order.items.slice(0, 3).map((item, i) => (
                                <img key={i} src={item.image} className="w-6 h-6 rounded-full border border-white" />
                            ))}
                            {order.items.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-slate-100 border border-white flex items-center justify-center text-[8px] font-black">+{order.items.length - 3}</div>
                            )}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        {order.status === 'pending' ? (
                            <button 
                              onClick={() => approveOrder(order.id)}
                              className="bg-indigo-600 text-white px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors"
                            >
                                Process Settlement
                            </button>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-green-600 font-black text-[9px] uppercase">
                                <CheckCircle size={10} />
                                Approved
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                      RS. {order.total}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">No transaction logs found.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
