import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  Zap,
  Star,
  ArrowLeft,
  Info,
  Package,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;

          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-gray-100 border-t-[#007DBA] rounded-full mb-6"
        />
        <p className="text-[12px] font-bold text-gray-400">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-[#F5F5F5]">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 border border-[#e9e9e9]">
          <Info size={32} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-extrabold text-black mb-2">Device Not Found</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-sm">The requested hardware could not be located in our catalog.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#007DBA] text-white rounded-sm font-bold text-xs uppercase transition-all shadow-xl shadow-blue-500/10 hover:bg-black">Return to Catalog</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />

      {/* --- Breadcrumbs --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-6">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-[12px] font-semibold text-gray-400">
            <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link to="/shop" className="hover:text-[#007DBA] transition-colors">Shop</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-black truncate max-w-[200px] font-bold">{product.name}</span>
          </nav>

          <Link to="/shop" className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Stage: Visual Gallery */}
          <div className="lg:col-span-6">
            <div className="sticky top-32 space-y-6">
              <div
                className="aspect-square bg-white rounded-sm border border-[#e9e9e9] flex items-center justify-center p-12 overflow-hidden relative group"
              >
                <img
                  src={mainImage} alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-6 right-6 h-10 w-10 rounded-full flex items-center justify-center transition-all bg-white shadow-lg border border-gray-100 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>

                <div className="absolute bottom-6 left-6">
                  <div className="px-4 py-1.5 bg-[#ffc122] text-gray-900 rounded-full text-[10px] font-bold flex items-center gap-2 shadow-lg shadow-yellow-500/20">
                    <Zap size={14} /> Authorized Stock
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx} onClick={() => setActiveImage(idx)}
                      className={`h-24 w-24 rounded-sm border flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white ${activeImage === idx ? 'border-[#007DBA] ring-2 ring-[#007DBA]/10' : 'border-[#e9e9e9] hover:border-gray-400'}`}
                    >
                      <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Stage: Info & Actions */}
          <div className="lg:col-span-6">
            <div className="space-y-8 bg-white p-8 md:p-12 border border-[#e9e9e9] rounded-sm shadow-sm">

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold border border-gray-200">
                    {product.brand_name || 'Authorized Brand'}
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-end gap-6 pt-4">
                  <div className="space-y-0.5">
                    <p className="text-[12px] font-bold text-gray-400">Authorized MSRP</p>
                    <p className="text-4xl font-extrabold text-black">${parseFloat(product.price).toLocaleString()}</p>
                  </div>
                  {product.sale_price && (
                    <div className="pb-1 text-gray-300">
                      <span className="text-lg font-bold line-through">${product.sale_price}</span>
                      <p className="text-[11px] font-bold text-red-500 mt-0.5">Limited Offer</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-gray-500 text-base font-medium leading-relaxed">
                    {product.description || "High-performance printing solution designed for professional environments. Experience reliable output, advanced security features, and efficient performance."}
                  </p>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-14 px-4 bg-gray-50 rounded-sm border border-[#e9e9e9] flex items-center gap-8 w-full sm:w-auto">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-black transition-colors">
                      <Minus size={18} strokeWidth={3} />
                    </button>
                    <span className="text-lg font-bold text-black min-w-[20px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-black transition-colors">
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart} disabled={isAdded}
                    className={`flex-1 h-14 rounded-sm flex items-center justify-center gap-4 font-bold text-[13px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-70 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-[#007DBA] text-white hover:bg-black shadow-lg shadow-blue-500/10'}`}
                  >
                    {isAdded ? <><CheckCircle2 size={20} /> Item Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
                  </button>
                </div>

                {/* Service Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-[#e9e9e9] rounded-sm flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-50 text-[#007DBA] rounded-full flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-black">Fast Delivery</p>
                      <p className="text-[10px] font-semibold text-gray-400">Authorized Logistics</p>
                    </div>
                  </div>
                  <div className="p-5 border border-[#e9e9e9] rounded-sm flex items-center gap-4">
                    <div className="h-10 w-10 bg-yellow-50 text-[#ffc122] rounded-full flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-black">Secure Warranty</p>
                      <p className="text-[10px] font-semibold text-gray-400">Official Brand Support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Tabs */}
              <div className="pt-10 border-t border-gray-100">
                <div className="flex gap-8 mb-8 border-b border-gray-100">
                  {[
                    { id: 'specs', label: 'Technical Details' },
                    { id: 'support', label: 'Support Info' }
                  ].map(tab => (
                    <button
                      key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-[13px] font-bold relative transition-colors ${activeTab === tab.id ? 'text-[#007DBA]' : 'text-gray-400 hover:text-black'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007DBA]" />}
                    </button>
                  ))}
                </div>

                <div className="min-h-[120px]">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12">
                      {[
                        { label: "Manufacturer", value: product.brand_name || "Official Brand" },
                        { label: "Category", value: product.category_name || "Hardware" },
                        { label: "Model Type", value: "Premium Edition" },
                        { label: "Support", value: "Authorized Support" }
                      ].map((spec, i) => (
                        <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                          <span className="text-xs font-semibold text-gray-400">{spec.label}</span>
                          <span className="text-xs font-bold text-black">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'support' && (
                    <div className="bg-[#002d75] p-8 rounded-sm text-white">
                      <h4 className="text-lg font-bold mb-3">Need Technical Advice?</h4>
                      <p className="text-blue-100/70 text-sm mb-6 leading-relaxed">Our certified specialists can help with setup, configuration, and troubleshooting for your new hardware.</p>
                      <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold bg-[#007DBA] px-6 py-3 rounded-sm hover:bg-white hover:text-[#002d75] transition-all">
                        Contact Support <ExternalLink size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Related Products --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-[#e9e9e9]">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-extrabold text-black">Recommended Products</h2>
                <p className="text-gray-400 text-sm font-semibold">Authorized hardware combinations</p>
              </div>
              <Link to="/shop" className="text-xs font-bold text-[#007DBA] hover:underline flex items-center gap-2">
                View Full Catalog <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  to={`/product/${p.slug}`}
                  key={p.id}
                  className="group flex flex-col bg-white border border-[#e9e9e9] p-4 rounded-sm hover:shadow-xl transition-all"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="aspect-square flex items-center justify-center p-4 mb-4">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{p.brand_name || 'Brand'}</span>
                    <h4 className="text-[13px] font-bold text-black group-hover:text-[#007DBA] transition-colors leading-snug line-clamp-1">{p.name}</h4>
                    <p className="text-lg font-extrabold text-black">${parseFloat(p.price).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
