/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { showToast } from "../components/Toast";

type CartItem = {
  title: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalItems: number;
  totalAmount: number;
  addToCart: (product: { title: string; price: number; qty?: number }) => void;
  removeFromCart: (title: string) => void;
  updateQty: (title: string, delta: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("delassaCart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("delassaCart", JSON.stringify(cart));
    } catch {
      // ignore localStorage failures
    }
  }, [cart]);

  useEffect(() => {
    const regularSubtotal = cart
      .filter((item) => !item.title.includes("🎁 [Amplop Merdeka]"))
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    const hasPrize = cart.some((item) => item.title.includes("🎁 [Amplop Merdeka]"));

    if (hasPrize) {
      let shouldReset = false;
      try {
        const saved = localStorage.getItem("delassa_merdeka_envelope");
        if (saved) {
          const state = JSON.parse(saved);
          const drawnSubtotal = state.drawnSubtotal || 50000;
          // If the customer downgrades below their drawn prize subtotal, cancel their draw
          if (regularSubtotal < drawnSubtotal) {
            shouldReset = true;
          }
        }
      } catch (e) {
        console.error("Failed to parse drawnSubtotal:", e);
      }

      if (shouldReset || regularSubtotal < 50000) {
        // Remove the prize from cart
        setCart((prev) => prev.filter((item) => !item.title.includes("🎁 [Amplop Merdeka]")));
        // Clear draw state entirely so they must re-draw at their new lower tier
        localStorage.removeItem("delassa_merdeka_envelope");
        // Dispatch storage event so frontend component updates state in real-time
        window.dispatchEvent(new Event("storage"));
        showToast("Hadiah Amplop Merdeka dibatalkan karena nominal belanja berkurang. Silakan undi kembali!", "info");
      }
    }
  }, [cart]);

  const addToCart = (product: { title: string; price: number; qty?: number }) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, qty: item.qty + (product.qty ?? 1) }
            : item
        );
      }
      return [...prev, { title: product.title, price: product.price, qty: product.qty ?? 1 }];
    });
  };

  const removeFromCart = (title: string) => {
    setCart((prev) => prev.filter((item) => item.title !== title));
  };

  const updateQty = (title: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.title === title ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const value = {
    cart,
    setCart,
    cartOpen,
    setCartOpen,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
