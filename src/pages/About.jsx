import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Printer, Package, Wrench, Leaf, ChevronRight, CheckCircle2, Headphones, Sparkles, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/banner1.jpg";

export default function About() {
  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-slate-900 pb-20">
      <SEO
        title="About Us | Our Mission & Partnership"
        description="Learn about our commitment to authorized HP excellence, our journey, and the core pillars that drive our specialized hardware services."
      />

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-[#e9e9e9] py-8 md:py-12 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#007DBA]">
              <div className="w-1 h-4 bg-[#007DBA] rounded-full" />
              <span className="text-[12px] font-bold uppercase tracking-widest">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-none tracking-tight">
              Authorized <span className="text-[#007DBA]">Excellence.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#007DBA] rounded-sm border border-[#007DBA]/10">
            <CheckCircle2 size={16} />
            <span className="text-[11px] font-bold">Official HP Partner</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 space-y-24">

        {/* --- Section 1: The Vision --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 md:p-16 border border-[#e9e9e9] rounded-sm">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-black leading-tight">Built on Trust and Precision.</h2>
              <div className="w-12 h-1 bg-[#ffc122]" />
            </div>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Founded in 2026, victorprinter was established to solve a singular challenge: making the acquisition of high-performance printing infrastructure simple, transparent, and absolutely authentic. As a new generation authorized partner, we bridge the gap between complex industrial technology and a seamless, personalized experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-gray-50">
              <div className="space-y-1">
                <h4 className="text-3xl font-extrabold text-black">100%</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Genuine HP Inventory</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-extrabold text-black">24/7</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Certified Technical Support</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-[#e9e9e9] group">
              <img src={banner1} alt="Hardware Distribution" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* --- Section 2: Core Capabilities --- */}
        <section className="space-y-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-[11px] font-bold text-[#007DBA] uppercase tracking-[0.2em]">Operational Scope</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-black">Our Core Capabilities.</h2>
            <div className="w-12 h-1 bg-[#ffc122] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Printer, title: "Hardware Deployment", desc: "Expert selection of LaserJet, All-in-One, and high-volume industrial systems tailored for your business needs." },
              { icon: Package, title: "Supply Chain Excellence", desc: "Authorized source for 100% genuine HP ink, toner, and certified replacement parts with rapid nationwide delivery." },
              { icon: Headphones, title: "Specialist Support", desc: "Factory-trained technicians providing troubleshooting, installation guidance, and long-term hardware maintenance." }
            ].map((item, i) => (
              <motion.div
                key={i} whileHover={{ y: -5 }}
                className="p-10 bg-white border border-[#e9e9e9] rounded-sm group transition-all"
              >
                <div className="h-14 w-14 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#007DBA] group-hover:bg-[#007DBA] group-hover:text-white transition-all duration-500 mb-8">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 3: Values Module --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-12 md:p-16 bg-black text-white space-y-8 relative overflow-hidden rounded-sm">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Target className="text-[#007DBA]" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Our Mission</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">The Customer Standard.</h3>
              <p className="text-gray-400 text-base font-medium leading-relaxed max-w-md">
                To empower professionals with reliable, efficient, and sustainable hardware solutions through original products and certified advice. We believe in technology that works as hard as you do.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#007DBA]/10 blur-3xl rounded-full" />
          </div>

          <div className="p-12 md:p-16 bg-white border border-[#e9e9e9] text-black space-y-8 relative overflow-hidden rounded-sm">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Users className="text-[#007DBA]" size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Our Community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Nationwide Reach.</h2>
              <p className="text-gray-500 text-base font-medium leading-relaxed max-w-md">
                Expanding across the United States to deliver professional HP technology with unmatched logistics and long-term service value. Our network ensures you are never without technical support.
              </p>
            </div>
          </div>
        </div>

        {/* --- Section 4: Advantage Grid --- */}
        <div className="bg-white p-10 md:p-16 border border-[#e9e9e9] rounded-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-black">The victorprinter Advantage</h2>
              <p className="text-gray-400 text-sm font-semibold">Certified hardware ecosystem benefits</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#007DBA] hover:underline flex items-center gap-2">
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {[
              { title: "Authorized Status", icon: ShieldCheck },
              { title: "Genuine Supplies", icon: Package },
              { title: "Hardware Service", icon: Zap },
              { title: "Safe Logistics", icon: Globe },
              { title: "Original Hardware", icon: CheckCircle2 },
              { title: "Technical Center", icon: Headphones },
              { title: "Sustainable Tech", icon: Leaf },
              { title: "Professional Hub", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-sm bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center shrink-0 group-hover:text-[#007DBA] group-hover:bg-white group-hover:border-[#007DBA]/20 transition-all duration-300 shadow-sm">
                  <item.icon size={18} />
                </div>
                <h4 className="text-xs font-bold text-gray-700 group-hover:text-black transition-colors">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
