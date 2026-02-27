"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  isMutating: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, isMutating, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commitEdit() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(todo.title);
    } else if (trimmed !== todo.title) {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setDraft(todo.title);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all">
      {/* Checkbox toggle — min 44px touch target via padding */}
      <button
        aria-label={todo.completed ? "Mark as active" : "Mark as complete"}
        onClick={() => onToggle(todo.id, !todo.completed)}
        disabled={isMutating}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] -mx-2 ${
          todo.completed
            ? "bg-indigo-500 border-indigo-500"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        {todo.completed && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Title / edit input */}
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo title"
          className="flex-1 px-2 py-0.5 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 text-base min-h-[36px]"
        />
      ) : (
        <span
          onDoubleClick={() => { if (!isMutating) { setDraft(todo.title); setEditing(true); } }}
          title="Double-click to edit"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isMutating) { setDraft(todo.title); setEditing(true); }
          }}
          aria-label={`Edit "${todo.title}"`}
          className={`flex-1 text-base cursor-default select-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Delete button — visible on hover/focus, disabled during mutation */}
      <button
        aria-label={`Delete "${todo.title}"`}
        onClick={() => onDelete(todo.id)}
        disabled={isMutating}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}
