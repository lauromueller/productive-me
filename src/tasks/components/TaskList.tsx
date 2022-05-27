import React, { FunctionComponent } from 'react';
import { Task } from '../models';
import { Checkbox, FormControlLabel, List, ListItem } from '@mui/material';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList: FunctionComponent<TaskListProps> = ({ tasks }) => (
  <List>
    {tasks.map((task) => (
      <ListItem key={task.getIdentifier()}>
        <FormControlLabel control={<Checkbox />} label={task.getTitle()} labelPlacement="end" />
      </ListItem>
    ))}
  </List>
);
