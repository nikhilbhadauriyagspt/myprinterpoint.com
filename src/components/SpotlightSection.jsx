import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const SpotlightBlock = ({ title, data, colIndex }) => {
  const perPage = 3;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const maxPage = Math.max(0, Math.ceil((data?.length || 0) / perPage) - 1);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };
  const goNext = () => {
    setDirection(1);
    setPage((p) => Math.min(maxPage, p + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
      if (!first) return null;
      const cleaned = String(first).replaceAll("\\", "/");
      return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch {
      return null;
    }
  };

  const pageItems = (data || []).slice(page * perPage, page * perPage + perPage);

  return (
    <div className={`bg-white ${colIndex < 2 ? "lg:border-r border-[#ededed]" : ""}`}>
      <div className="flex items-center justify-between px-7 py-5">
        <h3 className="text-[26px] font-extrabold text-black">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="h-9 w-9 border border-[#e9e9e9] bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            style={{ borderRadius: 999 }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="h-9 w-9 border border-[#e9e9e9] bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            style={{ borderRadius: 999 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="px-7 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {pageItems.length ? (
              pageItems.map((p) => (
                <div
                  key={p.id}
                  className="block py-7 border-b border-[#ededed] hover:bg-[#fafafa] transition-colors relative group"
                >
                  <div className="flex items-center gap-5">
                    <Link to={`/product/${p.slug}`} className="w-[70px] h-[55px] flex items-center justify-center shrink-0">
                      <img
                        src={getImagePath(p.images) || "https://via.placeholder.com/120x90?text=Product"}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/120x90?text=Product"; }}
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-[#007DBA] mb-1">
                        ${Number(p?.price || 0).toFixed(2)}
                      </p>
                      <Link to={`/product/${p.slug}`} className="text-[13px] font-bold text-black line-clamp-1 group-hover:text-[#007DBA] transition-colors">
                        {p.name}
                      </Link>

                      {/* Action Icons replacing Reviews */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(p); }}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-[#007DBA] transition-colors"
                        >
                          <ShoppingCart size={14} />
                          ADD TO CART
                        </button>
                        <span className="w-px h-3 bg-gray-300"></span>
                        <button
                          onClick={(e) => { e.preventDefault(); navigate(`/product/${p.slug}`); }}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-[#ffc122] transition-colors"
                        >
                          <Eye size={14} />
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-2 py-10 text-[#8d8d8d] text-sm">No products found.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function TripleSpotlightSection({
  newArrivals = [],
  topRated = [],
  popular = [],
}) {
  const normalizeList = (input) => {
    if (Array.isArray(input)) return input;
    if (input && Array.isArray(input.data)) return input.data;
    return [];
  };

  return (
    <section className=" font-sans py-12 md:py-20 border-t border-gray-100">
      <div className="w-full mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#ededed]">
          <SpotlightBlock title="New Arrivals" data={normalizeList(newArrivals)} colIndex={0} />
          <SpotlightBlock title="Top Rated" data={normalizeList(topRated)} colIndex={1} />
          <SpotlightBlock title="Popular Products" data={normalizeList(popular)} colIndex={2} />
        </div>
      </div>
    </section>
  );
}