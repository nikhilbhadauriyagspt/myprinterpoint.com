import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Promotions collage:
 * - Redesigned to show only two high-impact banners in a 2-column grid.
 */
export default function SpecialsPromotions() {
  // 🔁 Replace these with your uploaded image paths
  const IMG = {
    left: "/banner/promo-left.jpg",
    right: "/banner/promo-top-right.jpg",
  };

  return (
    <section className="font-sans py-20 bg-white">
      <div className="w-full mx-auto px-4 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-[2px] bg-blue-600"></span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em]">Limited Time</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Specials & <span className="text-slate-400 italic font-light">Promotions.</span>
            </h2>
          </div>
          <Link to="/shop" className="text-blue-600 font-bold text-sm hover:underline uppercase tracking-widest flex items-center gap-2">
            View All Offers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BANNER 1 */}
          <PromoCard
            className="min-h-[400px] md:min-h-[500px]"
            image={IMG.left}
            overlay="strong"
          >
            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-6">
              Season Sale
            </span>

            <h3 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4">
              CLEARANCE <br/>
              <span className="text-blue-400 italic">EVENT.</span>
            </h3>

            <p className="text-white/80 text-lg max-w-sm mb-10 leading-relaxed font-medium">
              Up to <span className="text-white font-bold text-2xl">60% OFF</span> on select premium HP printers and authentic supplies.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 hover:text-white hover:shadow-2xl hover:shadow-blue-500/40 group/btn"
            >
              Shop the Sale
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </PromoCard>

          {/* BANNER 2 */}
          <PromoCard
            className="min-h-[400px] md:min-h-[500px]"
            image={IMG.right}
            overlay="soft"
          >
            <span className="inline-block px-4 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-600/30 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              Exclusive Access
            </span>

            <h3 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4">
              BUSINESS <br/>
              <span className="text-[#ffc122] italic text-5xl">SOLUTIONS.</span>
            </h3>

            <p className="text-white/80 text-lg max-w-sm mb-10 leading-relaxed font-medium">
              Empower your workspace with high-performance <span className="text-[#ffc122] font-bold">LaserJet systems</span>.
            </p>

            <Link
              to="/shop?category=laser-printers"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-[#ffc122] hover:text-slate-950 hover:shadow-2xl hover:shadow-amber-500/40 group/btn"
            >
              Explore Business Tech
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </PromoCard>
        </div>
      </div>
    </section>
  );
}

function PromoCard({ image, children, className = "", overlay = "soft" }) {
  return (
    <div className={`relative overflow-hidden group rounded-[3rem] shadow-premium ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        {/* Modern Gradient Overlays */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          overlay === "strong" 
            ? "bg-gradient-to-tr from-black/90 via-black/40 to-transparent" 
            : "bg-gradient-to-tr from-blue-950/80 via-slate-900/40 to-transparent"
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-10 md:p-14 flex flex-col justify-center items-start">
        {children}
      </div>
    </div>
  );
}
