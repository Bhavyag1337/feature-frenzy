import { motion } from "framer-motion";
import { ShoppingBag, Star, TrendingUp, Users, ThumbsUp } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

const recommendations = [
  {
    customer: "Priya Sharma",
    purchased: "Wireless Earbuds Pro",
    recommended: [
      { name: "Bluetooth Speaker", confidence: 92, reason: "Frequently bought together" },
      { name: "USB-C Cable Pack", confidence: 87, reason: "Complementary product" },
      { name: "Phone Case Premium", confidence: 78, reason: "Same category preference" },
    ],
  },
  {
    customer: "Rahul Verma",
    purchased: "Running Sneakers",
    recommended: [
      { name: "Sports Socks Pack", confidence: 95, reason: "Frequently bought together" },
      { name: "Gym Water Bottle", confidence: 88, reason: "Lifestyle match" },
      { name: "Fitness Tracker Band", confidence: 82, reason: "Same user segment" },
    ],
  },
  {
    customer: "Anita Desai",
    purchased: "Organic Green Tea",
    recommended: [
      { name: "Honey Organic 500g", confidence: 91, reason: "Frequently bought together" },
      { name: "Steel Tea Infuser", confidence: 86, reason: "Complementary product" },
      { name: "Herbal Face Wash", confidence: 72, reason: "Health-conscious segment" },
    ],
  },
];

const popularBundles = [
  { name: "Work From Home Kit", items: ["LED Bulb", "USB Hub", "Desk Organizer"], sales: 156, revenue: "₹3,12,000" },
  { name: "Fitness Starter", items: ["Sneakers", "Bottle", "Socks"], sales: 98, revenue: "₹4,89,000" },
  { name: "Tea Lover Set", items: ["Green Tea", "Honey", "Infuser"], sales: 134, revenue: "₹1,78,000" },
  { name: "Audio Bundle", items: ["Earbuds", "Speaker", "Cable"], sales: 87, revenue: "₹5,21,000" },
];

export default function Recommendations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">Personalized Recommendations</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered product suggestions using collaborative filtering</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Recommendation CTR" value="34.8%" change="+6.2% this month" changeType="positive" icon={ThumbsUp} index={0} />
        <StatCard label="Conversion from Rec" value="12.4%" change="+3.1% improved" changeType="positive" icon={ShoppingBag} index={1} />
        <StatCard label="Revenue from Rec" value="₹4.2L" change="18% of total revenue" changeType="positive" icon={TrendingUp} index={2} />
        <StatCard label="Active Profiles" value="3,462" change="Personalized feeds" changeType="positive" icon={Users} index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.customer}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {rec.customer.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{rec.customer}</h4>
                <p className="text-xs text-muted-foreground">Recently bought: {rec.purchased}</p>
              </div>
            </div>
            <div className="space-y-3">
              {rec.recommended.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${item.confidence}%` }} />
                    </div>
                    <span className="text-xs font-mono font-medium text-foreground">{item.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card overflow-hidden"
        >
          <div className="px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">Popular Bundles</h3>
            <p className="text-xs text-muted-foreground mt-0.5">AI-generated product bundles</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="table-header">Bundle</th>
                <th className="table-header">Items</th>
                <th className="table-header">Sales</th>
                <th className="table-header">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {popularBundles.map((b) => (
                <tr key={b.name} className="table-row">
                  <td className="table-cell font-medium">{b.name}</td>
                  <td className="table-cell text-xs text-muted-foreground">{b.items.join(", ")}</td>
                  <td className="table-cell font-mono">{b.sales}</td>
                  <td className="table-cell font-mono font-medium">{b.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
