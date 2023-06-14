import { create } from 'zustand';
import { generateId } from '../helpers';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

type TodoStore = {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  doneTask: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: [
    {
      id: 'gfgfgfgfgfgfgfgf',
      title: 'Drink Coffe',
      done: false,
    },
    { id: 'gfgjfjdfgfgffgfgg', title: 'Sleeping', done: false },
  ],
  
  createTask: (title: string) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title: title,
      done: false,
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

  doneTask: (id: string) => {
    const { tasks } = get();
    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    set({
      tasks: updatedTasks,
    });
  },
}));
