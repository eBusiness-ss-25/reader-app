"use client";
import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Context value storing loading states for multiple components.
 */
type CatalogLoadingContextValue = {
  /**
   * Update the loading state of a given component.
   */
  setComponentLoading: (name: string, loading: boolean) => void;
  /**
   * True if any registered component is currently loading.
   */
  isLoading: boolean;
};

const CatalogLoadingContext = createContext<CatalogLoadingContextValue | undefined>(undefined);

/**
 * Provider keeping track of loading states inside the catalog page.
 */
export function CatalogLoadingProvider({ children }: { children: ReactNode }) {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const setComponentLoading = (name: string, loading: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [name]: loading }));
  };

  const isLoading = Object.values(loadingMap).some(Boolean);

  return (
    <CatalogLoadingContext.Provider value={{ setComponentLoading, isLoading }}>
      {children}
    </CatalogLoadingContext.Provider>
  );
}

/**
 * Access the catalog loading context.
 */
export function useCatalogLoading() {
  const ctx = useContext(CatalogLoadingContext);
  if (!ctx) {
    throw new Error("useCatalogLoading must be used within CatalogLoadingProvider");
  }
  return ctx;
}
