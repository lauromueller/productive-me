import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { Task } from '../models';

describe('tests the TaskList component', () => {
  it('should render a list with all the tasks', () => {
    render(<TaskList tasks={[new Task('First task')]} />);

    expect(screen.getByText('First task')).toBeInTheDocument();
  });
});
