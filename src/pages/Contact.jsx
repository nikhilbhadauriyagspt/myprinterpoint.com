import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, MessageCircle, ArrowRight, Loader2, CheckCircle2, ChevronRight, Headphones, Phone, ChevronDown, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900 pb-20">
      <SEO
        title="Contact Us | Expert Technical Support"
        description="Connect with the My Printer Point team for technical support, bulk orders, or authorized hardware inquiries."
      />

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-8 md:py-12 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#007DBA]">
              <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Connect With Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none tracking-tight">
              Get In <span className="text-[#007DBA]">Touch.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#007DBA] rounded-sm border border-[#007DBA]/10">
            <Headphones size={16} />
            <span className="text-[11px] font-bold">Expert Support Available</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-8 md:p-10 bg-white border border-[#e9e9e9] rounded-sm group transition-all">
              <div className="h-14 w-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 text-[#007DBA] group-hover:bg-[#007DBA] group-hover:text-white transition-all duration-500">
                <Mail size={24} />
              </div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Email Support</h4>
              <p className="text-lg font-extrabold text-black">info@myprinterpoint.com</p>
              <p className="text-[12px] font-semibold text-gray-400 mt-2">Expect a response within 24 hours.</p>
            </div>

            <div className="p-8 md:p-10 bg-white border border-[#e9e9e9] rounded-sm group transition-all">
              <div className="h-14 w-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 text-[#007DBA] group-hover:bg-[#007DBA] group-hover:text-white transition-all duration-500">
                <MapPin size={24} />
              </div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">Office Location</h4>
              <p className="text-lg font-extrabold text-black">Pasadena, CA</p>
              <p className="text-[12px] font-semibold text-gray-400 mt-2">3883 EFoothill Blvd, 91107, USA</p>
            </div>


          </div>

          {/* Contact Form Stage */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#e9e9e9] rounded-sm p-8 md:p-16">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-black mb-4">Message Transmitted</h2>
                  <p className="text-gray-500 font-medium text-sm mb-12 max-w-md mx-auto">A specialist has been assigned to your case and will be in contact shortly.</p>
                  <button onClick={() => setStatus(null)} className="px-10 py-4 bg-[#007DBA] text-white font-bold text-xs uppercase rounded-sm hover:bg-black transition-all shadow-xl shadow-blue-500/10">New Inquiry</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input
                        required type="text" placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 px-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        required type="email" placeholder="Email for reply"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-14 px-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input
                        type="tel" placeholder="Mobile or office number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-14 px-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all placeholder:text-gray-400 placeholder:font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-14 px-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all appearance-none cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Order Tracking</option>
                          <option>Bulk Hardware Quotes</option>
                          <option>Warranty Assistance</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message Details</label>
                    <textarea
                      required rows="6" placeholder="Describe your technical request or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-6 bg-gray-50 border border-[#e9e9e9] rounded-sm focus:bg-white focus:border-[#007DBA] outline-none text-[13px] font-bold text-gray-900 transition-all resize-none placeholder:text-gray-400 placeholder:font-medium"
                    ></textarea>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full h-14 bg-[#007DBA] text-white rounded-sm flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-500/10 active:scale-95 disabled:opacity-50 group"
                  >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <><Send size={18} /> Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                  {status === 'error' && <p className="text-center text-red-500 text-[11px] font-bold uppercase tracking-widest">Transmission Error. Please try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
