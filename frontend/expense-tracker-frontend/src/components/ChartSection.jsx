import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartSection = ({ transactions }) => {
  // Fake monthly grouping (simple version)
  const data = transactions.slice(0, 6).map((t, i) => ({
    name: `T${i + 1}`,
    amount: t.amount,
  }));

  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl mb-8 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Analytics</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;


/*import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const ChartSection = ({ transactions }) => {
  const income = transactions
    ?.filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0) || 0;

  const expense = transactions
    ?.filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0) || 0;

  const total = income + expense;

  const expensePercent = total ? (expense / total) * 100 : 50;

  const data = [
    {
      name: "Expense",
      value: expensePercent,
      fill: "#ef4444",
    },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl mb-6 text-center">
      <h2 className="mb-4 text-lg font-semibold">
        Spending Overview
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>

      <p className="text-gray-400 mt-2">
        {Math.round(expensePercent)}% Expenses
      </p>
    </div>
  );
};

export default ChartSection;*/