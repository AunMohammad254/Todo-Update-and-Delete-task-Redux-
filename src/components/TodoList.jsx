import { memo } from 'react';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import { ANIMATION } from '@/constants';

/**
 * TodoList component - Renders list of todo items
 * Features: Empty state, staggered animations
 */
function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos || todos.length === 0) {
    return <EmptyState />;
  }

  return (
    <section aria-label="Task list">
      <ul className="space-y-2 sm:space-y-3" role="list">
        {todos.map((item, index) => (
          <li key={item.id}>
            <TodoItem
              id={item.id}
              task={item.task}
              completed={item.completed}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              style={{ animationDelay: `${index * ANIMATION.STAGGER_DELAY}ms` }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(TodoList);
