import React from 'react';
import { CreateTask } from './CreateTask';
import { TaskList } from './TaskList';
import { useTasksStore } from '../dataStores/useTasksStore';

export const Tasks = () => {
  const { data, error, createTask } = useTasksStore();

  return (
    <div>
      <CreateTask onSubmit={(newTaskTitle) => createTask(newTaskTitle)} />
      {error && <p>{error}</p>}
      <TaskList tasks={data} />
    </div>
  );
};
