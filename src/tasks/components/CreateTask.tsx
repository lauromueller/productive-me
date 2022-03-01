import React, { FunctionComponent, useState } from 'react';
import { Button, Input } from '@mui/material';

type CreateTaskProps = {
  onSubmit: (task: string) => Promise<void>;
};

export const CreateTask: FunctionComponent<CreateTaskProps> = ({ onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        value={taskTitle}
        onChange={(event) => {
          event.preventDefault();
          setTaskTitle(event.target.value);
        }}
      />
      <Button
        onClick={async () => {
          if (taskTitle !== '') {
            try {
              await onSubmit(taskTitle);
              setTaskTitle('');
            } catch {
              // no-op
            }
          }
        }}
      >
        Create
      </Button>
    </form>
  );
};
