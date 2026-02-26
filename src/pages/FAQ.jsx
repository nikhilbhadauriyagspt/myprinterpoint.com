import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, Mail, MapPin, Plus, Minus, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on victorprinter?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on victorprinter secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell laptops, printers, and accessories from other trusted brands." },
      { q: "How can I choose the right hardware?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900 pb-20">
      <SEO
        title="Knowledge Base | Technical FAQ"
        description="Find detailed answers to common questions about orders, authorized hardware, shipping, and certified HP support."
      />

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[12px] font-semibold text-gray-400">
              <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-gray-300" />
              <span className="text-black font-bold">Knowledge Base</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none tracking-tight">
              Frequently Asked <span className="text-[#007DBA]">Questions.</span>
            </h1>
          </div>

          <div className="w-full max-w-lg relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007DBA] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search help documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all placeholder:text-gray-400 placeholder:font-medium shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white border border-[#e9e9e9] rounded-sm p-6 shadow-sm">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 block ml-2">Topic Categories</span>
              <div className="space-y-1">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setOpenIndex(0);
                    }}
                    className={`w-full text-left px-4 py-3.5 rounded-sm text-sm font-bold transition-all ${activeCategory === cat.category
                      ? 'bg-[#007DBA] text-white shadow-lg shadow-blue-500/10'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="p-10 bg-black text-white relative overflow-hidden rounded-sm group shadow-2xl">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-[#007DBA]" size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Technical Help</span>
                </div>
                <h4 className="text-xl font-extrabold leading-tight">Need Personal Support?</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Our certified specialists are ready to help with your technical inquiries.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#007DBA] hover:underline group">
                  Contact Agent <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#007DBA]/10 blur-3xl rounded-full" />
            </div>
          </div>

          {/* FAQ Accordion Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-5 bg-[#ffc122] rounded-full" />
                  <h3 className="text-2xl font-extrabold text-black">
                    {activeCategory}
                  </h3>
                </div>

                {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-sm border transition-all duration-300 overflow-hidden ${openIndex === idx ? 'border-[#007DBA] shadow-lg shadow-blue-500/5' : 'border-[#e9e9e9] hover:border-gray-300'
                      }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                      className="w-full px-8 py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-base font-bold leading-snug pr-10 transition-colors ${openIndex === idx ? 'text-[#007DBA]' : 'text-black group-hover:text-[#007DBA]'
                        }`}>
                        {faq.q}
                      </span>
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${openIndex === idx ? 'bg-[#007DBA] text-white rotate-180' : 'bg-gray-50 text-gray-300 group-hover:bg-[#007DBA] group-hover:text-white'
                        }`}>
                        {openIndex === idx ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {openIndex === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 pb-8">
                            <div className="bg-gray-50 rounded-sm p-8 border border-gray-100">
                              <p className="text-gray-500 text-base font-medium leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {filteredData.length === 0 && (
                  <div className="py-24 text-center bg-white rounded-sm border-2 border-dashed border-[#e9e9e9]">
                    <Search size={40} className="text-gray-200 mx-auto mb-6" />
                    <h4 className="text-lg font-bold text-black">No results found for your search</h4>
                    <p className="text-gray-400 font-medium mt-2">Try broader keywords for better help results.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
