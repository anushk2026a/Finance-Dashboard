import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { DynamicCharts } from "@/components/dashboard/DynamicCharts";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Insights } from "@/components/dashboard/Insights";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:ml-64 w-full">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's an overview of your finances.
            </p>
          </div>
          
          <SummaryCards />
          <DynamicCharts />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionList />
            </div>
            <div className="lg:col-span-1">
              <Insights />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
