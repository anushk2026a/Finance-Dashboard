"use client";

import { useStore } from "@/store/useStore";
import { LayoutDashboardIcon, SettingsIcon, PieChartIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const role = useStore((state) => state.role);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
    { name: "Analytics", href: "/analytics", icon: PieChartIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 sm:flex">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <WalletIcon className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-lg text-gray-900 dark:text-white">FinDash</span>
      </div>
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-50"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">User Profile</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Account</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
