import { FC } from 'react';
import styles from './index.module.scss';

export const App: FC = () => {
  return (
    <article className={styles.app}>
      <h1 className={styles.appTitle}>To Do App</h1>
      <section className={styles.appSection}></section>
      <section className={styles.appSection}></section>
    </article>
  );
};
