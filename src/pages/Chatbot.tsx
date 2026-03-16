import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Package, DollarSign, ShoppingBag } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

const quickActions = [
  { icon: Package, label: "Check stock", prompt: "What's the current stock for Wireless Earbuds Pro?" },
  { icon: DollarSign, label: "Price info", prompt: "What is the current price for Running Sneakers?" },
  { icon: ShoppingBag, label: "Top sellers", prompt: "What are the top selling products this month?" },
  { icon: Sparkles, label: "Recommendations", prompt: "Suggest products for a fitness enthusiast" },
];

const botResponses: Record<string, string> = {
  stock: "📦 **Wireless Earbuds Pro (SKU-001)**\n- Current Stock: 42 units\n- Status: ⚠️ Low Stock (Reorder point: 50)\n- Predicted Demand: 180 units next month\n- **Recommendation:** Place reorder for 150 units immediately.",
  price: "💰 **Running Sneakers (SKU-005)**\n- Base Price: ₹2,999\n- Current Price: ₹3,299 (+10%)\n- Reason: New arrival premium pricing\n- Competitor Avg: ₹3,150\n- **AI Suggestion:** Consider reducing to ₹3,149 to match competitor pricing.",
  top: "🏆 **Top Selling Products (This Month)**\n1. Wireless Earbuds Pro — 342 units (₹5,13,000)\n2. Cotton T-Shirt Pack — 289 units (₹2,89,000)\n3. Organic Green Tea — 256 units (₹1,28,000)\n4. Smart LED Bulb — 198 units (₹1,58,400)\n\n📈 Overall sales are up 12.5% vs last month.",
  recommend: "🎯 **Recommendations for Fitness Enthusiast Segment:**\n\n1. **Running Sneakers** — 95% match score\n2. **Sports Socks Pack** — 88% match\n3. **Gym Water Bottle** — 85% match\n4. **Fitness Tracker Band** — 82% match\n\n💡 Consider creating a \"Fitness Starter\" bundle at ₹4,499 (15% discount).",
  default: "I can help you with:\n- 📦 Stock levels & inventory alerts\n- 💰 Pricing information & optimization\n- 📊 Sales analytics & trends\n- 🎯 Product recommendations\n- 👥 Customer insights\n\nTry asking me something specific!",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("stock") || lower.includes("inventory") || lower.includes("earbuds")) return botResponses.stock;
  if (lower.includes("price") || lower.includes("sneaker") || lower.includes("cost")) return botResponses.price;
  if (lower.includes("top") || lower.includes("best") || lower.includes("selling")) return botResponses.top;
  if (lower.includes("recommend") || lower.includes("suggest") || lower.includes("fitness")) return botResponses.recommend;
  return botResponses.default;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", content: "👋 Hi! I'm **RetailIQ Assistant**. I can help you with inventory queries, pricing info, sales analytics, and product recommendations. How can I help you today?", timestamp: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text, timestamp: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = { id: Date.now() + 1, role: "bot", content: getBotResponse(text), timestamp: getTime() };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground">AI Chatbot Assistant</h1>
        <p className="text-sm text-muted-foreground mt-1">Instant answers about inventory, pricing, and analytics</p>
      </div>

      <div className="flex-1 flex flex-col glass-card overflow-hidden min-h-0" style={{ maxHeight: "calc(100vh - 220px)" }}>
        {/* Quick Actions */}
        <div className="px-4 py-3 border-b border-border/50 flex gap-2 overflow-x-auto flex-shrink-0">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => sendMessage(action.prompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {msg.timestamp}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3 text-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50 flex-shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about inventory, pricing, analytics..."
              className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
