import { useState, useEffect, useCallback } from 'react';
import type { Todo, Filter } from './types';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';
import { TodoItem } from './TodoItem';
import type { ToastMessage } from './Toast';
import { Toast } from './Toast';
import './App.css';

let toastCounter = 0;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [newTitle, setNewTitle] = useState('');
  const [search, setSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<number>>(new Set());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function addToast(message: string) {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { id, message }]);
  }

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  function addPending(id: number) {
    setPendingIds((prev) => new Set(prev).add(id));
  }

  function removePending(id: number) {
    setPendingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  // Load todos on mount
  useEffect(() => {
    setLoading(true);
    fetchTodos()
      .then((data) => setTodos(data))
      .catch(() => addToast('Failed to load todos. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  // US-03: Create a todo
  async function handleCreate(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    setCreating(true);
    try {
      const todo = await createTodo(trimmed);
      setTodos((prev) => [...prev, todo]);
      setNewTitle('');
    } catch {
      addToast('Failed to create todo.');
    } finally {
      setCreating(false);
    }
  }

  // US-05: Toggle completion
  async function handleToggle(id: number, completed: boolean) {
    addPending(id);
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      addToast('Failed to update todo.');
    } finally {
      removePending(id);
    }
  }

  // US-06: Edit title
  async function handleEdit(id: number, title: string) {
    addPending(id);
    try {
      const updated = await updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      addToast('Failed to update todo.');
    } finally {
      removePending(id);
    }
  }

  // US-07: Delete
  async function handleDelete(id: number) {
    addPending(id);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      addToast('Failed to delete todo.');
    } finally {
      removePending(id);
    }
  }

  // US-08 + US-09: Filtered + searched list
  const filteredTodos = todos.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (search.trim()) {
      return t.title.toLowerCase().includes(search.trim().toLowerCase());
    }
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo App</h1>
      </header>

      <main className="app-main">
        {/* US-03: New todo input */}
        <div className="new-todo-wrapper">
          <input
            className="new-todo-input"
            type="text"
            placeholder="What needs to be done? Press Enter to add."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleCreate}
            disabled={creating}
            aria-label="New todo"
          />
        </div>

        {/* US-09: Search input */}
        <div className="search-wrapper">
          <input
            className="search-input"
            type="search"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search todos"
          />
        </div>

        {/* US-04: Todo list */}
        <section className="todo-list-section">
          {loading ? (
            // US-11: Skeleton loader
            <ul className="todo-list skeleton-list" aria-label="Loading todos">
              {[1, 2, 3].map((i) => (
                <li key={i} className="skeleton-item">
                  <div className="skeleton-checkbox" />
                  <div className="skeleton-text" />
                </li>
              ))}
            </ul>
          ) : filteredTodos.length === 0 ? (
            <p className="empty-state">
              {search.trim()
                ? `No results for "${search.trim()}".`
                : filter === 'all'
                ? 'No todos yet. Add one above!'
                : filter === 'active'
                ? 'No active todos.'
                : 'No completed todos.'}
            </p>
          ) : (
            <ul className="todo-list" aria-label="Todo list">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  pendingIds={pendingIds}
                />
              ))}
            </ul>
          )}
        </section>

        {/* US-08: Footer filters */}
        {!loading && (
          <footer className="app-footer">
            <span className="todo-count">
              {activeCount} item{activeCount !== 1 ? 's' : ''} left
            </span>
            <nav className="filter-nav" aria-label="Filter todos">
              {(['all', 'active', 'completed'] as Filter[]).map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </nav>
          </footer>
        )}
      </main>

      {/* US-11: Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
