import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';
import { STORAGE_KEYS, DEFAULT_TODOS } from '@/constants';

/**
 * Load todos from localStorage
 * @returns {Array} Saved todos or default todos
 */
const loadTodosFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate structure
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load todos from localStorage:', error);
  }
  return DEFAULT_TODOS;
};

/**
 * Save todos to localStorage
 * @param {Array} todos - Todos array to save
 */
const saveTodosToStorage = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.warn('Failed to save todos to localStorage:', error);
  }
};

// Initial state with localStorage persistence
const initialState = {
  todo: loadTodosFromStorage(),
};

/**
 * Todo slice with CRUD operations and localStorage sync
 */
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    /**
     * Add a new todo
     * @param {Object} action.payload - { task: string }
     */
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        task: action.payload.task,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.todo.unshift(todo); // Add to beginning for better UX
      saveTodosToStorage(state.todo);
    },

    /**
     * Delete a todo by ID
     * @param {string} action.payload - Todo ID to delete
     */
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.payload);
      saveTodosToStorage(state.todo);
    },

    /**
     * Update a todo's task text
     * @param {Object} action.payload - { id: string, task: string }
     */
    updateTodo: (state, action) => {
      const { id, task } = action.payload;
      const todo = state.todo.find((item) => item.id === id);
      if (todo) {
        todo.task = task;
        todo.updatedAt = new Date().toISOString();
      }
      saveTodosToStorage(state.todo);
    },

    /**
     * Toggle a todo's completed status
     * @param {string} action.payload - Todo ID to toggle
     */
    toggleComplete: (state, action) => {
      const todo = state.todo.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? new Date().toISOString() : null;
      }
      saveTodosToStorage(state.todo);
    },

    /**
     * Clear all completed todos
     */
    clearCompleted: (state) => {
      state.todo = state.todo.filter((item) => !item.completed);
      saveTodosToStorage(state.todo);
    },

    /**
     * Reorder todos (for future drag-and-drop)
     * @param {Object} action.payload - { fromIndex: number, toIndex: number }
     */
    reorderTodos: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.todo.splice(fromIndex, 1);
      state.todo.splice(toIndex, 0, removed);
      saveTodosToStorage(state.todo);
    },
  },
});

// Actions
export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  clearCompleted,
  reorderTodos,
} = todoSlice.actions;

// Base selector
const selectTodoState = (state) => state.todo;

// Memoized selectors for performance
export const selectTodos = createSelector(
  [selectTodoState],
  (todoState) => todoState || []
);

export const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => !todo.completed)
);

export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.completed)
);

export const selectActiveCount = createSelector(
  [selectActiveTodos],
  (activeTodos) => activeTodos.length
);

export const selectCompletedCount = createSelector(
  [selectCompletedTodos],
  (completedTodos) => completedTodos.length
);

export const selectTotalCount = createSelector(
  [selectTodos],
  (todos) => todos.length
);

export const selectTodoById = (id) =>
  createSelector([selectTodos], (todos) => todos.find((todo) => todo.id === id));

export default todoSlice.reducer;