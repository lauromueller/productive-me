import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Tasks } from './Tasks';
import userEvent from '@testing-library/user-event';

describe('tests the App root component', () => {
  it('should correctly display the created item on the screen', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    expect(itemDescription).toHaveValue('');
    expect(screen.getByText('First item')).toBeInTheDocument();

    await user.click(itemDescription);
    await user.keyboard('Second item');
    await user.click(createButton);

    expect(itemDescription).toHaveValue('');
    expect(screen.getByText('Second item')).toBeInTheDocument();
  });

  it('should not add empty item descriptions to the list', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    expect(itemDescription).toHaveValue('');
    await user.click(createButton); // Tries to create an item with empty description

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  it('should allow the user to create items with the same description', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    // Adds an item with the same description
    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    expect(screen.getAllByText('First item')).toHaveLength(2);
  });

  it('should toggle a task completing upon clicking on the respective checkbox', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    const taskCheckbox = screen.getByRole('checkbox');
    expect(taskCheckbox).toBeInTheDocument();
    expect(taskCheckbox).not.toBeChecked();

    await user.click(taskCheckbox);
    expect(taskCheckbox).toBeChecked();

    await user.click(taskCheckbox);
    expect(taskCheckbox).not.toBeChecked();
  });

  it('should toggle a task completion upon clicking on the task label', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    const taskCheckbox = screen.getByRole('checkbox');
    expect(taskCheckbox).toBeInTheDocument();
    expect(taskCheckbox).not.toBeChecked();

    const taskLabel = screen.getByLabelText('First item');
    expect(taskLabel).toBeInTheDocument();

    await user.click(taskLabel);
    expect(taskCheckbox).toBeChecked();

    await user.click(taskLabel);
    expect(taskCheckbox).not.toBeChecked();
  });

  it('should complete the correct task when clicking on its respective checkbox', async () => {
    const user = userEvent.setup();
    render(<Tasks />);

    const itemDescription = screen.getByRole('textbox');
    const createButton = screen.getByRole('button');

    await user.click(itemDescription);
    await user.keyboard('First item');
    await user.click(createButton);

    await user.click(itemDescription);
    await user.keyboard('Second item');
    await user.click(createButton);

    const tasks = screen.getAllByRole('listitem');
    expect(tasks).toHaveLength(2);

    const firstTaskCheckbox = within(tasks[0]).getByRole('checkbox');
    const secondTaskCheckbox = within(tasks[1]).getByRole('checkbox');

    expect(firstTaskCheckbox).not.toBeChecked();
    expect(secondTaskCheckbox).not.toBeChecked();

    await user.click(secondTaskCheckbox);

    expect(firstTaskCheckbox).not.toBeChecked();
    expect(secondTaskCheckbox).toBeChecked();

    await user.click(firstTaskCheckbox);

    expect(firstTaskCheckbox).toBeChecked();
    expect(secondTaskCheckbox).toBeChecked();
  });
});
