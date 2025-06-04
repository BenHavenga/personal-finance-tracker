import { useState } from "react";
import { Transaction } from "@/types/finance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (updatedTx: Transaction) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: Props) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});

  const startEdit = (tx: Transaction) => {
    setEditId(tx.id);
    setEditForm({ ...tx });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (!editForm || !editId) return;
    const updated: Transaction = {
      ...transactions.find((t) => t.id === editId)!,
      ...editForm,
      amount: parseFloat(editForm.amount?.toString() || "0"),
    };
    onEdit(updated);
    cancelEdit();
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white dark:bg-neutral-900 border p-4 rounded"
          >
            {editId === tx.id ? (
              <div className="w-full space-y-2">
                <div className="flex gap-2">
                  <Input
                    name="category"
                    value={editForm.category || ""}
                    onChange={handleChange}
                    placeholder="Category"
                  />
                  <Input
                    name="amount"
                    type="number"
                    value={editForm.amount?.toString() || ""}
                    onChange={handleChange}
                    placeholder="Amount"
                  />
                </div>
                <Input
                  name="description"
                  value={editForm.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <Input
                  name="date"
                  type="date"
                  value={editForm.date || ""}
                  onChange={handleChange}
                />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={saveEdit}>
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2 sm:mb-0">
                  <div className="font-medium">
                    {tx.category} — ${tx.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {tx.date} — {tx.type}
                  </div>
                  {tx.description && (
                    <div className="text-sm italic">{tx.description}</div>
                  )}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(tx)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(tx.id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
