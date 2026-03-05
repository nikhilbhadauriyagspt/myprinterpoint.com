import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ShopByCategoryGrid({ categories = [] }) {
  // Parent: Printers (same logic)
  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent?.children || [];

  const getImagePath = (image) => {
    if (!image) return null;
    return image.startsWith("/") ? image : `/${image}`;
  };

  const getCategoryDesc = (slug) => {
    const map = {
      "inkjet-printers": "Smooth color prints for home and daily work.",
      "laser-printers": "Fast, sharp printing for office documents.",
      "supertank-printers": "Low-cost high-volume printing with tanks.",
      "led-printers": "Clean, consistent prints with LED tech.",
      "thermal-printers": "Best for labels, bills, and barcodes.",
      "photo-printers": "Vibrant photo prints with rich colors.",
      "dot-matrix-printers": "Durable printing for invoices and forms.",
      "all-in-one-printers": "Print, scan, copy—one complete device.",
      "large-format-printers": "Wide prints for posters and designs.",
      "printer-accessories": "Supplies and add-ons for better output.",
    };

    return (
      map[slug] || "Explore the best printers and supplies for your needs."
    );
  };

  if (!displayCategories.length) return null;

  return (
    <section className=" font-sans">
      <div className="w-full mx-auto px-16">
        <h2 className="text-[26px] md:text-[30px] font-extrabold text-black mb-8">
          Top Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.slice(0, 9).map((cat, idx) => (
            <motion.div
              key={cat.id || cat.slug || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 md:p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-premium transition-all duration-500 hover:-translate-y-2 group border border-slate-50"
            >
              <div className="flex items-start gap-6">
                {/* Image */}
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden p-4 group-hover:bg-blue-50 transition-colors duration-500"
                  aria-label={cat.name}
                >
                  <img
                    src={
                      cat.image
                        ? getImagePath(cat.image)
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          cat.name?.slice(0, 1) || "C"
                        )}&background=ffffff&color=111111&bold=true&size=128`
                    }
                    alt={cat.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        cat.name?.slice(0, 1) || "C"
                      )}&background=ffffff&color=111111&bold=true&size=128`;
                    }}
                  />
                </Link>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="block text-lg md:text-xl font-bold text-slate-900 hover:text-[#3b82f6] transition-colors line-clamp-1"
                  >
                    {cat.name}
                  </Link>

                  <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {getCategoryDesc(cat.slug)}
                  </p>

                  <div className="mt-5">
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center gap-2 text-[#3b82f6] text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all"
                    >
                      Explore More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
