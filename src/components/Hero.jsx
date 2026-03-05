import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import images from assets for reliable production loading
import banner1 from "@/assets/bannerr/banner-1.jpg";
import banner2 from "@/assets/bannerr/banner-2.jpg";
import bgRight from "/banner/promo-top-right.jpg";
import premiumFor from "/banner/promo-bottom-right.jpg";

const mainBanners = [
  {
    image: banner1, // Using assets banner
    title: "Next-Gen Printing",
    subtitle: "Precision & Speed",
    description: "Discover the latest HP LaserJet series for high-performance business printing.",
    cta: "Shop Now"
  },
  {
    image: banner2, // Using assets banner
    title: "Genuine Supplies",
    subtitle: "Original Ink & Toner",
    description: "Keep your printer healthy and your prints sharp with original HP supplies.",
    cta: "Browse Supplies"
  },
];

export default function Hero() {
  return (
    <div className="w-full font-sans overflow-hidden bg-[#f8fafc]">
      <div className="w-full mx-auto px-4 lg:px-16 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[650px]">

          {/* LEFT SECTION - IMAGE SLIDER */}
          <div className="lg:w-[70%] h-[400px] md:h-[500px] lg:h-full relative overflow-hidden bg-slate-100  group">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              speed={1000}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-white/50 !opacity-100 transition-all duration-300',
                bulletActiveClass: '!bg-white !w-8 !rounded-full'
              }}
              className="h-full w-full"
            >
              {mainBanners.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-20">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles size={16} className="text-[#ffc122]" />
                          <span className="text-[#ffc122] text-xs md:text-sm font-bold tracking-[0.3em] uppercase">{item.subtitle}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                          {item.title.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? "text-[#ffc122]" : ""}>{word} </span>
                          ))}
                        </h2>
                        <p className="text-white/80 text-sm md:text-lg max-w-lg mb-10 leading-relaxed font-medium">
                          {item.description}
                        </p>
                        <Link
                          to="/shop"
                          className="inline-flex items-center gap-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-2xl hover:shadow-blue-500/40 group/btn"
                        >
                          {item.cta}
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT SECTION - TWO STACKED BANNERS */}
          <div className="lg:w-[30%] flex flex-col gap-6 h-full">
            {/* Top Banner */}
            <div className="flex-1 relative overflow-hidden group  bg-[#0f172a]">
              <Link to="/shop" className="block h-full w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={bgRight}
                    alt="Authorized HP Smart Ink Solutions Banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-center z-20">
                  <span className="text-[#ffc122] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Exclusive Offer</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">Smart Ink <br /><span className="text-blue-400">Solutions</span></h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs font-bold group-hover:text-white transition-colors">
                    Shop Now <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom Banner */}
            <div className="flex-1 relative overflow-hidden group  bg-white border border-slate-100">
              <Link to="/shop" className="block h-full w-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={premiumFor}
                    alt="Premium Enterprise Printer Series Banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-center z-20">
                  <span className="text-[#ffc122] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">New Arrival</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">Enterprise <br /><span className="text-blue-400">Series</span></h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs font-bold group-hover:text-white transition-colors">
                    View Range <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
