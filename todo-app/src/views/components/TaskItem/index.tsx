import { FC, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

type TaskItemProps = {
  id: string;
  title: string;
  done: boolean;
  onDone: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
};

export const TaskItem: FC<TaskItemProps> = ({
  id,
  title,
  done,
  onDone,
  onUpdate,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  const doneStatus = !done
    ? `${styles.taskItemTitle}`
    : `${styles.taskItemTitleDone}`;
    
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  const handleDone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onDone(id);
  };
  return (
    <div className={styles.taskItem}>
      <label className={styles.taskItemLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.taskItemCheckbox}
          onChange={handleDone}
        />
        {isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef}
            onChange={event => {
              setValue(event.target.value);
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                onUpdate(id, value);
                setIsEditMode(false);
              }
            }}
            className={styles.taskItemTitleEdit}
          />
        ) : (
          <h3 className={doneStatus}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.taskItemSave}
          onClick={() => {
            onUpdate(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.taskItemEdit}
          onClick={() => setIsEditMode(true)}
        />
      )}

      <button
        aria-label="Remove"
        className={styles.taskItemRemove}
        onClick={() => onRemoved(id)}
      />
    </div>
  );
};
