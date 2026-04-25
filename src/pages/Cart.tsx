import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const orderData = {
      items: cart,
      total,
      customerName: formData.get('name'),
      customerEmail: formData.get('email'),
      customerPhone: formData.get('phone'),
      customerAddress: formData.get('address'),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        setOrderComplete(true);
        clearCart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 italic">Order Received!</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Your order has been placed successfully. Usman Tech Store will contact you shortly for verification and delivery.
        </p>
        <Link to="/shop" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 italic">Your Shopping Bag</h1>

      {cart.length === 0 ? (
        <div className="text-center py-24 space-y-6">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
          <Link to="/shop" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-6 p-4 bg-white border border-gray-100 rounded-3xl group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 italic">{item.name}</h3>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                    <span className="font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-white rounded-lg transition-colors text-gray-500"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-sm min-w-[1rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded-lg transition-colors text-gray-500"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-900 text-white p-8 rounded-3xl space-y-8">
              <h2 className="text-2xl font-bold italic">Order Summary</h2>
              
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10 italic">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>
              </div>

              {!isCheckingOut ? (
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 group shadow-xl shadow-blue-900/20"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <form onSubmit={handleCheckout} className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <input required name="name" placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <input required name="email" type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <input required name="phone" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <textarea required name="address" placeholder="Delivery Address" rows={3} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <button type="submit" className="w-full bg-white text-gray-900 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all">
                    Confirm Order (COD)
                  </button>
                  <button onClick={() => setIsCheckingOut(false)} className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors py-2">
                    Back to Summary
                  </button>
                </form>
              )}
              
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">
                Cash on Delivery Available Only
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
