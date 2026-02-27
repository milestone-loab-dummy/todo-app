"use client";

import { FilterStatus } from "@/types/todo";

interface Props {
  filter: FilterStatus;
  activeCount: number;
  completedCount: number;
  totalCount: number;
  isMutating: boolean;
  onFilterChange: (f: FilterStatus) => void;
  onMarkAllComplete: () => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({
  filter,
  activeCount,
  completedCount,
  totalCount,
  isMutating,
  onFilterChange,
  onMarkAllComplete,
  onClearCompleted,
}: Props) {
  return (
    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
      {/* Row 1: items-left · filter buttons */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="min-w-[80px]">
          {activeCount} item{activeCount !== 1 ? "s" : ""} left
        </span>
        <div className="flex gap-1" role="group" aria-label="Filter todos">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              aria-pressed={filter === f.value}
              className={`px-3 py-1 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 min-h-[36px] ${
                filter === f.value
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: bulk actions — only shown when relevant */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <button
            onClick={onMarkAllComplete}
            disabled={isMutating}
            aria-label={activeCount === 0 ? "Mark all active" : "Mark all complete"}
            className="px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px]"
          >
            {activeCount === 0 ? "↩ Mark all active" : "✓ Mark all complete"}
          </button>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              disabled={isMutating}
              aria-label="Clear completed todos"
              className="px-3 py-1 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px]"
            >
              Clear completed ({completedCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
