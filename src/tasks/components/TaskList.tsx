import React, { FunctionComponent } from 'react';

type TaskListProps = {
  tasks: string[];
};

export const TaskList: FunctionComponent<TaskListProps> = ({ tasks }) => (
  <ul>
    {tasks.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
