import React, { useState } from "react";
import { initialOrders, visibleOrders } from "./data.js";

const statuses = ["All", "Pending", "Processing", "Fulfilled"];
const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export function App() {
  const view = new URLSearchParams(window.location.search).get("view") === "before" ? "before" : "after";
  const capture = new URLSearchParams(window.location.search).has("capture");
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const shown = visibleOrders(orders, query, status);
  const pending = orders.filter((order) => order.status === "Pending").length;
  const fulfilled = orders.filter((order) => order.status === "Fulfilled").length;
  const revenue = orders.reduce((total, order) => total + order.amount, 0);

  function fulfill(id) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: "Fulfilled" } : order));
  }

  const controls = (
    <div className="controls">
      <label className="search-label">
        <span className="visually-hidden">Search orders</span>
        <span aria-hidden="true" className="search-icon">⌕</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search orders" />
      </label>
      <label className="filter-label">
        <span className="visually-hidden">Filter by status</span>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {statuses.map((item) => <option key={item} value={item}>{item === "All" ? "All statuses" : item}</option>)}
        </select>
      </label>
    </div>
  );

  const rows = shown.length ? shown.map((order) => (
    <tr key={order.id}>
      <td className="order-id">{order.id}</td>
      <td><span className="customer-name">{order.customer}</span><span className="mobile-item">{order.item}</span></td>
      <td className="item-cell">{order.item}</td>
      <td className="date-cell">{order.date}</td>
      <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
      <td className="amount-cell">{money(order.amount)}</td>
      <td className="action-cell">{order.status !== "Fulfilled" ? <button type="button" onClick={() => fulfill(order.id)} aria-label={`Mark ${order.id} fulfilled`}>Mark fulfilled</button> : <span className="done">Done</span>}</td>
    </tr>
  )) : <tr><td colSpan="7" className="empty-state">No orders match your search. Try another term or status.</td></tr>;

  if (view === "before") {
    return <div className="before-page">
      {!capture && <div className="demo-switch"><a href="?view=after">View migrated design →</a><span>Invented sample data</span></div>}
      <header><strong>Northstar</strong><nav aria-label="Main navigation"><a href="?view=before" aria-current="page">Orders</a></nav></header>
      <main>
        <h1>Orders</h1><p>Manage and fulfill customer orders.</p>
        <div className="before-stats"><div><span>Total orders</span><strong>{orders.length}</strong></div><div><span>Pending</span><strong>{pending}</strong></div><div><span>Fulfilled</span><strong>{fulfilled}</strong></div><div><span>Order value</span><strong>{money(revenue)}</strong></div></div>
        <section className="before-table"><h2>All orders</h2>{controls}<table><thead><tr><th>Order</th><th>Customer</th><th>Item</th><th>Date</th><th>Status</th><th>Amount</th><th>Action</th></tr></thead><tbody>{rows}</tbody></table></section>
      </main>
    </div>;
  }

  return <div className="after-page">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">N<span>✦</span></span><span>northstar<small>COMMERCE STUDIO</small></span></div>
      <div className="sidebar-group"><span className="sidebar-caption">WORKSPACE</span><a className="nav-item active" href="?view=after" aria-current="page"><span aria-hidden="true">▦</span> Orders <span className="nav-count">{orders.length}</span></a></div>
      <div className="sidebar-bottom"><div className="sidebar-avatar">NS</div><div>Northstar Studio<small>Demo workspace</small></div></div>
    </aside>
    <div className="workspace">
      {!capture && <div className="demo-switch"><a href="?view=before">← View original UI</a><span>Invented sample data</span></div>}
      <main>
        <div className="breadcrumb">WORKSPACE <span>/</span> ORDERS</div>
        <div className="page-heading"><div><div className="eyebrow"><span className="green-dot" /> LIVE OVERVIEW</div><h1>Good morning,<br /><em>here’s the picture.</em></h1><p>Every order, one clear place to keep things moving.</p></div><div className="date-card"><span>WEDNESDAY</span><strong>21</strong><small>OCTOBER 2026</small></div></div>
        <div className="section-title"><h2>At a glance</h2><span>YOUR STORE TODAY</span></div>
        <div className="stat-grid"><article className="stat-card stat-dark"><span>01 / ALL ORDERS</span><strong>{orders.length.toString().padStart(2, "0")}</strong><small>Across your workspace</small><b aria-hidden="true">↗</b></article><article className="stat-card"><span>02 / NEEDS ATTENTION</span><strong>{pending.toString().padStart(2, "0")}</strong><small>Pending fulfillment</small><b aria-hidden="true">↗</b></article><article className="stat-card"><span>03 / COMPLETED</span><strong>{fulfilled.toString().padStart(2, "0")}</strong><small>Successfully fulfilled</small><b aria-hidden="true">↗</b></article><article className="stat-card stat-orange"><span>04 / ORDER VALUE</span><strong>{money(revenue)}</strong><small>For the sample orders</small><b aria-hidden="true">↗</b></article></div>
        <section className="orders-panel"><div className="orders-heading"><div><span className="eyebrow">THE DETAILS</span><h2>Recent orders <span>({shown.length})</span></h2></div>{controls}</div><div className="table-scroll"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEM</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th><th>ACTION</th></tr></thead><tbody>{rows}</tbody></table></div><div className="table-footer">Showing {shown.length} of {orders.length} sample orders <span>Use search and status to narrow the list</span></div></section>
      </main>
    </div>
  </div>;
}
