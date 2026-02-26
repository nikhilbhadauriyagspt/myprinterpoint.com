import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900 pb-20">
      
      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
             <nav className="flex items-center gap-2 text-[12px] font-semibold text-gray-400">
               <Link to="/" className="hover:text-[#007DBA] transition-colors">Home</Link>
               <ChevronRight size={14} className="text-gray-300" />
               <span className="text-black font-bold">Policies</span>
               <ChevronRight size={14} className="text-gray-300" />
               <span className="text-black font-bold">{title}</span>
             </nav>
             <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none tracking-tight">
               {title.split(' ').slice(0, -1).join(' ')} <span className="text-[#007DBA]">{title.split(' ').slice(-1)}</span>
             </h1>
          </div>

          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#F5F5F5] border border-[#e9e9e9] rounded-sm shrink-0">      
            <Clock size={16} className="text-[#007DBA]" />
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Revised: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* --- Main Content Stage --- */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Nav (Optional) */}
          <div className="hidden lg:block lg:col-span-3">
             <div className="sticky top-32 space-y-6">
                <div className="bg-white p-8 border border-[#e9e9e9] rounded-sm shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                      <FileText size={20} className="text-[#007DBA]" />
                      <h3 className="text-[14px] font-bold text-black">Policy Index</h3>
                   </div>
                   <div className="space-y-1">
                      {[
                        { label: "Privacy Policy", path: "/privacy-policy" },
                        { label: "Terms & Conditions", path: "/terms-and-conditions" },
                        { label: "Return Policy", path: "/return-policy" },
                        { label: "Shipping Policy", path: "/shipping-policy" },
                        { label: "Cookie Policy", path: "/cookie-policy" }
                      ].map((p) => (
                        <Link 
                          key={p.path} to={p.path} 
                          className={`block px-4 py-2 text-[13px] font-semibold rounded-sm transition-all ${title === p.label ? 'bg-[#007DBA] text-white shadow-lg shadow-blue-500/10' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                        >
                           {p.label}
                        </Link>
                      ))}
                   </div>
                </div>
                
                <div className="p-8 bg-black text-white rounded-sm relative overflow-hidden">
                   <h4 className="text-lg font-bold mb-3 relative z-10">Need Assistance?</h4>
                   <p className="text-gray-400 text-xs mb-6 leading-relaxed relative z-10">Our specialists are available to explain any of our legal terms or policies.</p>
                   <Link to="/contact" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#007DBA] hover:underline relative z-10 uppercase tracking-widest">
                      Contact Center
                   </Link>
                   <div className="absolute top-0 right-0 w-24 h-24 bg-[#007DBA]/10 blur-3xl rounded-full" />
                </div>
             </div>
          </div>

          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-16 border border-[#e9e9e9] rounded-sm shadow-sm"
            >
              {subtitle && (
                <div className="mb-12 pb-8 border-b border-gray-50">
                  <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-3xl italic">
                    {subtitle}
                  </p>
                </div>
              )}
              
              <article className="prose prose-slate max-w-none 
                prose-headings:text-black prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-gray-500 prose-p:text-base prose-p:leading-relaxed prose-p:mb-6
                prose-li:text-gray-500 prose-li:text-base prose-li:mb-2
                prose-strong:text-black prose-strong:font-bold
                prose-a:text-[#007DBA] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-hr:border-gray-100 prose-hr:my-16"
              >
                {children}
              </article>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
