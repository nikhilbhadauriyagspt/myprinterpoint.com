import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, History, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=10`);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions(data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (query) => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    closeSearch();
    setSearchQuery('');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm"
          />

          {/* Search Drawer (Half Screen) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-[500px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Search Products</h2>
              <button
                onClick={closeSearch}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Search Input */}
              <div className="p-6">
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for printers, ink..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 rounded-2xl px-5 py-4 pl-12 text-base font-semibold text-gray-800 outline-none border-2 border-transparent focus:border-[#3b82f6] focus:bg-white transition-all"
                  />
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3b82f6]"
                  />
                </form>
              </div>

              <div className="px-6 pb-10">
                {searchQuery.length > 1 ? (
                  <div className="space-y-6">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      {isSearching ? 'Searching...' : 'Search Results'}
                    </h3>
                    
                    <div className="space-y-4">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            closeSearch();
                          }}
                          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-left group w-full"
                        >
                          <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                            <img
                              src={product.images ? (typeof product.images === 'string' ? JSON.parse(product.images)[0] : product.images[0]) : ''}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-[#3b82f6]">
                              {product.name}
                            </h4>
                            <p className="text-[#3b82f6] font-bold mt-0.5 text-base">${product.price}</p>
                          </div>
                        </button>
                      ))}
                      
                      {!isSearching && suggestions.length === 0 && (
                        <div className="text-center py-10">
                          <p className="text-gray-400 text-sm italic font-medium">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {/* Recent / Popular */}
                    <div>
                      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <TrendingUp size={14} /> Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['HP LaserJet', 'Ink Tank', 'Smart Tank', 'Color LaserJet', 'Wireless Printer'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleQuickSearch(tag)}
                            className="px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-[#3b82f6] rounded-xl text-xs font-bold text-gray-600 transition-all border border-gray-100"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                        <History size={14} /> Quick Categories
                      </h3>
                      <div className="space-y-1">
                        {['All-in-One Printers', 'LaserJet Printers', 'Inkjet Printers', 'Toner & Supplies'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleQuickSearch(cat)}
                            className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-xl group transition-all"
                          >
                            <span className="font-bold text-gray-700 text-sm group-hover:text-[#3b82f6]">{cat}</span>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#3b82f6]" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Support Promo */}
                    <div className="p-6 bg-gradient-to-br from-[#002d75] to-[#3b82f6] rounded-3xl text-white">
                       <h4 className="font-bold mb-2">Not sure what you need?</h4>
                       <p className="text-xs text-blue-100 mb-4 font-medium leading-relaxed">Our printer experts are available 24/7 to help you choose the right model for your office or home.</p>
                       <button 
                         onClick={() => { navigate('/contact'); closeSearch(); }}
                         className="w-full py-3 bg-white text-[#002d75] rounded-xl font-bold text-xs hover:bg-blue-50 transition-all shadow-lg"
                       >
                         Chat with Expert
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
