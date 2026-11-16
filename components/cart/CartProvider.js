"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { getProduct } from "../../data/products";

/*
  Local cart (Shopify Storefront cart replaces this at integration time — keep the
  same API: add / setQty / remove / items / subtotal / open).
  Only slugs + quantities are persisted; prices are always re-read from the catalogue,
  so a tampered localStorage value can never change what is charged.
*/
const CartContext = createContext(null);
const KEY = "oc_cart_v1";
const MAX_QTY = 10;

function reducer(state, action) {
  switch (action.type) {
    case "hydrate": {
      const out = action.items.slice();
      out.hydrated = true;
      return out;
    }
    case "add": {
      const existing = state.find((i) => i.key === action.item.key);
      if (existing) {
        return state.map((i) => (i.key === action.item.key ? { ...i, qty: Math.min(MAX_QTY, i.qty + action.item.qty) } : i));
      }
      return [...state, action.item];
    }
    case "qty":
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: Math.max(0, Math.min(MAX_QTY, action.qty)) } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

function sanitize(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((i) => i && typeof i.slug === "string" && getProduct(i.slug))
    .map((i) => ({
      key: String(i.key || i.slug).slice(0, 80),
      slug: i.slug,
      shade: typeof i.shade === "string" && getProduct(i.shade) ? i.shade : null,
      qty: Math.max(1, Math.min(MAX_QTY, parseInt(i.qty, 10) || 1)),
    }))
    .slice(0, 30);
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const hydrated = useRef(false);

  // read the saved cart once (external system → state)
  useEffect(() => {
    let saved = [];
    try {
      saved = sanitize(JSON.parse(window.localStorage.getItem(KEY) || "[]"));
    } catch {
      /* storage blocked — cart stays in memory */
    }
    dispatch({ type: "hydrate", items: saved });
  }, []);

  // persist after hydration (state → external system)
  useEffect(() => {
    if (items.hydrated) hydrated.current = true;
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((slug, { qty = 1, shade = null, openDrawer = true } = {}) => {
    if (!getProduct(slug)) return;
    dispatch({ type: "add", item: { key: shade ? `${slug}__${shade}` : slug, slug, shade, qty } });
    setBump((b) => b + 1);
    if (openDrawer) setOpen(true);
  }, []);

  const value = useMemo(() => {
    const lines = items
      .map((i) => {
        const product = getProduct(i.slug);
        const shade = i.shade ? getProduct(i.shade) : null;
        return product ? { ...i, product, shadeProduct: shade, lineTotal: product.price * i.qty, lineMrp: product.mrp * i.qty } : null;
      })
      .filter(Boolean);
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const mrpTotal = lines.reduce((s, l) => s + l.lineMrp, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return {
      lines,
      subtotal,
      mrpTotal,
      count,
      open,
      bump,
      setOpen,
      add,
      setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
      remove: (key) => dispatch({ type: "remove", key }),
    };
  }, [items, open, bump, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
