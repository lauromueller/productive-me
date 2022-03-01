import React, { FunctionComponent } from 'react';
import { Task } from '../models';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList: FunctionComponent<TaskListProps> = ({ tasks }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.getIdentifier()}>{task.getTitle()}</li>
    ))}
  </ul>
);
