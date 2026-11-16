"use client";

import { createContext, useContext, useMemo, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [finderOpen, setFinderOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const value = useMemo(() => ({ finderOpen, setFinderOpen, searchOpen, setSearchOpen }), [finderOpen, searchOpen]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
