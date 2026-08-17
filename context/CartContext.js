import { createContext, useContext, useMemo, useState } from "react";
import { PRODUCTS, money, whatsappLink } from "../lib/data";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const addTo = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setCartOpen(true);
  };

  const bump = (id, d) => {
    setCart((c) => {
      const next = { ...c };
      const q = (next[id] || 0) + d;
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  };

  const toggleCart = () => setCartOpen((v) => !v);

  const cartItems = useMemo(
    () =>
      Object.keys(cart).map((id) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return { id, name: p.name, priceFmt: money(p.price), qty: cart[id] };
      }),
    [cart]
  );

  const cartTotal = useMemo(
    () => Object.keys(cart).reduce((t, id) => t + PRODUCTS.find((x) => x.id === id).price * cart[id], 0),
    [cart]
  );

  const cartCount = cartItems.reduce((t, c) => t + c.qty, 0);

  const waLink = useMemo(() => {
    const orderText =
      "Hi BEAPS Mobile Fix, I would like to order:\n" +
      cartItems.map((c) => `• ${c.qty} × ${c.name}`).join("\n") +
      `\nTotal: KSh ${money(cartTotal)}`;
    return whatsappLink(orderText);
  }, [cartItems, cartTotal]);

  const value = {
    cart,
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

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
