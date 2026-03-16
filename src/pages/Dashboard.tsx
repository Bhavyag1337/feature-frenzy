import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4200, profit: 1800 },
  { month: "Feb", sales: 3800, profit: 1600 },
  { month: "Mar", sales: 5100, profit: 2200 },
  { month: "Apr", sales: 4700, profit: 2000 },
  { month: "May", sales: 5800, profit: 2600 },
  { month: "Jun", sales: 6200, profit: 2900 },
  { month: "Jul", sales: 5900, profit: 2700 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Groceries", value: 20 },
  { name: "Home", value: 12 },
  { name: "Other", value: 8 },
];

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(0, 84%, 60%)",
];

const recentOrders = [
  { id: "ORD-4291", customer: "Priya Sharma", amount: "₹2,450", status: "Delivered", time: "2h ago" },
  { id: "ORD-4290", customer: "Rahul Verma", amount: "₹1,890", status: "Processing", time: "3h ago" },
  { id: "ORD-4289", customer: "Anita Desai", amount: "₹3,200", status: "Shipped", time: "5h ago" },
  { id: "ORD-4288", customer: "Vikram Singh", amount: "₹890", status: "Delivered", time: "6h ago" },
  { id: "ORD-4287", customer: "Meera Patel", amount: "₹4,100", status: "Processing", time: "7h ago" },
];

const topProducts = [
  { name: "Wireless Earbuds Pro", sales: 342, revenue: "₹5,13,000", trend: "up" },
  { name: "Cotton T-Shirt Pack", sales: 289, revenue: "₹2,89,000", trend: "up" },
  { name: "Organic Green Tea", sales: 256, revenue: "₹1,28,000", trend: "down" },
  { name: "Smart LED Bulb", sales: 198, revenue: "₹1,58,400", trend: "up" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your retail performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="₹12.4L" change="+12.5% from last month" changeType="positive" icon={DollarSign} index={0} />
        <StatCard label="Orders" value="1,284" change="+8.2% from last month" changeType="positive" icon={ShoppingCart} index={1} />
        <StatCard label="Customers" value="3,462" change="+23.1% new customers" changeType="positive" icon={Users} index={2} />
        <StatCard label="Inventory Items" value="892" change="14 low stock alerts" changeType="negative" icon={Package} index={3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Sales & Profit Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 months performance</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Sales</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Profit</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="hsl(221, 83%, 53%)" fill="url(#salesGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="profit" stroke="hsl(142, 71%, 45%)" fill="url(#profitGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-1">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mb-4">Product distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  {cat.name}
                </span>
                <span className="font-mono font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest transactions</p>
            </div>
            <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              View All <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="table-header">Order</th>
                  <th className="table-header">Customer</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="table-row">
                    <td className="table-cell font-mono text-xs">{order.id}</td>
                    <td className="table-cell">{order.customer}</td>
                    <td className="table-cell font-mono font-medium">{order.amount}</td>
                    <td className="table-cell">
                      <span className={
                        order.status === "Delivered" ? "badge-success" :
                        order.status === "Shipped" ? "badge-primary" : "badge-warning"
                      }>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card overflow-hidden"
        >
          <div className="px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Best performing items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="table-header">Product</th>
                  <th className="table-header">Sales</th>
                  <th className="table-header">Revenue</th>
                  <th className="table-header">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="table-row">
                    <td className="table-cell font-medium">{p.name}</td>
                    <td className="table-cell font-mono">{p.sales}</td>
                    <td className="table-cell font-mono font-medium">{p.revenue}</td>
                    <td className="table-cell">
                      {p.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
