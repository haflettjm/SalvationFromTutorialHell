export interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  userId?: string; // Foreign Key
}

export interface CreateTodoDto {
  title: string;
  dueDate?: string;
}

export const dummyTodos = [
  {
    id: "t1",
    title: "Buy groceries",
    completed: false,
    createdAt: "2024-05-01T10:00:00Z",
    updatedAt: "2024-05-01T10:00:00Z",
    dueDate: "2024-05-03T18:00:00Z",
    userId: "u1",
  },
  {
    id: "t2",
    title: "Fix bike",
    completed: true,
    createdAt: "2024-05-02T08:15:00Z",
    updatedAt: "2024-05-02T10:00:00Z",
    dueDate: "2024-05-04T12:00:00Z",
    userId: "u1",
  },
  {
    id: "t3",
    title: "Study Nuxt 3 docs",
    completed: false,
    createdAt: "2024-05-03T14:00:00Z",
    updatedAt: "2024-05-03T14:00:00Z",
    dueDate: "2024-05-10T00:00:00Z",
    userId: "u2",
  },
];

export function useTodos() {
  // const todos = useState<Todo[]>('todos', () => []);
  const todos = useState<Todo[]>("todos", () => dummyTodos);
  const user = useState<User | null>("user");
  const fetchTodos = async () => {
    todos.value = dummyTodos;
  };
  const addTodo = async (newTodo: CreateTodoDto) => {
    const newItem: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user.value?.id ?? "anonymous",
    };

    todos.value.push(newItem);
  };
  const deleteTodo = async (todoToDelete: Todo) => {
    todos.value.pop(newItem);
  };
  return { todos, fetchTodos, addTodo, deleteTodo };
}
