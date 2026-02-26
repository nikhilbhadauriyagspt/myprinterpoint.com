import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F5F5F5] font-sans text-center">
        <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center mb-8 border border-[#e9e9e9]">
          <Heart size={48} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-extrabold text-black mb-4 uppercase tracking-tight">Your Wishlist Is Empty</h2>
        <p className="text-gray-500 font-medium text-sm mb-12 max-w-md">Save your favorite hardware units here for future acquisition.</p>
        <Link to="/shop" className="px-12 py-5 bg-[#007DBA] text-white font-bold text-xs uppercase rounded-sm hover:bg-black transition-all shadow-xl shadow-blue-500/10 active:scale-95">
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 pb-20">
      
      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#007DBA]">
              <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Saved Hardware</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none tracking-tight">
              Your <span className="text-[#007DBA]">Favorites List.</span>
            </h1>
          </div>
          <p className="text-[13px] font-bold text-gray-400 bg-white px-5 py-2.5 rounded-sm border border-[#e9e9e9] shadow-sm">
            <span className="text-black font-extrabold">{wishlistCount}</span> Reserved Units
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col bg-white border border-[#e9e9e9] p-5 rounded-sm hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative aspect-square flex items-center justify-center mb-5 overflow-hidden">
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-0 right-0 h-9 w-9 bg-white text-gray-300 border border-gray-100 rounded-full shadow-sm flex items-center justify-center z-10 hover:text-red-500 hover:border-red-100 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  </Link>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full h-11 bg-black text-white rounded-sm flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#007DBA] transition-all"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#007DBA] uppercase tracking-widest">{p.brand_name || 'Authorized'}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-sm font-bold text-black group-hover:text-[#007DBA] transition-colors leading-snug line-clamp-1 mb-1">{p.name}</h3>
                  </Link>
                  <p className="text-lg font-extrabold text-black">${parseFloat(p.price).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-200">
          <Link to="/shop" className="inline-flex items-center gap-3 text-[12px] font-bold text-gray-400 hover:text-black transition-all group uppercase tracking-widest">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
