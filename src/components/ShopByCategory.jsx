import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayCategories.slice(0, 9).map((cat, idx) => (
            <div
              key={cat.id || cat.slug || idx}
              className="p-6 md:p-7 lg:py-9 bg-white "
            >
              <div className="flex items-start gap-6">
                {/* Image */}
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="w-[120px] h-[86px] md:w-[140px] md:h-[95px] shrink-0 flex items-center justify-center bg-white"
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
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        cat.name?.slice(0, 1) || "C"
                      )}&background=ffffff&color=111111&bold=true&size=128`;
                    }}
                  />
                </Link>

                {/* Text */}
                <div className="min-w-0">
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="block text-[15px] md:text-[16px] font-extrabold text-black hover:text-[#3b82f6] transition-colors"
                  >
                    {cat.name}
                  </Link>

                  <p className="mt-2 text-[13px] text-[#8d8d8d] leading-snug">
                    {getCategoryDesc(cat.slug)}
                  </p>

                  <div className="mt-3">
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center gap-2 bg-[#ffc122] hover:bg-[#ffb300] text-black text-[12px] font-bold px-4 py-2 transition-all"
                      style={{ borderRadius: 0, boxShadow: "none" }}
                    >
                      View Products
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
