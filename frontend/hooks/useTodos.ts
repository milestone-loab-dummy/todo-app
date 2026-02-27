"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FilterStatus, Todo } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (title: string) => {
    const optimistic: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [optimistic, ...prev]);
    try {
      const created = await api.createTodo(title);
      setTodos((prev) => prev.map((t) => (t.id === optimistic.id ? created : t)));
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t.id !== optimistic.id));
      setError(err instanceof Error ? err.message : "Failed to create todo");
    }
  }, []);

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    try {
      const updated = await api.updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  }, []);

  const editTodo = useCallback(async (id: number, title: string) => {
    const prev_title = todos.find((t) => t.id === id)?.title ?? "";
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
    try {
      const updated = await api.updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: prev_title } : t))
      );
      setError(err instanceof Error ? err.message : "Failed to update todo");
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: number) => {
    const snapshot = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.deleteTodo(id);
    } catch (err) {
      if (snapshot) setTodos((prev) => [...prev, snapshot]);
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  }, [todos]);

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return {
    todos: filteredTodos,
    loading,
    error,
    filter,
    setFilter,
    activeCount,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearError: () => setError(null),
  };
}
