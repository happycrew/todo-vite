import create, { State, StateCreator } from 'zustand';
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

const isToDoStore = (object: any): object is TodoStore => {
  return 'tasks' in object;
};

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api,
    );

const getCurrentState = () => {
  try {
    const currentState: Task[] = JSON.parse(
      window.localStorage.getItem('tasks') || '[]',
    );
    return currentState;
  } catch (err) {
    window.localStorage.setItem('tasks', '[]');
  }

  return [];
};

export const useTodoStore = create<TodoStore>(
  localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
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
  })),
);
