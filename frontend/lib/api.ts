import { Todo } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed: ${res.status}`);
  }

  return data as T;
}

export const api = {
  getTodos(): Promise<Todo[]> {
    return request<Todo[]>("/api/v1/todos");
  },

  createTodo(title: string): Promise<Todo> {
    return request<Todo>("/api/v1/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  },

  updateTodo(id: number, patch: { title?: string; completed?: boolean }): Promise<Todo> {
    return request<Todo>(`/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(patch),
    });
  },

  deleteTodo(id: number): Promise<void> {
    return request<void>(`/api/v1/todos/${id}`, { method: "DELETE" });
  },
};
