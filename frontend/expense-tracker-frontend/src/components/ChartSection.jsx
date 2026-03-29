import { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";

const ChartSection = ({ transactions = [], byCategory = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // 1. Get unique categories for the dropdown
  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((t) => t.category))];
    return ["All Categories", ...unique];
  }, [transactions]);

  // 2. Filter data for the Area Chart based on selection
  const lineData = useMemo(() => {
    const filtered = selectedCategory === "All Categories" 
      ? transactions 
      : transactions.filter(t => t.category === selectedCategory);

    return [...filtered]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7) // Show last 7 entries for the selection
      .map((t) => ({
        name: new Date(t.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        amount: t.amount,
      }));
  }, [selectedCategory, transactions]);

  // 3. Pie Chart Data (We keep this global or filter it too)
  const pieData = Object.keys(byCategory).map(key => ({
    name: key,
    value: byCategory[key]
  }));

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Cash Flow Area Chart */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl border border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold">Cash Flow Timeline</h2>
            <p className="text-gray-400 text-xs">Viewing: {selectedCategory}</p>
          </div>
          
          {/* THE FILTER DROPDOWN */}
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-all cursor-pointer hover:bg-gray-800"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
              itemStyle={{ color: '#8b5cf6' }}
            />
            <Area type="monotone" dataKey="amount" stroke="#8b5cf6" fill="url(#colorAmt)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution (Pie Chart) */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl border border-gray-700/50">
        <h2 className="text-xl font-bold mb-2">Spending by Category</h2>
        <p className="text-gray-400 text-sm mb-4">Where your money goes</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;