import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Printer,
  MousePointer2,
  Eye,
  ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Grid } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

const SkeletonProduct = () => (
  <div className="border border-slate-100 p-5 flex flex-col bg-white h-[420px] rounded-3xl animate-pulse">
    <div className="w-full aspect-square bg-slate-50 rounded-2xl mb-4"></div>
    <div className="h-4 w-3/4 bg-slate-50 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-slate-50 rounded"></div>
  </div>
);

export default function FeaturedTabs({ printers = [], accessories = [], loading = false }) {
  const [activeTab, setActiveTab] = useState("printers");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const tabs = useMemo(
    () => [
      { id: "printers", label: "Printer Hardware", icon: Printer, count: printers.length, data: printers },
      { id: "accessories", label: "Supplies & Ink", icon: MousePointer2, count: accessories.length, data: accessories },
    ],
    [printers.length, accessories.length, printers, accessories]
  );

  const activeData = useMemo(
    () => (tabs.find((t) => t.id === activeTab)?.data || []).slice(0, 30), // Limit to a reasonable number for 3 rows
    [tabs, activeTab]
  );

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0
        ? `/${imgs[0]}`
        : "https://via.placeholder.com/600x600?text=Product";
    } catch {
      return "https://via.placeholder.com/600x600?text=Product";
    }
  };

  return (
    <section className="py-20 md:py-24 font-sans overflow-hidden">
      <div className="w-full mx-auto lg:px-16 px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-[2px] bg-blue-600"></span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em]">Our Collection</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-slate-400 italic font-light">Products.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-[12px] font-bold border rounded-full transition-all duration-300 ${activeTab === tab.id
                  ? "border-blue-600 text-white bg-blue-600 shadow-lg shadow-blue-500/20"
                  : "border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600 bg-slate-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="flex items-center gap-2 ml-4">
              <button
                id="featured-prev"
                className="h-11 w-11 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                id="featured-next"
                className="h-11 w-11 rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Slider frame */}
        <div className="relative">
          <Swiper
            key={activeTab}
            modules={[Autoplay, Navigation, Grid]}
            spaceBetween={24}
            slidesPerView={1}
            grid={{
              rows: 1,
              fill: 'row'
            }}
            navigation={{
              prevEl: '#featured-prev',
              nextEl: '#featured-next',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                grid: { rows: 2, fill: 'row' }
              },
              1024: {
                slidesPerView: 5,
                grid: { rows: 3, fill: 'row' }
              }
            }}
            className="featured-swiper !pb-12"
          >
            {loading ? (
              [...Array(12)].map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  <SkeletonProduct />
                </SwiperSlide>
              ))
            ) : (
              activeData.map((p) => (
                <SwiperSlide key={p.id} className="!h-auto">
                  <div className="group relative bg-slate-50/50 border border-slate-100 p-6 rounded-[2rem] flex flex-col h-full hover:bg-white hover:shadow-premium hover:border-blue-100 transition-all duration-500">
                    {/* Heart */}
                    <button
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-white border border-slate-50 flex items-center justify-center shadow-sm transition-all ${isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-red-500"
                        }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={18}
                        fill={isInWishlist(p.id) ? "currentColor" : "none"}
                      />
                    </button>

                    {/* Image */}
                    <Link
                      to={`/product/${p.slug}`}
                      className="block w-full aspect-square flex items-center justify-center p-4 bg-white rounded-2xl mb-5"
                    >
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.brand_name || "Premium"}</span>
                        <span className="text-blue-600 font-bold text-sm">${p.price}</span>
                      </div>

                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors mb-4">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => addToCart(p)}
                          className="flex-1 bg-slate-950 hover:bg-blue-600 text-white text-[10px] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                          <ShoppingCart size={14} />
                          ADD TO CART
                        </button>
                        <Link
                          to={`/product/${p.slug}`}
                          className="w-12 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
