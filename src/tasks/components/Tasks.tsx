import React from 'react';
import { CreateTask } from './CreateTask';
import { TaskList } from './TaskList';
import { useTasksStore } from '../dataStores/useTasksStore';

export const Tasks = () => {
  const { data, createTask } = useTasksStore();

  return (
    <div>
      <CreateTask onSubmit={(newTaskTitle) => createTask(newTaskTitle)} />
      <TaskList tasks={data} />
    </div>
  );
};
