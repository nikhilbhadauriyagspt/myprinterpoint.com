import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Headphones,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, cartTotal, openSearch } = useCart();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const catWrapRef = useRef(null);   // wrapper (button + dropdown)
  const catBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setCategories(data.data);
      })
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/products?limit=8`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setFeaturedProducts(data.data);
      })
      .catch(err => console.error(err));

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (e) => {
      if (catWrapRef.current && !catWrapRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SHOP', path: '/shop' },
    { name: 'PRODUCTS', path: '/shop', hasSubmenu: true },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 z-[150] transition-all duration-500 ${scrolled ? 'glass-header py-1 shadow-lg shadow-blue-500/5' : 'bg-white shadow-sm py-0'
        }`}
    >
      <style>{`
        .glass-header {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      {/* TOP ANNOUNCEMENT BAR - Now in Dark Navy */}
      <div className="bg-[#0f172a] py-2.5 hidden md:block">
        <div className="w-full mx-auto px-16 flex justify-between items-center text-[11px] font-bold tracking-wider text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            MYPRINTERPOINT - AUTHORIZED HP PARTNER
          </div>

          <div className="flex items-center gap-6 uppercase">
            <Link to="/shop" className="hover:text-white transition-colors">Catalog</Link>
            <Link to="/faq" className="hover:text-white transition-colors">Support</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* MAIN HEADER SECTION */}
      <div className="w-full mx-auto px-16 py-4 flex items-center justify-between gap-10">
        {/* Left: Logo & Category Toggle */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex-shrink-0 group">
            <img
              src="/logo/logo.png"
              alt="My Printer Point"
              className="h-10 md:h-12 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div
            ref={catWrapRef}
            className="hidden lg:block relative"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button
              ref={catBtnRef}
              type="button"
              className="flex items-center gap-3 cursor-pointer group select-none py-2.5 px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Menu size={18} />
              <span className="text-[13px] font-bold tracking-wide">
                Shop By Category
              </span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown directly under the button (Vertical Style) */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full mt-1 w-72 bg-white shadow-2xl border border-gray-100 z-[200] py-3 rounded-xl"
                >
                  <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {categories
                      .filter(cat => cat.name.toLowerCase().includes('printer'))
                      .map((cat) => (
                        <div key={cat.id} className="flex flex-col group/cat">
                          <Link
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setIsCategoryOpen(false)}
                            className="flex items-center justify-between px-6 py-3 hover:bg-blue-50 transition-all border-b border-gray-50/50"
                          >
                            <span className="text-[14px] font-bold text-gray-800 group-hover/cat:text-[#3b82f6]">
                              {cat.name}
                            </span>
                          </Link>
                          {cat.children && cat.children.length > 0 && (
                            <div className="py-1 bg-gray-50/30">
                              {cat.children.map(child => (
                                <Link
                                  key={child.id}
                                  to={`/shop?category=${child.slug}`}
                                  onClick={() => setIsCategoryOpen(false)}
                                  className="flex items-center justify-between px-8 py-2.5 hover:bg-blue-50/50 transition-all group/sub"
                                >
                                  <span className="text-[13px] font-semibold text-gray-500 group-hover/sub:text-[#3b82f6]">
                                    {child.name}
                                  </span>
                                  <ChevronDown
                                    size={12}
                                    className="-rotate-90 text-gray-300 group-hover/sub:text-[#3b82f6]"
                                  />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Search Bar (Triggers Overlay) */}
        <div className="flex-1 max-w-4xl relative hidden md:block">
          <div
            onClick={openSearch}
            className="w-full bg-[#F5F5F5] rounded-sm px-5 py-3 text-[13.5px] text-gray-400 flex items-center justify-between cursor-text hover:bg-[#efefef] transition-all"
          >
            <span>Search Products...</span>
            <Search size={19} className="text-black" />
          </div>
        </div>

        {/* Right: Icons (with labels like screenshot) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Help Center (icon + label) */}
          <Link
            to="/contact"
            className="hidden sm:flex items-center gap-2 px-2 py-1.5 group"
          >
            <div className="text-gray-400 group-hover:text-[#002d75] transition-colors">
              <Headphones size={25} strokeWidth={1.3} className='text-black' />
            </div>
            <span className="text-[12.5px] font-semibold text-gray-800 group-hover:text-[#3b82f6] transition-colors">
              Help Center
            </span>
          </Link>

          {/* Account */}
          <div className="relative group">
            <Link
              to={user ? '/profile' : '/login'}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-[#3b82f6] transition-colors"
              aria-label="Account"
            >
              <User size={25} strokeWidth={1.2} className='text-black' />
            </Link>

            {user && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[200] p-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#3b82f6] rounded-lg"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#3b82f6] rounded-lg"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-700 hover:text-[#3b82f6] transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={25} strokeWidth={1.2} className='text-black' />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-[#3b82f6] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart (icon + label + total, like screenshot) */}
          <button
            onClick={openCartDrawer}
            className="flex items-center gap-2 group relative px-2 py-1.5"
            aria-label="Cart"
          >
            <div className="relative text-gray-700 group-hover:text-[#3b82f6] transition-colors">
              <ShoppingCart size={24} strokeWidth={1.2} />
              <span className="absolute -top-1.5 -right-2 h-5 w-5 bg-[#3b82f6] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            </div>

            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-[12px] font-semibold text-gray-800">
                Your Cart
              </span>
              <span className="text-[12px] font-bold text-gray-900">
                ${cartTotal?.toFixed(2) || '0.00'}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="border-t border-gray-100 hidden lg:block">
        <div className="w-full mx-auto px-16 flex items-center justify-between">
          <nav className="flex items-center gap-9">
            {navLinks.map((link) => (
              <div key={link.name} className=" group py-3.5">
                <Link
                  to={link.path}
                  className={`flex items-center gap-1.5 text-[12.5px] font-semibold tracking-wide hover:text-[#3b82f6] transition-colors ${location.pathname === link.path
                    ? 'text-[#3b82f6]'
                    : 'text-gray-800'
                    }`}
                >
                  {link.name}
                  {link.hasSubmenu && (
                    <ChevronDown size={14} className="mt-0.5" />
                  )}
                </Link>

                {/* Dropdown for PRODUCTS/PAGES */}
                {link.hasSubmenu && link.name === 'PRODUCTS' && (
                  <div className="absolute top-full left-0 w-full right-0 bg-white shadow-2xl border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] py-10 pointer-events-none group-hover:pointer-events-auto">
                    <div className="w-full mx-auto px-16 flex gap-12">
                      {/* Left: Printer Categories List */}
                      <div className="w-1/4 border-r border-gray-100 pr-12">
                        <h3 className="text-[11px] font-extrabold text-[#3b82f6] uppercase tracking-[0.2em] mb-6">Printer Categories</h3>
                        <div className="space-y-6">
                          {categories
                            .filter(cat => cat.name.toLowerCase().includes('printer'))
                            .map((cat) => (
                              <div key={cat.id} className="space-y-3">
                                <Link
                                  to={`/shop?category=${cat.slug}`}
                                  className="block text-[15px] font-bold text-gray-900 hover:text-[#3b82f6] transition-colors"
                                >
                                  {cat.name}
                                </Link>
                                {cat.children && cat.children.length > 0 && (
                                  <div className="grid grid-cols-1 gap-2 pl-0">
                                    {cat.children.map(child => (
                                      <Link
                                        key={child.id}
                                        to={`/shop?category=${child.slug}`}
                                        className="text-[13.5px] font-semibold text-gray-500 hover:text-[#3b82f6] transition-colors flex items-center justify-between group/sub"
                                      >
                                        {child.name}
                                        <ChevronDown size={12} className="-rotate-90 text-gray-200 group-hover/sub:text-[#3b82f6]" />
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Right: Product Slider */}
                      <div className="w-3/4">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Featured Products</h3>
                          <Link to="/shop" className="text-xs font-bold text-[#3b82f6] hover:underline uppercase tracking-wider">See Everything →</Link>
                        </div>

                        <Swiper
                          modules={[Autoplay, FreeMode]}
                          spaceBetween={25}
                          slidesPerView={4}
                          freeMode={true}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          className="mega-menu-swiper"
                        >
                          {featuredProducts.map((p) => (
                            <SwiperSlide key={p.id}>
                              <Link
                                to={`/product/${p.slug}`}
                                className="group/item flex flex-col h-full bg-gray-50/50 rounded-2xl p-4 hover:bg-white hover:shadow-xl hover:shadow-blue-100/30 transition-all border border-transparent hover:border-blue-50"
                              >
                                <div className="aspect-square bg-white rounded-xl mb-4 p-4 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''}
                                    alt={p.name}
                                    className="max-w-full max-h-full object-contain group-hover/item:scale-110 transition-transform duration-500"
                                    onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  <h4 className="text-[13px] font-bold text-gray-800 line-clamp-2 mb-2 group-hover/item:text-[#3b82f6] transition-colors leading-snug">
                                    {p.name}
                                  </h4>
                                  <div className="mt-auto">
                                    <span className="text-[15px] font-extrabold text-[#3b82f6]">${p.price}</span>
                                  </div>
                                </div>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Contact Button */}
          <div className="flex items-center self-stretch">
            <Link
              to="/contact"
              className="px-8 flex items-center h-full bg-[#3b82f6] text-white text-[12px] font-bold uppercase tracking-wider rounded-none hover:bg-[#2563eb] transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER (kept your content/structure, only minor polish) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="p-5 border-b flex items-center justify-between bg-gray-50/50">
                <img
                  src="/logo/logo.png"
                  alt="My Printer Point Logo"
                  className="h-8 object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div
                  onClick={() => { setIsMobileMenuOpen(false); openSearch(); }}
                  className="mb-8 relative"
                >
                  <div className="w-full bg-gray-100 rounded-xl px-5 py-3.5 text-sm text-gray-400 flex items-center justify-between">
                    <span>Search Products...</span>
                    <Search size={18} className="text-gray-400" />
                  </div>
                </div>

                <nav className="space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-xl font-bold text-gray-800 hover:text-[#3b82f6] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-12 pt-10 border-t border-gray-100 space-y-5">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Shop By Category
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[15px] font-bold text-gray-700 hover:text-[#3b82f6]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-100 transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-4 bg-[#3b82f6] text-white text-center font-bold rounded-2xl shadow-lg shadow-blue-200"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}