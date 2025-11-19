import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-12-31'
  };

  it('renders task title', () => {
    render(
      <BrowserRouter>
        <TaskCard task={mockTask} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});

