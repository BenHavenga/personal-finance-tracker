import { Transaction } from "@/types/finance";

export default function SummaryCards({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-green-100 dark:bg-green-800 text-green-900 dark:text-white rounded">
        Income: ${income.toFixed(2)}
      </div>
      <div className="p-4 bg-red-100 dark:bg-red-800 text-red-900 dark:text-white rounded">
        Expenses: ${expense.toFixed(2)}
      </div>
      <div className="p-4 bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white rounded">
        Balance: ${balance.toFixed(2)}
      </div>
    </div>
  );
}
