// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/finance";
import { getTransactions, saveTransactions } from "@/lib/localStore";
import AddTransactionForm from "@/components/AddTransactionForm";
import TransactionList from "@/components/TransactionList";
import SummaryCards from "@/components/SummaryCards";
import CategoryChart from "@/components/CategoryChart";
import { Sun, Moon, Download } from "lucide-react";

function exportToCSV(data: Transaction[]) {
  const headers = ["ID", "Type", "Amount", "Category", "Description", "Date"];
  const rows = data.map((t) => [
    t.id,
    t.type,
    t.amount,
    t.category,
    t.description,
    t.date,
  ]);
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [monthlyBudget, setMonthlyBudget] = useState<number>(2000);

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const handleAdd = (tx: Transaction) => {
    const updated = [...transactions, tx];
    setTransactions(updated);
    saveTransactions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
  };

  const handleEdit = (updatedTx: Transaction) => {
    const updated = transactions.map((t) =>
      t.id === updatedTx.id ? updatedTx : t
    );
    setTransactions(updated);
    saveTransactions(updated);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))];
  const filteredTransactions =
    selectedMonth === "all"
      ? transactions
      : transactions.filter((t) => t.date.startsWith(selectedMonth));

  const expenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const overBudget = expenses > monthlyBudget;
  const netWorth =
    transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0) -
    transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-white to-slate-100 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
              Finance Panel
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md border dark:border-neutral-700 bg-white dark:bg-neutral-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-neutral-800 border dark:border-neutral-700"
            >
              <option value="all">All</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Budget ($)</label>
            <input
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-md bg-white dark:bg-neutral-800 border dark:border-neutral-700"
            />
            {overBudget && <p className="text-xs text-red-500">Over budget</p>}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Net Worth:</span> $
            {netWorth.toFixed(2)}
          </div>

          <button
            onClick={() => exportToCSV(filteredTransactions)}
            className="mt-4 px-4 py-2 text-sm rounded-md border bg-white dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            <Download size={16} className="inline mr-1" /> Export CSV
          </button>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-10">
          <section>
            <SummaryCards transactions={filteredTransactions} />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
              <AddTransactionForm onAdd={handleAdd} />
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
              <CategoryChart transactions={filteredTransactions} />
            </div>
          </section>

          <section className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
            <TransactionList
              transactions={filteredTransactions}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
