import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import API_BASE_URL from "../config";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BrandStripSlider() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setBrands(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setLoading(false);
      });
  }, []);

  if (loading || brands.length === 0) return null;

  return (
    <section className="font-sans py-8 md:py-0">
      <div className="w-full mx-auto px-4 lg:px-16">
        {/* Header: title left, arrows right */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[28px] md:text-[30px] font-extrabold text-black">
            Parts By Brand
          </h2>

          <div className="flex items-center gap-2">
            <button
              id="brand-prev"
              className="h-10 w-10 border border-[#e9e9e9] bg-white flex items-center justify-center hover:bg-[#3b82f6] hover:text-white transition-all shadow-sm"
              style={{ borderRadius: 999 }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="brand-next"
              className="h-10 w-10 border border-[#e9e9e9] bg-white flex items-center justify-center hover:bg-[#3b82f6] hover:text-white transition-all shadow-sm"
              style={{ borderRadius: 999 }}
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Strip using Swiper for smooth auto-sliding */}
        <div className="border-y border-l border-[#e9e9e9] bg-white overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '#brand-prev',
              nextEl: '#brand-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 6 }
            }}
            className="brand-swiper"
          >
            {brands.map((brand, idx) => (
              <SwiperSlide key={brand.id || idx}>
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="h-[92px] md:h-[110px] flex items-center justify-center p-6 border-r border-[#e9e9e9] hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={
                      brand.logo?.startsWith("http")
                        ? brand.logo
                        : `/${String(brand.logo || "").replaceAll("\\", "/")}`
                    }
                    alt={brand.name}
                    className="max-h-[42px] md:max-h-[50px] w-auto object-contain opacity-95 hover:opacity-100 transition duration-500 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}