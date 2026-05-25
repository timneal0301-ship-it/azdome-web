"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { lookupPromo } from "@/app/[locale]/cart/actions";

export type CartItem = {
  id: string;
  productSlug: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  image: string;
};

/** Promo state the cart holds in memory + localStorage. Stored fields
 *  are the ones we need to display + recompute discount client-side; full
 *  validation (min subtotal, expiry, active flag) lives server-side and
 *  is re-checked on apply. */
export type AppliedPromo = {
  code: string;
  type: "percent" | "amount";
  value: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  promo: AppliedPromo | null;
  /** Computed discount in USD for the current subtotal + promo. 0 when no promo. */
  discount: number;
  /** Subtotal minus discount, never negative. */
  total: number;
  promoError: string | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => Promise<{ ok: boolean; error?: string }>;
  removePromo: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

const STORAGE_KEY = "azdome.cart.v1";
const PROMO_STORAGE_KEY = "azdome.cart.promo.v1";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<AppliedPromo | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on first mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      const rawPromo = localStorage.getItem(PROMO_STORAGE_KEY);
      if (rawPromo) {
        const p = JSON.parse(rawPromo);
        if (p && typeof p.code === "string") setPromo(p);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist items.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* quota or private mode */
    }
  }, [items, hydrated]);

  // Persist promo.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (promo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch {
      /* quota or private mode */
    }
  }, [promo, hydrated]);

  const add = useCallback<CartContextValue["add"]>((incoming) => {
    const qty = incoming.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === incoming.id);
      if (existing) {
        return prev.map((p) =>
          p.id === incoming.id ? { ...p, quantity: p.quantity + qty } : p,
        );
      }
      return [...prev, { ...incoming, quantity: qty }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setPromo(null);
    setPromoError(null);
  }, []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const removePromo = useCallback(() => {
    setPromo(null);
    setPromoError(null);
  }, []);

  // Server-validated promo apply. The server re-checks min subtotal,
  // expiry, and active flag against the current cart so a stale client
  // can't sneak a discount through. Stores only the discount shape (not
  // expiry / minSubtotal) since those don't affect display once applied.
  const applyPromo = useCallback<CartContextValue["applyPromo"]>(
    async (rawCode) => {
      const code = rawCode.trim();
      if (!code) {
        setPromoError("请输入促销码");
        return { ok: false, error: "请输入促销码" };
      }
      // Snapshot subtotal at call time — server validates against this.
      const currentSubtotal = items.reduce(
        (s, i) => s + i.price * i.quantity,
        0,
      );
      const r = await lookupPromo(code, currentSubtotal);
      if (!r.ok) {
        const msg = errorFor(r.reason);
        setPromoError(msg);
        return { ok: false, error: msg };
      }
      setPromo({ code: r.code, type: r.type, value: r.value });
      setPromoError(null);
      return { ok: true };
    },
    [items],
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    // Recompute discount client-side from the stored type+value. Real
    // re-validation (expiry, min-subtotal, active flag) happens server-
    // side at checkout — this number is only for in-cart display.
    let discount = 0;
    if (promo && subtotal > 0) {
      const raw =
        promo.type === "percent" ? subtotal * (promo.value / 100) : promo.value;
      discount = Math.round(Math.min(raw, subtotal) * 100) / 100;
    }
    const total = Math.max(0, subtotal - discount);
    return {
      items,
      count,
      subtotal,
      promo,
      discount,
      total,
      promoError,
      isOpen,
      open,
      close,
      add,
      remove,
      updateQty,
      clear,
      applyPromo,
      removePromo,
    };
  }, [
    items,
    promo,
    promoError,
    isOpen,
    add,
    remove,
    updateQty,
    clear,
    open,
    close,
    applyPromo,
    removePromo,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function errorFor(reason: string): string {
  switch (reason) {
    case "not-found":
      return "促销码无效或不存在";
    case "inactive":
      return "促销码已停用";
    case "expired":
      return "促销码已过期";
    case "min-subtotal":
      return "未达到此促销码的最低订单金额";
    case "zero-subtotal":
      return "购物车为空时无法使用促销码";
    default:
      return "促销码无法使用";
  }
}
