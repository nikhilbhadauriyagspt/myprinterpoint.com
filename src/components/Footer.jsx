import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Loader2, ShieldCheck, ArrowRight, Zap, MapPin, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [printerChildren, setPrinterChildren] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          // Find the "Printers" parent category (ID 46 or slug "printers")
          const printers = data.data.find(c => c.slug === 'printers' || c.id === 46);
          if (printers && printers.children) {
            setPrinterChildren(printers.children);
          }
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Logic for Show More / Show Less
  const visibleCategories = showAll ? printerChildren : printerChildren.slice(0, 7);

  return (
    <footer className="bg-white font-sans border-t border-gray-100">

      {/* --- PREMIUM NEWSLETTER BAR --- */}
      <div className="bg-[#f9fafb] py-12 md:py-16">
        <div className="w-full mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3 uppercase tracking-tight">
                Unlock Exclusive <span className="text-[#3b82f6]">Printing Insights</span>
              </h3>
              <p className="text-gray-500 font-medium text-base">Subscribe to receive the latest updates on HP technology, maintenance tips, and special member-only offers.</p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-0 min-w-[320px] md:min-w-[500px] shadow-xl shadow-gray-200/50">
              <div className="relative flex-1 group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3b82f6] transition-colors" size={20} />
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your professional email"
                  className="w-full pl-14 pr-6 py-5 bg-white border border-transparent focus:bg-white text-gray-800 text-sm font-bold outline-none transition-all"
                />
              </div>
              <button
                disabled={loading}
                className="px-10 py-5 bg-gray-900 text-white font-extrabold text-[12px] uppercase tracking-[0.2em] hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Subscribe <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="py-16 md:py-24 bg-white">
        <div className="w-full mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Column 1: Identity */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-6">
                <Link to="/" className="block">
                  <img src="/logo/logo.png" alt="victorprinter" className="h-10 md:h-12 object-contain" />
                </Link>
                <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                  Authorized HP partner specializing in high-performance printing ecosystems. From enterprise-grade laser systems to precision inkjet technology, we empower modern workspaces with original hardware and dedicated technical expertise.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center text-[#3b82f6]">
                    <MapPin size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Corporate Office</p>
                    <p className="text-[14px] font-bold text-gray-800">1327 Eraste Landry Rd, Lafayette, LA 70506, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center text-[#3b82f6]">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">Affiliation</p>
                    <p className="text-[14px] font-bold text-gray-800">Direct Subsidiary of Primefix Solutions Group</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Shop', path: '/shop' },
                  { label: 'FAQ', path: '/faq' },
                  { label: 'Contact Us', path: '/contact' },
                  { label: 'My Orders', path: '/orders' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[14px] font-bold text-gray-500 hover:text-[#3b82f6] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Printer Solutions (With Show More/Less) */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.2em]">Printer Solutions</h4>
              <div className="grid grid-cols-1 gap-4">
                {visibleCategories.map(cat => (
                  <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="text-[14px] font-bold text-gray-500 hover:text-[#3b82f6] transition-colors">
                    {cat.name}
                  </Link>
                ))}

                {printerChildren.length > 7 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2 text-[13px] font-extrabold text-[#3b82f6] uppercase tracking-widest hover:text-black transition-colors pt-2"
                  >
                    {showAll ? (
                      <>Show Less <ChevronUp size={16} /></>
                    ) : (
                      <>Show More ({printerChildren.length - 7}) <ChevronDown size={16} /></>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Column 4: Legal & Policies */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-[0.2em]">Transparency</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Privacy Policy', path: '/privacy-policy' },
                  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { label: 'Return Policy', path: '/return-policy' },
                  { label: 'Shipping Policy', path: '/shipping-policy' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[14px] font-bold text-gray-500 hover:text-[#3b82f6] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl inline-flex items-center gap-4">
                  <img src="/brands/hp.png" alt="HP Partner" className="h-8 w-auto object-contain" />
                  <div className="h-8 w-px bg-blue-200"></div>
                  <p className="text-[10px] font-black text-[#3b82f6] uppercase leading-tight tracking-widest">Official<br />HP Hardware Partner</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- MINIMAL COMPLIANCE BAR --- */}
      <div className="bg-gray-900 py-10 text-gray-400">
        <div className="w-full mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[11px] font-bold uppercase tracking-widest">
              <span>© 2026 victorprinter Solutions Group. All Rights Reserved.</span>
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Globe size={14} /> <span>Serving Nationwide</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-black tracking-widest uppercase">
              <div className="flex items-center gap-2 text-[#3b82f6]">
                <ShieldCheck size={16} /> <span>Verified Merchant</span>
              </div>
              <div className="flex items-center gap-5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Visa_Logo.png" alt="Visa" className="h-3 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-[#ffc122]">
                <Zap size={16} /> <span>Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
