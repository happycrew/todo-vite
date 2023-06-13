import { FC, useCallback, useState } from 'react';
import styles from './index.module.scss';

type AddTaskInputProps = {
  onAdd: (title: string) => void;
};

export const AddTaskInput: FC<AddTaskInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTask = useCallback(() => {
    onAdd(inputValue) ;
    setInputValue('');
  }, [inputValue])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTask();
    }
  }
  return (
    <div className={styles.inputTask}>
      <input
        type="text"
        className={styles.inputTaskTitle}
        value={inputValue}
        placeholder='What needs to be done?'
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask} aria-label="Add" className={styles.inputTaskButton} />
    </div>
  );
};
