"use client";

import AddTodoForm from "@/components/AddTodoForm";
import FilterBar from "@/components/FilterBar";
import Toast from "@/components/Toast";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const {
    todos,
    loading,
    error,
    filter,
    setFilter,
    activeCount,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearError,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-start justify-center px-4 py-16">
      <main className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">todos</h1>
          <p className="text-gray-400 text-sm mt-1">Double-click a todo to edit it</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6">
          <AddTodoForm onAdd={addTodo} />
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
          {!loading && (
            <FilterBar
              filter={filter}
              activeCount={activeCount}
              onFilterChange={setFilter}
            />
          )}
        </div>
      </main>

      {/* Error toast */}
      {error && <Toast message={error} onClose={clearError} />}
    </div>
  );
}
