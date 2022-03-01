import React, { useState } from 'react';
import { CreateTask } from './CreateTask';

export const Tasks = () => {
  const [items, setItems] = useState<string[]>([]);

  return (
    <div>
      <CreateTask
        onSubmit={(newItem) =>
          new Promise((resolve) => {
            setItems([...items, newItem]);
            resolve(undefined);
          })
        }
      />
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
