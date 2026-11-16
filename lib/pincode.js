/*
  Delivery estimate by Indian PIN code (client-side, no network).
  Replace with the courier's serviceability API (e.g. Shiprocket) at Shopify launch.
*/
const METRO = ["11", "40", "56", "60", "70", "50", "41", "38", "12", "20"];
const REMOTE = ["18", "19", "78", "79", "74", "73"];

export function checkPincode(raw) {
  const pin = String(raw || "").replace(/\D/g, "");
  if (!/^[1-9][0-9]{5}$/.test(pin)) return { ok: false, error: "Enter a valid 6-digit PIN code." };
  const p2 = pin.slice(0, 2);
  const isMetro = METRO.includes(p2);
  const isRemote = REMOTE.includes(p2) || pin.startsWith("744");
  const [minD, maxD] = isMetro ? [2, 3] : isRemote ? [5, 8] : [3, 6];
  const fmt = (d) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + d);
    return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  };
  return {
    ok: true,
    pin,
    window: `${fmt(minD)} – ${fmt(maxD)}`,
    cod: !pin.startsWith("744"),
    express: isMetro,
  };
}
