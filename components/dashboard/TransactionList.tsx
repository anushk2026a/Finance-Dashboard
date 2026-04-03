"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, TrashIcon, DownloadIcon } from "lucide-react";

type Transaction = ReturnType<typeof useStore.getState>["transactions"][number];

const columnHelper = createColumnHelper<Transaction>();

export function TransactionList() {
  const { transactions, role, deleteTransaction } = useStore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const columns = useMemo(
    () => {
      const baseCols: any[] = [
        columnHelper.accessor("date", {
          header: "Date",
          cell: (info) => <div className="text-gray-600 dark:text-gray-400">{format(parseISO(info.getValue()), "MMM dd, yyyy")}</div>,
        }),
        columnHelper.accessor("description", {
          header: "Description",
          cell: (info) => <div className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</div>,
        }),
        columnHelper.accessor("category", {
          header: "Category",
          cell: (info) => (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-300">
              {info.getValue()}
            </span>
          ),
        }),
        columnHelper.accessor("amount", {
          header: "Amount",
          cell: (info) => {
            const isIncome = info.row.original.type === "income";
            return (
              <div className={`font-semibold flex items-center ${isIncome ? "text-green-500" : "text-gray-900 dark:text-gray-100"}`}>
                {isIncome ? "+" : "-"}${info.getValue().toFixed(2)}
              </div>
            );
          },
        }),
        columnHelper.accessor("type", {
          header: "Type",
          cell: (info) => {
            const isIncome = info.getValue() === "income";
            return (
              <div className={`flex items-center gap-1 text-sm ${isIncome ? "text-green-500" : "text-red-500"}`}>
                {isIncome ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                {isIncome ? "Income" : "Expense"}
              </div>
            );
          },
        }),
      ];

      if (role === "admin") {
        baseCols.push(
          columnHelper.display({
            id: "actions",
            cell: (info) => (
              <button
                onClick={() => deleteTransaction(info.row.original.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                title="Delete Transaction"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            ),
          })
        );
      }

      return baseCols;
    },
    [role, deleteTransaction]
  );

  const filteredData = useMemo(() => {
    if (typeFilter === "All") return transactions;
    return transactions.filter(tx => tx.type === typeFilter);
  }, [transactions, typeFilter]);

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const rows = filteredData.map(tx => [
      tx.date,
      `"${tx.description.replace(/"/g, '""')}"`,
      `"${tx.category}"`,
      tx.amount.toString(),
      tx.type
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
            title="Export to CSV"
          >
            <DownloadIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div
                      className={header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200" : ""}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ArrowUpIcon className="w-3 h-3 ml-1" />,
                        desc: <ArrowDownIcon className="w-3 h-3 ml-1" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-end space-x-2 py-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
