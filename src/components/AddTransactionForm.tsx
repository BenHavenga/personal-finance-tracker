"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Transaction } from "@/types/finance";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onAdd: (tx: Transaction) => void;
}

export default function AddTransactionForm({ onAdd }: Props) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.category) return;
    const tx: Transaction = {
      id: uuidv4(),
      ...form,
      amount: parseFloat(form.amount),
    } as Transaction;
    onAdd(tx);
    setForm({ ...form, amount: "", category: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-white dark:bg-neutral-900"
    >
      <div className="flex gap-2">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-1/2"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <Input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
      </div>
      <Input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />
      <Input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
}
