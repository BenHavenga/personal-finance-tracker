import { Transaction } from "@/types/finance";

const STORAGE_KEY = "finance-transactions";

export function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveTransactions(data: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
