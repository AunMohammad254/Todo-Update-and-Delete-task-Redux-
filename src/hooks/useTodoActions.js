import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  selectTodos,
  selectActiveCount,
  selectCompletedCount,
} from '@/features/todoSlice';

/**
 * Custom hook for todo actions and state
 * Provides memoized callbacks and computed values
 */
export function useTodoActions() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const activeCount = useSelector(selectActiveCount);
  const completedCount = useSelector(selectCompletedCount);

  const handleAddTodo = useCallback(
    (task) => {
      if (task.trim()) {
        dispatch(addTodo({ task: task.trim() }));
      }
    },
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const handleUpdateTodo = useCallback(
    (id, task) => {
      if (task.trim()) {
        dispatch(updateTodo({ id, task: task.trim() }));
      }
    },
    [dispatch]
  );

  const handleToggleTodo = useCallback(
    (id) => {
      dispatch(toggleComplete(id));
    },
    [dispatch]
  );

  return {
    todos,
    activeCount,
    completedCount,
    addTodo: handleAddTodo,
    deleteTodo: handleDeleteTodo,
    updateTodo: handleUpdateTodo,
    toggleTodo: handleToggleTodo,
  };
}

export default useTodoActions;
