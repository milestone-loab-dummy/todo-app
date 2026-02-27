"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { FilterStatus, Todo } from "@/types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [query, setQuery] = useState("");
  // US-11: track number of in-flight mutations so we can disable buttons
  const [pending, setPending] = useState(0);

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
    setPending((n) => n + 1);
    try {
      const created = await api.createTodo(title);
      setTodos((prev) => prev.map((t) => (t.id === optimistic.id ? created : t)));
    } catch (err) {
      setTodos((prev) => prev.filter((t) => t.id !== optimistic.id));
      setError(err instanceof Error ? err.message : "Failed to create todo");
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    setPending((n) => n + 1);
    try {
      const updated = await api.updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t))
      );
      setError(err instanceof Error ? err.message : "Failed to update todo");
    } finally {
      setPending((n) => n - 1);
    }
  }, []);

  const editTodo = useCallback(async (id: number, title: string) => {
    const prev_title = todos.find((t) => t.id === id)?.title ?? "";
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t))
    );
    setPending((n) => n + 1);
    try {
      const updated = await api.updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: prev_title } : t))
      );
      setError(err instanceof Error ? err.message : "Failed to update todo");
    } finally {
      setPending((n) => n - 1);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: number) => {
    const snapshot = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setPending((n) => n + 1);
    try {
      await api.deleteTodo(id);
    } catch (err) {
      if (snapshot) setTodos((prev) => [...prev, snapshot]);
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    } finally {
      setPending((n) => n - 1);
    }
  }, [todos]);

  // US-10: mark all todos complete (or toggle all back to active if all are done)
  const markAllComplete = useCallback(async () => {
    const allDone = todos.every((t) => t.completed);
    const target = !allDone;
    // optimistic
    setTodos((prev) => prev.map((t) => ({ ...t, completed: target })));
    setPending((n) => n + 1);
    try {
      await Promise.all(
        todos.map((t) => api.updateTodo(t.id, { completed: target }))
      );
      // re-fetch to get server-canonical state
      const fresh = await api.getTodos();
      setTodos(fresh);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todos");
      await fetchTodos();
    } finally {
      setPending((n) => n - 1);
    }
  }, [todos, fetchTodos]);

  // US-10: delete all completed todos
  const clearCompleted = useCallback(async () => {
    const completed = todos.filter((t) => t.completed);
    // optimistic
    setTodos((prev) => prev.filter((t) => !t.completed));
    setPending((n) => n + 1);
    try {
      await Promise.all(completed.map((t) => api.deleteTodo(t.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear completed");
      await fetchTodos();
    } finally {
      setPending((n) => n - 1);
    }
  }, [todos, fetchTodos]);

  // Apply filter then search
  const filteredTodos = todos
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
      query ? t.title.toLowerCase().includes(query.toLowerCase()) : true
    );

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const isMutating = pending > 0;

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    error,
    filter,
    setFilter,
    query,
    setQuery,
    activeCount,
    completedCount,
    isMutating,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    markAllComplete,
    clearCompleted,
    clearError: () => setError(null),
  };
}
