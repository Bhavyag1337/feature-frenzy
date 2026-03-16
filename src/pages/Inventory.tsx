import { useState } from "react";
import { motion } from "framer-motion";
import { Package, AlertTriangle, TrendingUp, Search, Plus, ArrowUpDown } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const demandForecast = [
  { product: "Earbuds", current: 120, predicted: 180 },
  { product: "T-Shirts", current: 200, predicted: 160 },
  { product: "Green Tea", current: 80, predicted: 110 },
  { product: "LED Bulb", current: 150, predicted: 190 },
  { product: "Sneakers", current: 90, predicted: 140 },
];

const initialInventory = [
  { id: "SKU-001", name: "Wireless Earbuds Pro", category: "Electronics", stock: 42, reorder: 50, status: "Low Stock", demand: "High", price: "₹1,500" },
  { id: "SKU-002", name: "Cotton T-Shirt Pack", category: "Clothing", stock: 189, reorder: 100, status: "In Stock", demand: "Medium", price: "₹999" },
  { id: "SKU-003", name: "Organic Green Tea 100g", category: "Groceries", stock: 8, reorder: 30, status: "Critical", demand: "High", price: "₹499" },
  { id: "SKU-004", name: "Smart LED Bulb 12W", category: "Home", stock: 234, reorder: 80, status: "In Stock", demand: "Low", price: "₹800" },
  { id: "SKU-005", name: "Running Sneakers", category: "Clothing", stock: 56, reorder: 60, status: "Low Stock", demand: "High", price: "₹2,999" },
  { id: "SKU-006", name: "Stainless Steel Bottle", category: "Home", stock: 312, reorder: 50, status: "In Stock", demand: "Medium", price: "₹650" },
  { id: "SKU-007", name: "Bluetooth Speaker", category: "Electronics", stock: 3, reorder: 25, status: "Critical", demand: "High", price: "₹3,200" },
  { id: "SKU-008", name: "Basmati Rice 5kg", category: "Groceries", stock: 145, reorder: 100, status: "In Stock", demand: "Medium", price: "₹450" },
];

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = initialInventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const lowStock = initialInventory.filter(i => i.status === "Low Stock").length;
  const critical = initialInventory.filter(i => i.status === "Critical").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Smart Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered demand prediction & stock management</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value="892" change="12 added this week" changeType="positive" icon={Package} index={0} />
        <StatCard label="Low Stock" value={String(lowStock)} change="Needs attention" changeType="negative" icon={AlertTriangle} index={1} />
        <StatCard label="Critical Stock" value={String(critical)} change="Reorder immediately" changeType="negative" icon={AlertTriangle} index={2} />
        <StatCard label="Demand Accuracy" value="94.2%" change="+2.1% improved" changeType="positive" icon={TrendingUp} index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-1">Demand Forecast</h3>
        <p className="text-xs text-muted-foreground mb-4">Current stock vs predicted demand</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={demandForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="product" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Bar dataKey="current" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} name="Current" />
            <Bar dataKey="predicted" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Predicted" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card overflow-hidden">
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <h3 className="text-sm font-semibold text-foreground">Inventory Items</h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-36 placeholder:text-muted-foreground" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-muted text-sm rounded-lg px-3 py-1.5 outline-none text-foreground">
              <option>All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Critical</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="table-header">SKU</th>
                <th className="table-header">Product</th>
                <th className="table-header">Category</th>
                <th className="table-header">Stock</th>
                <th className="table-header">Price</th>
                <th className="table-header">Status</th>
                <th className="table-header">Demand</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="table-cell font-mono text-xs">{item.id}</td>
                  <td className="table-cell font-medium">{item.name}</td>
                  <td className="table-cell">{item.category}</td>
                  <td className="table-cell font-mono">{item.stock}</td>
                  <td className="table-cell font-mono">{item.price}</td>
                  <td className="table-cell">
                    <span className={
                      item.status === "In Stock" ? "badge-success" :
                      item.status === "Low Stock" ? "badge-warning" : "badge-destructive"
                    }>{item.status}</span>
                  </td>
                  <td className="table-cell">
                    <span className={
                      item.demand === "High" ? "badge-destructive" :
                      item.demand === "Medium" ? "badge-warning" : "badge-success"
                    }>{item.demand}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
