import type { Todo } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }
  // 204 No Content — no body
  if (res.status === 204) {
    return undefined as unknown as T;
  }
  return res.json() as Promise<T>;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`);
  return handleResponse<Todo[]>(res);
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return handleResponse<Todo>(res);
}

export async function updateTodo(
  id: number,
  data: { title?: string; completed?: boolean }
): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Todo>(res);
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(res);
}
