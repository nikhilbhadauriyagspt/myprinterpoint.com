import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col font-sans border-l border-gray-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-xl font-extrabold text-black">Shopping Cart</h2>
                <p className="text-[12px] font-semibold text-[#007DBA] mt-0.5">{cartCount} items selected</p>
              </div>
              <button
                onClick={closeCartDrawer}
                className="h-10 w-10 rounded-full hover:bg-white flex items-center justify-center text-gray-400 hover:text-black transition-all border border-transparent hover:border-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => {
                    const getImagePath = (images) => {
                      try {
                        const imgs = typeof images === "string" ? JSON.parse(images) : images;
                        const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
                        if (!first) return "https://via.placeholder.com/150";
                        const cleaned = String(first).replaceAll("\\", "/");
                        return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
                      } catch {
                        return "https://via.placeholder.com/150";
                      }
                    };
                    
                    return (
                      <div key={item.id} className="flex gap-4 group pb-6 border-b border-gray-50 last:border-0">
                        <div className="h-24 w-24 rounded-lg bg-gray-50 p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/100x100?text=No+Image"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div className="relative pr-8">
                            <p className="text-[11px] font-bold text-[#007DBA] uppercase tracking-wider mb-1">{item.brand_name || 'Official Brand'}</p>
                            <h3 className="text-[14px] font-bold text-black leading-tight line-clamp-2 mb-1">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="absolute top-0 right-0 p-1 text-gray-300 hover:text-red-500 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                className="text-gray-500 hover:text-black transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-[13px] font-bold min-w-[20px] text-center text-black">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                className="text-gray-500 hover:text-black transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="text-[15px] font-bold text-black">
                              ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 max-w-[250px] mb-8">Looks like you haven't added anything to your cart yet.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="px-8 py-3 bg-[#007DBA] text-white text-[13px] font-bold rounded-full hover:bg-[#005f8d] transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-gray-500">Subtotal</span>
                  <span className="text-2xl font-extrabold text-black">${total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-white text-black border border-gray-200 rounded-lg flex items-center justify-center font-bold text-[14px] hover:bg-gray-50 transition-all"
                  >
                    View Shopping Cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-12 bg-[#2f47ff] text-white rounded-lg flex items-center justify-center gap-3 font-bold text-[14px] hover:bg-[#1a32e0] transition-all shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-5">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
