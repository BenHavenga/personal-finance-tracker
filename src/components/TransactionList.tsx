import { Transaction } from "@/types/finance";
import { Button } from "@/components/ui/button";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="flex justify-between items-center bg-white dark:bg-neutral-900 border p-2 rounded"
          >
            <div>
              <div className="font-medium">
                {tx.category} — ${tx.amount.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">
                {tx.date} — {tx.type}
              </div>
              {tx.description && (
                <div className="text-sm italic">{tx.description}</div>
              )}
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(tx.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
