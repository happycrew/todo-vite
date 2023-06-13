import { create } from 'zustand';
import { generateId } from '../helpers';

type Task = {
  id: string;
  title: string;
};

type TodoStore = {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: [],
  createTask: (title: string) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title: title,
    };

    set({
      tasks: [newTask].concat(tasks),
    });
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task: Task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task: Task) => task.id !== id),
    });
  },
}));
