import { motion } from "framer-motion";
import { Heart, Gift, Users, TrendingUp, Star, Award } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const retentionData = [
  { month: "Jan", new: 120, returning: 280 },
  { month: "Feb", new: 98, returning: 310 },
  { month: "Mar", new: 145, returning: 340 },
  { month: "Apr", new: 132, returning: 365 },
  { month: "May", new: 178, returning: 398 },
  { month: "Jun", new: 156, returning: 420 },
];

const loyalCustomers = [
  { name: "Priya Sharma", visits: 48, totalSpend: "₹1,24,000", tier: "Platinum", lastVisit: "2 days ago", points: 4800 },
  { name: "Vikram Singh", visits: 36, totalSpend: "₹89,000", tier: "Gold", lastVisit: "1 week ago", points: 3200 },
  { name: "Meera Patel", visits: 32, totalSpend: "₹76,000", tier: "Gold", lastVisit: "3 days ago", points: 2900 },
  { name: "Amit Kumar", visits: 28, totalSpend: "₹62,000", tier: "Silver", lastVisit: "5 days ago", points: 2100 },
  { name: "Sneha Reddy", visits: 24, totalSpend: "₹54,000", tier: "Silver", lastVisit: "1 day ago", points: 1800 },
];

const activeOffers = [
  { title: "10% off Electronics", target: "Platinum members", redemptions: 89, expiry: "Mar 30" },
  { title: "Buy 2 Get 1 Free - Groceries", target: "All loyalty members", redemptions: 234, expiry: "Mar 25" },
  { title: "₹500 off on ₹3000+", target: "Gold & above", redemptions: 156, expiry: "Apr 5" },
  { title: "Free Delivery Weekend", target: "Silver & above", redemptions: 312, expiry: "Mar 22" },
];

export default function Loyalty() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Customer Loyalty Insights</h1>
        <p className="text-sm text-muted-foreground mt-1">Retention analytics & personalized offer management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Loyalty Members" value="2,841" change="+156 this month" changeType="positive" icon={Heart} index={0} />
        <StatCard label="Retention Rate" value="78%" change="+4.2% improved" changeType="positive" icon={Users} index={1} />
        <StatCard label="Points Redeemed" value="48.2K" change="₹4.8L value" changeType="positive" icon={Gift} index={2} />
        <StatCard label="Offer Redemption" value="34%" change="+8% this month" changeType="positive" icon={TrendingUp} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Customer Retention</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">New vs returning customers</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="returning" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} name="Returning" />
              <Bar dataKey="new" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="New" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Active Offers & Discounts</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-4">Personalized promotions</p>
          <div className="space-y-3">
            {activeOffers.map((offer) => (
              <div key={offer.title} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{offer.title}</p>
                  <p className="text-xs text-muted-foreground">{offer.target} · Expires {offer.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono font-medium text-foreground">{offer.redemptions}</p>
                  <p className="text-xs text-muted-foreground">redeemed</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card overflow-hidden">
        <div className="px-5 py-4">
          <h3 className="text-sm font-semibold text-foreground">Top Loyal Customers</h3>
          <p className="text-xs text-muted-foreground mt-0.5">High-value repeat customers</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="table-header">Customer</th>
                <th className="table-header">Visits</th>
                <th className="table-header">Total Spend</th>
                <th className="table-header">Tier</th>
                <th className="table-header">Points</th>
                <th className="table-header">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {loyalCustomers.map((c) => (
                <tr key={c.name} className="table-row">
                  <td className="table-cell font-medium flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    {c.name}
                  </td>
                  <td className="table-cell font-mono">{c.visits}</td>
                  <td className="table-cell font-mono font-medium">{c.totalSpend}</td>
                  <td className="table-cell">
                    <span className={
                      c.tier === "Platinum" ? "badge-primary" :
                      c.tier === "Gold" ? "badge-warning" : "badge-success"
                    }>
                      <Award className="w-3 h-3 mr-1" />{c.tier}
                    </span>
                  </td>
                  <td className="table-cell font-mono">{c.points.toLocaleString()}</td>
                  <td className="table-cell text-muted-foreground">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
