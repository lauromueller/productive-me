import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { CreateTask } from './CreateTask';

describe('tests the CreateTask component', () => {
  it('should trigger the onSubmit function with a valid input', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<CreateTask onSubmit={onSubmit} />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('First task');
    await user.click(screen.getByRole('button'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the onSubmit function when the input is invalid', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<CreateTask onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should clear the task title upon submission with a valid task input', async () => {
    const user = userEvent.setup();

    render(<CreateTask onSubmit={() => new Promise((resolve) => resolve(undefined))} />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('First task');
    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should not clear the task title if the task creation cannot be successfully completed', async () => {
    const user = userEvent.setup();

    render(<CreateTask onSubmit={() => new Promise((_resolve, reject) => reject(''))} />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('First task');
    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('textbox')).toHaveValue('First task');
  });
});
