"use client";

import { useStore, type Role } from "@/store/useStore";
import { BellIcon, SearchIcon, MoonIcon, SunIcon } from "lucide-react";
import { AddTransactionModal } from "@/components/dashboard/AddTransactionModal";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function Header() {
  const { role, setRole } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/80 px-6 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80 w-full">
        <div className="flex flex-1 items-center gap-4 md:ml-64">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white sm:hidden">
            FinDash
          </h1>
          <div className="hidden sm:flex flex-1 items-center max-w-md relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:inline-block">View as:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300 cursor-pointer font-medium"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors hidden sm:block"
            >
              Add Transaction
            </button>
          )}

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              title="Toggle Theme"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          )}

          <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-950" />
          </button>
        </div>
      </header>
      
      {role === "admin" && (
        <div className="sm:hidden fixed bottom-6 right-6 z-20">
           <button
             onClick={() => setIsModalOpen(true)}
             className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
           >
             <span className="text-2xl leading-none mb-1">+</span>
           </button>
        </div>
      )}

      {isModalOpen && (
        <AddTransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
