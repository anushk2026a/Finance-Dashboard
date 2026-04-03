"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useMemo } from "react";

export function Insights() {
  const transactions = useStore((state) => state.transactions);

  const insights = useMemo(() => {
    const expenseMap = new Map<string, number>();
    let totalExpense = 0;
    
    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        expenseMap.set(tx.category, (expenseMap.get(tx.category) || 0) + tx.amount);
        totalExpense += tx.amount;
      }
    });

    let highestCategory = { name: "None", amount: 0 };
    expenseMap.forEach((amount, category) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name: category, amount };
      }
    });

    return [
      {
        title: "Top Spending Category",
        description: `You spent the most on ${highestCategory.name} ($${highestCategory.amount.toFixed(2)}).`,
        icon: TrendingDownIcon,
        color: "text-red-500",
        bg: "bg-red-500/10",
      },
      {
        title: "Savings Rate",
        description: "Your income exceeds your expenses. Good job keeping a positive cash flow!",
        icon: TrendingUpIcon,
        color: "text-green-500",
        bg: "bg-green-500/10",
      },
      {
        title: "Quick Tip",
        description: `Consider reducing expenses in ${highestCategory.name} to maximize your savings next month.`,
        icon: LightbulbIcon,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
      },
    ];
  }, [transactions]);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className={`p-2 rounded-full mt-0.5 shrink-0 ${insight.bg}`}>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{insight.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
