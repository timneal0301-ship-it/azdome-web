"use client";

import { useEffect, useState, type RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { useCart } from "./CartProvider";
import { useLocale } from "./LocaleProvider";
import { useAssetUrl } from "./AssetUrlsProvider";

type StickyBottomCTAProps = {
  productSlug?: string;
  productName?: string;
  image?: string;
  price?: number;
  comparePrice?: number;
  /**
   * When provided, the sticky bar appears once this element scrolls
   * above the viewport. Point it at the Buy Box wrapper.
   */
  triggerRef?: RefObject<HTMLElement | null>;
  /**
   * Fallback used when no triggerRef is supplied — show the bar once
   * scrollY passes this value.
   */
  scrollThreshold?: number;
};

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function StickyBottomCTA({
  productSlug = "m550-pro",
  productName = "M550 Pro 4K Dual Channel Dash Cam",
  image = "/images/product/m550-front.jpg",
  price = 129.99,
  comparePrice = 169.99,
  triggerRef,
  scrollThreshold = 700,
}: StickyBottomCTAProps) {
  const [visible, setVisible] = useState(false);
  const { add, open } = useCart();
  const { t } = useLocale();
  const resolvedImage = useAssetUrl(image);

  const handleAdd = () => {
    add({
      id: productSlug,
      productSlug,
      name: productName,
      price,
      image: resolvedImage,
    });
    open();
  };

  useEffect(() => {
    const triggerEl = triggerRef?.current;

    if (triggerEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Show only once the trigger's bottom has scrolled above the viewport.
          const scrolledPast =
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
          setVisible(scrolledPast);
        },
        { threshold: 0 },
      );
      observer.observe(triggerEl);
      return () => observer.disconnect();
    }

    const onScroll = () => setVisible(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerRef, scrollThreshold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{
            type: "tween",
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:px-6 md:pb-5"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-slate-100 backdrop-blur-xl md:gap-5 md:p-4">
            {/* Product summary */}
            <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 md:h-14 md:w-14">
                <Image
                  src={resolvedImage}
                  alt={productName}
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                  {productName}
                </p>
                <p className="flex items-baseline gap-2 text-xs text-slate-500 md:text-sm">
                  <span className="font-semibold text-slate-900">
                    {formatUSD(price)}
                  </span>
                  {comparePrice && comparePrice > price && (
                    <span className="text-slate-400 line-through">
                      {formatUSD(comparePrice)}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleAdd}
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md md:px-7 md:py-3"
            >
              <ShoppingBag className="hidden h-4 w-4 sm:block" />
              {t.cart.addToCart}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
