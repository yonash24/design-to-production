// Invented, local demonstration data. No production service or account is involved.
export const initialOrders = [
  { id: "NS-1048", customer: "Maya Chen", item: "Studio lamp", amount: 128, status: "Pending", date: "Oct 21, 2026" },
  { id: "NS-1047", customer: "Daniel Rivera", item: "Arc side table", amount: 420, status: "Processing", date: "Oct 20, 2026" },
  { id: "NS-1046", customer: "Amina Yusuf", item: "Linen throw", amount: 84, status: "Fulfilled", date: "Oct 20, 2026" },
  { id: "NS-1045", customer: "Oliver Park", item: "Studio lamp", amount: 128, status: "Pending", date: "Oct 19, 2026" },
  { id: "NS-1044", customer: "Sofia Martin", item: "Pebble vase", amount: 56, status: "Fulfilled", date: "Oct 18, 2026" },
  { id: "NS-1043", customer: "Nora Patel", item: "Arc side table", amount: 420, status: "Processing", date: "Oct 17, 2026" }
];

export function visibleOrders(orders, query, status) {
  const needle = query.trim().toLowerCase();
  return orders.filter((order) => {
    const matchesStatus = status === "All" || order.status === status;
    const matchesQuery = !needle || [order.id, order.customer, order.item].some((value) => value.toLowerCase().includes(needle));
    return matchesStatus && matchesQuery;
  });
}
