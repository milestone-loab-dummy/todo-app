"use client";

import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

function Skeleton() {
  return (
    <li className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 animate-pulse">
      <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 h-4 rounded bg-gray-200" />
    </li>
  );
}

export default function TodoList({ todos, loading, onToggle, onEdit, onDelete }: Props) {
  if (loading) {
    return (
      <ul className="space-y-2">
        {[1, 2, 3].map((i) => <Skeleton key={i} />)}
      </ul>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <svg className="mx-auto w-12 h-12 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
