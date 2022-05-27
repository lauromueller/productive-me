import React, { FunctionComponent, useState } from 'react';
import { Button, TextField } from '@mui/material';

type CreateTaskProps = {
  onSubmit: (taskTitle: string) => Promise<void>;
};

export const CreateTask: FunctionComponent<CreateTaskProps> = ({ onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField
        size="small"
        value={taskTitle}
        onChange={(event) => {
          event.preventDefault();
          setTaskTitle(event.target.value);
        }}
        sx={{
          width: {
            xs: '100%',
            sm: '70%',
          },
        }}
      />
      <Button
        size="large"
        sx={{
          boxShadow: 'none !important',
          width: {
            xs: '100%',
            sm: 'unset',
          },
          marginTop: {
            xs: '12px',
            sm: 'unset',
          },
        }}
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
