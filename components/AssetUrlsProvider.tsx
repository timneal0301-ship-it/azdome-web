"use client";

import { createContext, useContext } from "react";

type Map = Record<string, string>;
const AssetUrlsContext = createContext<Map>({});

export function AssetUrlsProvider({
  map,
  children,
}: {
  map: Map;
  children: React.ReactNode;
}) {
  return (
    <AssetUrlsContext.Provider value={map}>
      {children}
    </AssetUrlsContext.Provider>
  );
}

/**
 * Returns the live URL for a static asset path. If admin uploaded a
 * replacement, returns that URL; otherwise returns the original path.
 *
 * @example
 *   const src = useAssetUrl("/images/product/m550-front.jpg");
 *   <Image src={src} ... />
 */
export function useAssetUrl(staticPath: string): string {
  const map = useContext(AssetUrlsContext);
  return map[staticPath] ?? staticPath;
}
