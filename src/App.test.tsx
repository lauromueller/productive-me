import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import userEvent from '@testing-library/user-event';

describe('tests the App root component', () => {
  it('should correctly display the created item on the screen', async () => {
    const user = userEvent.setup();
    render(<App />);

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
    render(<App />);

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
    render(<App />);

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
});
