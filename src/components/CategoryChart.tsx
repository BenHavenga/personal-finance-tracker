"use client";
import { Transaction } from "@/types/finance";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const categories = [...new Set(expenses.map((t) => t.category))];
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          expenses
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: [
          "#f87171",
          "#facc15",
          "#34d399",
          "#60a5fa",
          "#a78bfa",
          "#f472b6",
          "#fb923c",
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-900 border rounded">
      <h3 className="font-semibold mb-4">Expenses by Category</h3>
      <Pie data={data} />
    </div>
  );
}
