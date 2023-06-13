import { FC } from 'react';
import { useTodoStore } from '@/data/stores/useToDoStore';
import { AddTaskInput } from '../components/AddTaskInput';
import styles from './index.module.scss';

export const App: FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useTodoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  const onAddTask = (title: string) => {
    if (title) createTask(title);
  }

  console.log(tasks);

  return (
    <article className={styles.app}>
      <h1 className={styles.appTitle}>To Do App</h1>
      <section className={styles.appSection}>
        <AddTaskInput
          onAdd={onAddTask}
        />
      </section>
      <section className={styles.appSection}></section>
    </article>
  );
};
