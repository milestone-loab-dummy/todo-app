"use client";

import { FormEvent, useRef, useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTodoForm({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 placeholder-gray-400 text-base"
        autoFocus
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-sm hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base"
      >
        Add
      </button>
    </form>
  );
}
