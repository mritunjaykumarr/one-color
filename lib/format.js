export function inr(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
