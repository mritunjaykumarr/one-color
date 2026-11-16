import { Suspense } from "react";
import ShopClient from "../../../components/shop/ShopClient";
import ShopSkeleton from "../../../components/shop/ShopSkeleton";

export const metadata = {
  title: "Shop all: hair colour shades, kits & aftercare",
  description:
    "Shop OneColor permanent hair colour in five shades, plus colour kits, duo packs, aftercare and tools. Filter by shade family, tone, grey coverage and price.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}
