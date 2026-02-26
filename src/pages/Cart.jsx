import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShieldCheck, Zap, ChevronLeft, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F5F5F5] font-sans text-center">
        <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center mb-8 border border-[#e9e9e9]">
          <ShoppingCart size={48} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-extrabold text-black mb-4">Your Cart Is Empty</h2>
        <p className="text-gray-500 font-medium text-sm mb-12 max-w-md">You haven't added any authorized hardware to your selection yet.</p>
        <Link to="/shop" className="px-12 py-5 bg-[#007DBA] text-white font-bold text-xs uppercase rounded-sm hover:bg-black transition-all shadow-xl shadow-blue-500/10 active:scale-95">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 pb-20">
      
      {/* --- Breadcrumbs --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-8 md:py-12 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#007DBA]">
              <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Order Review</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none">
              Your <span className="text-[#007DBA]">Shopping Cart.</span>
            </h1>
          </div>
          <p className="text-[13px] font-bold text-gray-400 bg-white px-5 py-2.5 rounded-sm border border-[#e9e9e9] shadow-sm">
            <span className="text-black font-extrabold">{cartCount}</span> Items In Cart
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20">

          {/* Cart Items */}
          <div className="xl:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-sm border border-[#e9e9e9] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/product/${item.slug}`} className="h-40 w-40 rounded-sm bg-gray-50 p-6 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-500">
                    <img
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150?text=Hardware"; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col mb-6">
                      <span className="text-[11px] font-bold text-[#007DBA] uppercase tracking-widest mb-1.5">{item.brand_name || 'Authorized'}</span>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="text-xl font-bold text-black hover:text-[#007DBA] transition-colors leading-tight line-clamp-2">{item.name}</h3>
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-10">
                        <div className="h-12 px-3 bg-gray-50 rounded-sm border border-[#e9e9e9] flex items-center gap-6">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-black transition-colors"><Minus size={16} strokeWidth={3} /></button>
                          <span className="text-sm font-bold text-black w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black transition-colors"><Plus size={16} strokeWidth={3} /></button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Unit Price</span>
                          <span className="text-xl font-extrabold text-black leading-none">${item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total</span>
                          <span className="text-2xl font-extrabold text-[#007DBA] leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="h-10 w-px bg-gray-100 hidden sm:block" />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-10 w-10 text-gray-300 flex items-center justify-center hover:text-red-500 transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[12px] font-bold text-gray-400 hover:text-black transition-all pt-10 group uppercase tracking-widest">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Continue Shopping
            </Link>
          </div>

          {/* Summary Module */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-sm p-10 lg:p-12 text-slate-900 border border-[#e9e9e9] shadow-sm sticky top-32">
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 text-[#007DBA] rounded-full flex items-center justify-center">
                   <Package size={22} />
                </div>
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-widest">Order Summary</h3>
                   <p className="text-[11px] text-gray-400 font-semibold mt-1">Authorized Purchase</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-bold text-black">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Logistics</span>
                  <span className="text-[11px] font-bold text-[#007DBA] uppercase bg-blue-50 px-3 py-1 border border-[#007DBA]/10">Calculated Next</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-[13px] font-bold uppercase tracking-widest text-black">Grand Total</span>
                  <span className="text-4xl font-extrabold text-[#007DBA] leading-none tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full h-14 bg-[#007DBA] hover:bg-black text-white rounded-sm flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/10 active:scale-95 group"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-12 pt-8 border-t border-gray-100 space-y-6">
                <div className="flex items-center gap-4 text-gray-400">
                  <ShieldCheck size={24} className="text-[#007DBA] shrink-0" />
                  <p className="text-[11px] font-semibold leading-relaxed">
                    Secure HP Authorized Merchant. Your purchase is protected by brand warranty.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
