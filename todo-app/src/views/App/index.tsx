import { FC } from 'react';
import { useTodoStore } from '@/data/stores/useToDoStore';
import { AddTaskInput } from '../components/AddTaskInput';
import { TaskItem } from '../components/TaskItem';
import styles from './index.module.scss';
import { stat } from 'fs';

export const App: FC = () => {
  const [tasks, createTask, updateTask, removeTask, doneTask] = useTodoStore(
    state => [
      state.tasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.doneTask,
    ],
  );

  const onAddTask = (title: string) => {
    if (title) createTask(title);
  };
  return (
    <article className={styles.app}>
      <h1 className={styles.appTitle}>To Do App</h1>
      <section className={styles.appSection}>
        <AddTaskInput onAdd={onAddTask} />
      </section>
      <section className={styles.appSection}>
        {!tasks.length && (
          <p className={styles.appEmpty}>There is no one task.</p>
        )}
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            id={task.id}
            done={task.done}
            title={task.title}
            onDone={doneTask}
            onUpdate={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
