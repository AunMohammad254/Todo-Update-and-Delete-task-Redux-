import { memo } from 'react';

/**
 * EmptyState component shown when there are no todos
 */
function EmptyState() {
  return (
    <section 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg 
               p-8 sm:p-12 text-center animate-fade-in transition-colors duration-300"
      aria-label="No tasks"
    >
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-full 
                 flex items-center justify-center mx-auto mb-4"
        role="img"
        aria-hidden="true"
      >
        <svg 
          className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
        No tasks yet. Start by adding your first task!
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
        Type a task above and press Enter or click Add Task
      </p>
    </section>
  );
}

export default memo(EmptyState);
