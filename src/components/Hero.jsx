import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Headphones, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import assets
import bgLeft from "@/assets/bannerr/banner-bgsingle.webp";
import bgRight from "@/assets/bannerr/bg-right.png";
import pro1 from "@/assets/products/pro-1.png";
import pro2 from "@/assets/products/pro-2.png";
import pro3 from "@/assets/products/pro-3.png";

const slides = [
  {
    id: 1,
    image: pro1,
    title: "HP LaserJet Pro Series",
    desc: "Experience professional-grade speed and world-class security.",
    badge: "Official HP Hardware Partner"
  },
  {
    id: 2,
    image: pro2,
    title: "Eco-Friendly Printing",
    desc: "Save more with high-capacity HP Smart Tank printers.",
    badge: "Sustainable Solutions"
  },
  {
    id: 3,
    image: pro3,
    title: "Vibrant Color Output",
    desc: "Unleash peak performance with HP Color LaserJet Pro.",
    badge: "Performance First"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full font-sans overflow-hidden">
      <div className="w-full mx-auto px-16 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[500px] md:h-[600px] lg:h-[650px]">

          {/* LEFT SECTION (LARGER) */}
          <div className="lg:w-[70%] relative  overflow-hidden  flex flex-row ">
            {/* Background Image for Left Section (No Gradient Overlay) */}
            <div className="absolute inset-0 z-0">
              <img
                src={bgLeft}
                alt="Background Left"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Left Content Area */}
            <div className="relative z-10 w-1/2 flex flex-col justify-center px-12 md:px-20 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide + '-badge'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ffc122] text-gray-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] w-fit shadow-lg shadow-yellow-500/20"
                >
                  {slides[currentSlide].badge}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide + '-title'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05]"
                >
                  {slides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i === 1 ? "text-[#ffc122]" : ""}>{word} </span>
                  ))}
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide + '-desc'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="text-base text-gray-200 font-bold max-w-sm leading-relaxed uppercase tracking-wide"
                >
                  {slides[currentSlide].desc}
                </motion.p>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6"
              >
                <Link to="/shop" className="px-12 py-5 bg-[#ffc122] text-gray-900 rounded-none font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all flex items-center gap-4 w-fit shadow-xl shadow-yellow-500/10">
                  Shop Collection <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>

            {/* Right: Large Product Image Slider */}
            <div className="relative z-10 w-1/2 flex items-center justify-center overflow-hidden">
              <Swiper
                modules={[Autoplay, Pagination]}
                speed={800}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !w-10 !h-1 !rounded-none !bg-white/30 !opacity-100',
                  bulletActiveClass: '!bg-[#ffc122] !w-16'
                }}
                className="h-full w-full"
              >
                {slides.map((p) => (
                  <SwiperSlide key={p.id} className="flex items-center justify-center bg-transparent">
                    <div className="flex items-center justify-center h-full w-full p-4">
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full max-h-[350px] flex items-center justify-center"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="max-w-full max-h-full object-contain drop-shadow-[0_30px_60px_rgba(255,193,34,0.15)]"
                        />
                      </motion.div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* RIGHT SECTION (SMALLER) */}
          <div className="lg:w-[30%] relative overflow-hidden flex flex-col group">
            {/* Background Image for Right Section */}
            <div className="absolute inset-0 z-0">
              <img
                src={bgRight}
                alt="Background Right"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content for Right Section - Positioned at 50% top height */}
            <div className="relative z-10 p-12 flex flex-col h-full">
              <div className="mt-[20%] translate-y-[-50%] space-y-6">
                <div className="w-12 h-1 bg-[#ffc122]" />
                <h2 className="text-3xl md:text-[45px] font-extrabold text-black leading-[1.4]">
                  Premium
                  Solutions For Business.
                </h2>
                <p className="text-sm text-black font-bold uppercase tracking-widest leading-relaxed">
                  Authorized HP partner  delivering excellence.
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
