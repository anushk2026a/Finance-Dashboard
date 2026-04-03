"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";

export function SummaryCards() {
  const transactions = useStore((state) => state.transactions);

  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((tx) => {
      if (tx.type === "income") income += tx.amount;
      else expense += tx.amount;
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: DollarSignIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Income",
      value: income,
      icon: ArrowUpIcon,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Expenses",
      value: expense,
      icon: ArrowDownIcon,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
