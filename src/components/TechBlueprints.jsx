import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Promotions collage (same layout as screenshot):
 * - Left: 1 big banner
 * - Right: top wide banner + bottom two small banners
 *
 * ✅ You will upload images and just replace the image paths below.
 * ✅ Text + buttons are in code (not on images).
 */
export default function SpecialsPromotions() {
  // 🔁 Replace these with your uploaded image paths
  const IMG = {
    left: "/banner/promo-left.jpg",
    topRight: "/banner/promo-top-right.jpg",
    bottomLeft: "/banner/promo-bottom-left.jpg",
    bottomRight: "/banner/promo-bottom-right.jpg",
  };

  return (
    <section className=" font-sans py-6  md:py-0">
      <div className="w-full mx-auto px-4 lg:px-16">
        <h2 className="text-[28px] md:text-[32px] font-extrabold text-black mb-6">
          Specials & Promotions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT BIG */}
          <PromoCard
            className="lg:col-span-5 min-h-[340px] md:min-h-[420px]"
            image={IMG.left}
            overlay="strong"
          >
            <p className="text-white/90 text-[12px] font-bold uppercase tracking-widest">
              Office Printing
            </p>

            <h3 className="mt-3 text-white text-[34px] md:text-[44px] font-extrabold leading-[1.02]">
              CLEARANCE
            </h3>

            <p className="mt-2 text-[#FFC122] text-[26px] md:text-[34px] font-extrabold leading-none">
              UP TO 60% OFF
            </p>

            <p className="mt-4 text-white/90 text-[13px] md:text-[14px] max-w-[320px] leading-relaxed">
              Free shipping on select printers & supplies
            </p>

            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#FFC122] hover:bg-[#ffb300] text-black text-[12px] font-bold px-6 py-3 transition-all"
                style={{ borderRadius: 0 }}
              >
                SHOP NOW <ArrowRight size={16} />
              </Link>
            </div>
          </PromoCard>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
            {/* TOP WIDE */}
            <PromoCard
              className="min-h-[200px] md:min-h-[220px]"
              image={IMG.topRight}
              overlay="soft"
              align="left"
            >
              <p className="text-red-400 text-[12px] font-extrabold uppercase tracking-widest">
                SAVE UP TO $150
              </p>

              <p className="mt-2 text-white/90 text-[12px] font-bold uppercase tracking-widest">
                Business Essentials
              </p>

              <h3 className="mt-3 text-white text-[28px] md:text-[36px] font-extrabold leading-[1.05]">
                LASER PRINTERS
              </h3>

              <Link
                to="/shop?category=laser-printers"
                className="mt-5 inline-flex items-center gap-2 text-white text-[13px] font-semibold hover:text-[#FFC122] transition-colors"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </PromoCard>

            {/* BOTTOM TWO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BOTTOM LEFT */}
              <PromoCard
                className="min-h-[200px] md:min-h-[220px]"
                image={IMG.bottomLeft}
                overlay="soft"
              >
                <h3 className="text-white text-[26px] md:text-[30px] font-extrabold leading-[1.05]">
                  INK TANK
                  <br />
                  INNOVATION
                </h3>

                <p className="mt-3 text-[#FFC122] text-[13px] font-bold uppercase tracking-widest">
                  2 YEARS WARRANTY
                </p>

                <Link
                  to="/shop?category=supertank-printers"
                  className="mt-5 inline-flex items-center gap-2 text-white text-[13px] font-semibold hover:text-[#FFC122] transition-colors"
                >
                  Shop Now <ArrowRight size={14} />
                </Link>
              </PromoCard>

              {/* BOTTOM RIGHT */}
              <PromoCard
                className="min-h-[200px] md:min-h-[220px]"
                image={IMG.bottomRight}
                overlay="strong"
              >
                <h3 className="text-white text-[26px] md:text-[30px] font-extrabold leading-[1.05]">
                  <span className="text-[#FFC122]">GENUINE</span>
                  <br />
                  INK & TONER
                </h3>

                <p className="mt-2 text-white/90 text-[13px] font-bold uppercase tracking-widest">
                  YOU NEED
                </p>

                <Link
                  to="/shop?category=printer-accessories"
                  className="mt-5 inline-flex items-center gap-2 text-white text-[13px] font-semibold hover:text-[#FFC122] transition-colors"
                >
                  Shop Now <ArrowRight size={14} />
                </Link>
              </PromoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * PromoCard helper
 * overlay:
 *  - "strong": deeper dark overlay for big text
 *  - "soft": lighter overlay
 * align:
 *  - "left" default
 *  - "center" (optional)
 */
function PromoCard({ image, children, className = "", overlay = "soft", align = "left" }) {
  const overlayClass =
    overlay === "strong"
      ? "bg-gradient-to-r from-black/70 via-black/45 to-black/15"
      : "bg-gradient-to-r from-black/60 via-black/30 to-black/10";

  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: 0 }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Content */}
      <div className={`relative z-10 h-full p-7 md:p-10 flex flex-col justify-center ${alignClass}`}>
        {children}
      </div>
    </div>
  );
}
