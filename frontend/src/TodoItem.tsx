import { useState, useRef, useEffect } from 'react';
import type { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onEdit: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  pendingIds: Set<number>;
}

export function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
  pendingIds,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPending = pendingIds.has(todo.id);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEdit() {
    setEditValue(todo.title);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setEditValue(todo.title);
  }

  async function commitEdit() {
    const trimmed = editValue.trim();
    if (!trimmed) {
      // Empty title — cancel edit
      cancelEdit();
      return;
    }
    if (trimmed !== todo.title) {
      await onEdit(todo.id, trimmed);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      commitEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isPending ? 'pending' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          disabled={isPending}
          onChange={() => onToggle(todo.id, !todo.completed)}
          aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        />

        {editing ? (
          <input
            ref={inputRef}
            className="todo-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
          />
        ) : (
          <span
            className="todo-title"
            onDoubleClick={startEdit}
            title="Double-click to edit"
          >
            {todo.title}
          </span>
        )}
      </div>

      {!editing && (
        <button
          className="todo-delete"
          onClick={() => onDelete(todo.id)}
          disabled={isPending}
          aria-label="Delete todo"
        >
          ×
        </button>
      )}
    </li>
  );
}
