import { FC } from 'react';
import { useTodoStore } from '@/data/stores/useToDoStore';
import styles from './index.module.scss';

export const App: FC = () => {
  console.log(useTodoStore);

  const [tasks, createTask, updateTask, removeTask] = useTodoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]); 

  return (
    <article className={styles.app}>
      <h1 className={styles.appTitle}>To Do App</h1>
      <section className={styles.appSection}></section>
      <section className={styles.appSection}></section>
    </article>
  );
};
