import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const ChartSection = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-gray-800 p-6 rounded-xl mb-6">
      <h2 className="mb-4 text-lg font-semibold">Overview</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
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