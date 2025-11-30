import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { KEYS } from '@/constants';

/**
 * TodoInput component for adding new tasks
 * Features: Enter key support, auto-focus, validation
 */
function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (input.trim()) {
        onAddTodo(input);
        setInput('');
      }
    },
    [input, onAddTodo]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === KEYS.ENTER) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section 
      className="relative mb-6 sm:mb-8 animate-slide-up"
      aria-label="Add new task"
    >
      {/* Gradient border effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-30 dark:opacity-40"></div>
      
      <form 
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 transition-colors duration-300"
      >
        <div className="flex gap-2 sm:gap-3">
          <label htmlFor="todo-input" className="sr-only">
            New task description
          </label>
          <input
            ref={inputRef}
            id="todo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done today?"
            className="flex-1 px-3 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl 
                     focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                     transition-all text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 
                     bg-white dark:bg-gray-700 text-sm sm:text-base"
            aria-describedby="input-hint"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-linear-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-700 hover:to-purple-700 
                     disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed
                     dark:disabled:from-gray-600 dark:disabled:to-gray-600
                     text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl 
                     font-semibold transition-all transform 
                     hover:scale-105 active:scale-95 
                     shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     dark:focus:ring-offset-gray-800
                     text-sm sm:text-base whitespace-nowrap"
            aria-label="Add new task"
          >
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden text-xl leading-none">+</span>
          </button>
        </div>
        <p id="input-hint" className="sr-only">
          Press Enter to add the task
        </p>
      </form>
    </section>
  );
}

export default memo(TodoInput);
