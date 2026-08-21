import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { money } from "../lib/data";
import { useSettings } from "./SettingsContext";
import type { CartItem } from "../lib/types";

interface CartLine {
  name: string;
  price: number;
  qty: number;
}

type CartMap = Record<string, CartLine>;

interface CartContextValue {
  cartItems: CartItem[];
  cartTotal: number;
  cartTotalFmt: string;
  cartCount: number;
  hasCart: boolean;
  cartEmpty: boolean;
  cartOpen: boolean;
  toggleCart: () => void;
  addTo: (product: { id: string; name: string; price: number }) => void;
  bump: (id: string, d: number) => void;
  waLink: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { whatsappLink } = useSettings();
  const [cart, setCart] = useState<CartMap>({});
  const [cartOpen, setCartOpen] = useState(false);

  const addTo = (product: { id: string; name: string; price: number }) => {
    setCart((c) => {
      const existing = c[product.id];
      return {
        ...c,
        [product.id]: { name: product.name, price: product.price, qty: (existing?.qty || 0) + 1 },
      };
    });
    setCartOpen(true);
  };

  const bump = (id: string, d: number) => {
    setCart((c) => {
      const next = { ...c };
      const line = next[id];
      if (!line) return c;
      const q = line.qty + d;
      if (q <= 0) delete next[id];
      else next[id] = { ...line, qty: q };
      return next;
    });
  };

  const toggleCart = () => setCartOpen((v) => !v);

  const cartItems = useMemo<CartItem[]>(
    () => Object.entries(cart).map(([id, line]) => ({ id, name: line.name, priceFmt: money(line.price), qty: line.qty })),
    [cart]
  );

  const cartTotal = useMemo(() => Object.values(cart).reduce((t, line) => t + line.price * line.qty, 0), [cart]);

  const cartCount = cartItems.reduce((t, c) => t + c.qty, 0);

  const waLink = useMemo(() => {
    const orderText =
      "Hi BEAPS Mobile Fix, I would like to order:\n" +
      cartItems.map((c) => `• ${c.qty} × ${c.name}`).join("\n") +
      `\nTotal: KSh ${money(cartTotal)}`;
    return whatsappLink(orderText);
  }, [cartItems, cartTotal, whatsappLink]);

  const value: CartContextValue = {
    cartItems,
    cartTotal,
    cartTotalFmt: money(cartTotal),
    cartCount,
    hasCart: cartItems.length > 0,
    cartEmpty: cartItems.length === 0,
    cartOpen,
    toggleCart,
    addTo,
    bump,
    waLink,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
