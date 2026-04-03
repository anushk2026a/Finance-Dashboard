import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { format } from "date-fns";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: TransactionType;
  date: string;
  description: string;
}

export type Role = "viewer" | "admin";

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  filters: {
    search: string;
    category: string;
    type: string;
  };
  setFilter: (key: keyof AppState["filters"], value: string) => void;
}

const mockTransactions: Transaction[] = [
  { id: "1", amount: 4500, category: "Salary", type: "income", date: "2026-03-01", description: "Monthly Salary" },
  { id: "2", amount: 1200, category: "Rent", type: "expense", date: "2026-03-02", description: "Apartment Rent" },
  { id: "3", amount: 150, category: "Groceries", type: "expense", date: "2026-03-05", description: "Whole Foods" },
  { id: "4", amount: 60, category: "Utilities", type: "expense", date: "2026-03-07", description: "Internet Bill" },
  { id: "5", amount: 200, category: "Entertainment", type: "expense", date: "2026-03-10", description: "Concert Tickets" },
  { id: "6", amount: 800, category: "Freelance", type: "income", date: "2026-03-15", description: "Web Design Project" },
  { id: "7", amount: 350, category: "Dining", type: "expense", date: "2026-03-18", description: "Dinner with friends" },
  { id: "8", amount: 90, category: "Transportation", type: "expense", date: "2026-03-20", description: "Gas Station" },
  { id: "9", amount: 300, category: "Shopping", type: "expense", date: "2026-03-25", description: "New Clothes" },
  { id: "10", amount: 50, category: "Subscriptions", type: "expense", date: "2026-03-28", description: "Software Services" },
  { id: "11", amount: 120, category: "Groceries", type: "expense", date: "2026-04-01", description: "Local Market" },
  { id: "12", amount: 500, category: "Investments", type: "income", date: "2026-04-02", description: "Dividend Payment" },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: "viewer",
      setRole: (role) => set({ role }),
      transactions: mockTransactions,
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [{ id: Date.now().toString(), ...tx }, ...state.transactions],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
      filters: {
        search: "",
        category: "All",
        type: "All",
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
    }),
    {
      name: "finance-dashboard-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
