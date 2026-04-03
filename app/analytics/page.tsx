import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DynamicCharts } from "@/components/dashboard/DynamicCharts";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:ml-64 w-full">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Deep dive into your financial trends and data patterns.
            </p>
          </div>
          
          <DynamicCharts />
          
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Detailed Breakdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your comprehensive financial analytics report features will populate here based on advanced filtering modules (e.g., Year-over-Year comparison, Custom Date Ranges).
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
