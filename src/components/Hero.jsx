import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import assets
import bgRight from "@/assets/bannerr/Premium-Printer-For.png";
import banner1 from "@/assets/bannerr/banner1.png";
import banner2 from "@/assets/bannerr/banner2.png";
import banner3 from "@/assets/bannerr/banner3.png";

const mainBanners = [banner1, banner2, banner3];

export default function Hero() {
  return (
    <div className="w-full font-sans overflow-hidden">
      <div className="w-full mx-auto px-4 lg:px-16 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[400px] md:h-[500px] lg:h-[550px]">

          {/* LEFT SECTION - IMAGE SLIDER */}
          <div className="lg:w-[70%] relative overflow-hidden bg-gray-100 shadow-sm">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              speed={1000}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !w-10 !h-1 !rounded-none !bg-white/30 !opacity-100',
                bulletActiveClass: '!bg-[#ffc122] !w-16'
              }}
              className="h-full w-full"
            >
              {mainBanners.map((img, index) => (
                <SwiperSlide key={index}>
                  <Link to="/shop" className="block w-full h-full">
                    <img
                      src={img}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity duration-300"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* RIGHT SECTION (SMALLER) */}
          <div className="lg:w-[30%] relative overflow-hidden flex flex-col group shadow-sm">
            {/* Background Image for Right Section */}
            <Link to="/shop" className="block w-full h-full">
              <img
                src={bgRight}
                alt="Background Right"
                className="w-full h-full object-cover"
              />
            </Link>


          </div>
        </div>
      </div>
    </div>
  );
}
