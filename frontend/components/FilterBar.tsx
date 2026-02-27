"use client";

import { FilterStatus } from "@/types/todo";

interface Props {
  filter: FilterStatus;
  activeCount: number;
  onFilterChange: (f: FilterStatus) => void;
}

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({ filter, activeCount, onFilterChange }: Props) {
  return (
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
      <span>{activeCount} item{activeCount !== 1 ? "s" : ""} left</span>
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 ${
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
  );
}
