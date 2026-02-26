import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  X,
  Loader2,
  SlidersHorizontal,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Eye,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Filters
  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const printers = d.data.find(c => c.slug === 'printers' || c.id === 46);
          setCategories(printers ? printers.children : []);
        }
      });
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p =>
            !p.name.toLowerCase().includes('laptop') &&
            !p.name.toLowerCase().includes('macbook') &&
            !p.name.toLowerCase().includes('notebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "https://via.placeholder.com/600x600?text=Product";
    } catch {
      return "https://via.placeholder.com/600x600?text=Product";
    }
  };

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900">
      <SEO title="Shop Authorized Printers | victorprinter" />

      {/* --- Page Header --- */}
      <div className="bg-white border-b border-[#e9e9e9]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-8 md:py-12">
          <nav className="flex items-center gap-2 text-[12px] font-semibold text-gray-400 mb-6">
            <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-[#007DBA] transition-colors">Shop</Link>
            {category && (
              <>
                <ChevronRight size={14} />
                <span className="text-slate-900 capitalize">{category.replace('-', ' ')}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black capitalize">
                {category ? category.replace('-', ' ') : brand || 'Store Catalog'}
              </h1>
              <p className="text-gray-500 font-medium text-sm max-w-2xl">
                Discover {total} high-performance printing solutions and original supplies.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#007DBA] rounded-md border border-[#007DBA]/10 self-start md:self-auto">
              <CheckCircle2 size={16} />
              <span className="text-[11px] font-bold">Authorized Inventory</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- Sidebar Filters --- */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-10">

              {/* Category Filter */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
                    <h3 className="text-[14px] font-bold text-black">Printer Type</h3>
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isCollectionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 pt-2">
                        <button
                          onClick={() => updateFilter('category', '')}
                          className={`w-full text-left px-4 py-2 rounded-sm text-[13px] font-semibold transition-all ${!category ? 'bg-[#007DBA] text-white' : 'text-gray-500 hover:bg-white border border-transparent hover:border-[#e9e9e9]'}`}
                        >
                          All Collections
                        </button>
                        {categories.map(cat => (
                          <div key={cat.id} className="space-y-1">
                            <div className={`flex items-center justify-between group rounded-sm transition-all ${category === cat.slug ? 'bg-[#007DBA]/5 border border-[#007DBA]/20' : 'hover:bg-white border border-transparent hover:border-[#e9e9e9]'}`}>
                              <button
                                onClick={() => updateFilter('category', cat.slug)}
                                className={`flex-1 text-left px-4 py-2 text-[13px] font-semibold transition-colors ${category === cat.slug ? 'text-[#007DBA]' : 'text-gray-500 group-hover:text-black'}`}
                              >
                                {cat.name}
                              </button>
                              {cat.children && cat.children.length > 0 && (
                                <button onClick={() => toggleCategory(cat.id)} className="p-2 text-gray-300 hover:text-[#007DBA]">
                                  {expandedCategories[cat.id] ? <Minus size={14} /> : <Plus size={14} />}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brand Filter */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-[#ffc122] rounded-full" />
                  <h3 className="text-[14px] font-bold text-black">Manufacturers</h3>
                </div>
                <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {brands.map(b => (
                    <button
                      key={b.id}
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-sm text-[13px] font-semibold transition-all border ${brand === b.name ? 'border-[#007DBA] bg-[#007DBA]/5 text-[#007DBA]' : 'border-[#e9e9e9] bg-white text-gray-500 hover:border-gray-300 hover:text-black'}`}
                    >
                      <span>{b.name}</span>
                      {brand === b.name && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Support CTA */}
              <div className="p-6 bg-[#002d75] rounded-lg text-white relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <h4 className="text-lg font-bold leading-tight">Need Help?</h4>
                  <p className="text-blue-100/70 text-xs font-medium leading-relaxed">Our specialists are ready to assist you.</p>
                  <Link to="/contact" className="block w-full py-3 bg-[#007DBA] text-white rounded-sm text-center text-xs font-bold hover:bg-white hover:text-[#002d75] transition-all">Chat with Expert</Link>
                </div>
              </div>
            </div>
          </aside>

          {/* --- Main Content --- */}
          <div className="flex-1">

            {/* Control Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 border border-[#e9e9e9] rounded-sm">
              <div className="flex items-center gap-4">
                <div className="text-[12px] font-bold text-gray-400">
                  Showing <span className="text-black">{total}</span> Hardware
                </div>
                <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-sm transition-all ${viewMode === 'grid' ? 'bg-[#007DBA] text-white' : 'text-gray-400 hover:text-black'}`}>
                    <LayoutGrid size={18} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-sm transition-all ${viewMode === 'list' ? 'bg-[#007DBA] text-white' : 'text-gray-400 hover:text-black'}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-[#e9e9e9] rounded-sm text-[13px] font-semibold text-gray-800 focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none bg-white border border-[#e9e9e9] pl-4 pr-10 py-2 rounded-sm text-[12px] font-bold text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="newest">Latest</option>
                    <option value="price_low">Price Low-High</option>
                    <option value="price_high">Price High-Low</option>
                    <option value="name_asc">A - Z</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden w-full flex items-center justify-center gap-3 py-3.5 bg-black text-white rounded-sm font-bold text-xs mb-8"
            >
              <Filter size={16} /> Refine Selection
            </button>

            {/* Grid Display */}
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center bg-white rounded-sm border border-[#e9e9e9]">
                <Loader2 className="h-10 w-10 animate-spin text-[#007DBA] mb-4" />
                <p className="text-[12px] font-bold text-gray-400">Loading hardware catalog...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center bg-white rounded-sm border border-[#e9e9e9]">
                <Search size={40} className="mx-auto text-gray-200 mb-6" />
                <h3 className="text-xl font-bold text-black mb-2">No results found</h3>
                <p className="text-gray-500 font-medium max-w-md mx-auto mb-8 text-sm px-6">Try adjusting your filters or search keywords.</p>
                <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-[#007DBA] text-white rounded-sm font-bold text-xs">Reset Filters</button>
              </div>
            ) : (
              <div className={`grid gap-x-4 gap-y-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                {products.map((p) => (
                  <div key={p.id} className={`group relative flex flex-col h-full bg-white border border-[#e9e9e9] hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'sm:flex-row gap-8 items-center p-6' : 'p-4'}`}>
                    {/* Visual Card */}
                    <Link
                      to={`/product/${p.slug}`}
                      className={`relative block overflow-hidden flex-shrink-0 ${viewMode === 'list' ? 'w-full sm:w-52 aspect-square' : 'aspect-square mb-4'}`}
                    >
                      <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className={`absolute top-0 right-0 h-8 w-8 rounded-full flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </Link>

                    {/* Content Section */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#007DBA]">{p.brand_name || 'Authorized'}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1 h-1 rounded-full bg-blue-100" />)}
                        </div>
                      </div>

                      <Link to={`/product/${p.slug}`} className="block mb-3">
                        <h3 className={`font-bold text-black group-hover:text-[#007DBA] transition-colors leading-snug line-clamp-2 ${viewMode === 'list' ? 'text-xl' : 'text-[14px]'}`}>
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-lg font-extrabold text-black">${parseFloat(p.price).toLocaleString()}</p>
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(p); }}
                          className="h-9 w-9 bg-gray-100 text-gray-900 rounded-sm flex items-center justify-center hover:bg-[#007DBA] hover:text-white transition-all"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Quick View Link (Only on Grid) */}
                    {viewMode === 'grid' && (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 p-4 bg-white border-t border-[#e9e9e9]">
                        <Link
                          to={`/product/${p.slug}`}
                          className="w-full py-2.5 bg-[#2f47ff] text-white text-[11px] font-bold rounded-sm flex items-center justify-center gap-2 hover:bg-[#2037ff]"
                        >
                          View Details
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Filter Drawer --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white z-[310] flex flex-col lg:hidden"
            >
              <div className="p-6 border-b border-[#e9e9e9] flex items-center justify-between bg-gray-50">
                <span className="text-[14px] font-bold text-black">Refine Selection</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Departments</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={`text-left py-3 px-4 text-sm font-semibold rounded-sm transition-all ${category === cat.slug ? 'bg-[#007DBA] text-white' : 'bg-gray-50 text-gray-600'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#e9e9e9]">
                <button
                  onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                  className="w-full py-4 bg-black text-white rounded-sm font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
