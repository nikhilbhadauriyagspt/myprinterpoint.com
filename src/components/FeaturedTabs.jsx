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
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const SkeletonProduct = () => (
  <div className="border-l border-[#e9e9e9] p-5 flex flex-col bg-white h-[480px] animate-pulse">
    <div className="w-full aspect-square bg-gray-200 rounded-sm mb-4"></div>
    <div className="flex justify-between mb-4">
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
      <div className="h-4 w-20 bg-gray-200 rounded"></div>
    </div>
    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
    <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
    <div className="mt-auto flex gap-2">
      <div className="h-10 flex-1 bg-gray-200 rounded"></div>
      <div className="h-10 w-10 bg-gray-200 rounded"></div>
    </div>
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
    () => (tabs.find((t) => t.id === activeTab)?.data || []).slice(0, 300),
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
    <section className="py-12 md:py-16 font-sans overflow-hidden">
      <div className="w-full mx-auto lg:px-16 px-6">
        {/* Header row - Original Style */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[26px] md:text-[30px] font-extrabold text-black">
            Featured Products
          </h2>

          <div className="flex items-center gap-2">
            <button
              id="featured-prev"
              className="h-9 w-9 border border-[#e9e9e9] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ borderRadius: 999 }}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="featured-next"
              className="h-9 w-9 border border-[#e9e9e9] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{ borderRadius: 999 }}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Tabs - Original Style */}
        <div className="flex items-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-[12px] font-semibold border transition-colors ${activeTab === tab.id
                ? "border-[#007DBA] text-[#007DBA] bg-[#007DBA]/5"
                : "border-[#e9e9e9] text-[#555] hover:text-[#007DBA]"
                }`}
              style={{ borderRadius: 0 }}
            >
              {tab.label}{" "}
              <span className="text-[11px] opacity-60">({tab.count})</span>
            </button>
          ))}

          <Link
            to="/shop"
            className="ml-auto inline-flex items-center gap-2 text-[12px] font-semibold text-[#007DBA] hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Slider frame */}
        <div className="relative">
          <Swiper
            key={activeTab}
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: '#featured-prev',
              nextEl: '#featured-next',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 5 }
            }}
            className="featured-swiper !pb-24"
          >
            {loading ? (
              [...Array(5)].map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  <SkeletonProduct />
                </SwiperSlide>
              ))
            ) : (
              activeData.map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="group relative border-l border-[#e9e9e9] p-5 flex flex-col bg-white h-[480px]  hover:z-50 ">
                  {/* Heart */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-4 right-4 z-10 text-[#111] opacity-70 hover:opacity-100 ${isInWishlist(p.id) ? "text-red-500 opacity-100" : ""
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
                    className="block w-full aspect-square flex items-center justify-center"
                  >
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className="mt-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <p className="text-[#007DBA] font-semibold text-[14px]">
                        ${parseFloat(p.price || 0).toFixed(2)}
                      </p>
                      {/* Brand Name */}
                      <p className="text-[12px] text-[#8d8d8d] mt-0 font-semibold">
                        {p.brand_name || "Official Brand"}
                      </p>
                    </div>

                    <Link to={`/product/${p.slug}`} className="mt-2">
                      <h3 className="text-[14px] font-bold text-black leading-snug line-clamp-2 group-hover:text-[#007DBA] transition-colors h-16">
                        {p.name}
                      </h3>
                    </Link>

                    {/* Absolute Hover Action */}
                    <div className="absolute left-[-1px] right-[-1px] top-[100%] bg-white border-x border-b border-[#e9e9e9] p-5 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl z-[100] rounded-b-sm">
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="flex-1 bg-[#2f47ff] hover:bg-[#2037ff] text-white text-[11px] font-bold py-3 flex items-center justify-center gap-2 transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <ShoppingCart size={14} />
                          ADD TO CART
                        </button>
                        <Link
                          to={`/product/${p.slug}`}
                          className="px-4 bg-gray-100 hover:bg-[#ffc122] text-gray-700 hover:text-black flex items-center justify-center transition-colors"
                          aria-label="View Product"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
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
