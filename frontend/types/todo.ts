export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type FilterStatus = "all" | "active" | "completed";
