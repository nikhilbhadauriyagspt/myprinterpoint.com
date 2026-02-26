import { Truck, BadgeDollarSign, Headset, ShieldCheck } from "lucide-react";

export default function ServiceHighlights() {
  const items = [
    {
      title: "Worldwide Delivery",
      desc: "Delivery of goods all over the world",
      icon: Truck,
    },
    {
      title: "Satisfied Or Refunded",
      desc: "Guaranteed product quality and warranty",
      icon: BadgeDollarSign,
    },
    {
      title: "Top-Notch Support",
      desc: "Our live chat support is available Monday through Saturday",
      icon: Headset,
    },
    {
      title: "Secure Payments",
      desc: "Your payment information is processed securely",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className=" font-sans">
      <div className=" w-full mx-auto px-4 lg:px-16  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border-t border-b border-[#e9e9e9]">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className={[
                  "flex items-start gap-4 px-6 py-8",
                  "border-[#e9e9e9]",
                  // vertical dividers on large
                  idx < 3 ? "lg:border-r" : "",
                  // horizontal dividers on small
                  "border-b sm:border-b-0",
                  idx < 2 ? "sm:border-b" : "",
                  // clean hover like ecommerce
                  "hover:bg-[#fafafa] transition-colors",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <Icon size={30} strokeWidth={1.5} className="text-[#6b7280]" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-extrabold text-black leading-tight">
                    {it.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#8d8d8d] leading-snug">
                    {it.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}