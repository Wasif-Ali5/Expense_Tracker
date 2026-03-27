import {formatDate} from "../utils/formatDate.js";

const TransactionsList = ({ transactions }) => {
  const recent = transactions.slice(0, 10);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>

        {recent.length === 0 && (
          <p className="text-gray-400">No transactions yet</p>
        )}

      {recent.map((t) => (
        <div
          key={t._id}
          className="flex justify-between border-b border-gray-700 py-2"
        >
          <div>
            <p>{t.title}</p>
            <p className="text-sm text-gray-400">
              {formatDate(t.date)}
            </p>
          </div>

          <p
            className={
              t.type === "income"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            Rs {t.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;