import { memo } from 'react';

/**
 * Header component with animated icon and title
 * Memoized for performance - only re-renders on prop changes
 */
function Header({ activeCount, completedCount, totalCount }) {
  return (
    <header className="text-center mb-6 sm:mb-8 animate-fade-in">
      {/* Animated Icon */}
      <div className="inline-block mb-3 sm:mb-4">
        <div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow"
          role="img"
          aria-label="Task Master Logo"
        >
          <svg 
            className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-3">
        Task Master
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
        Organize your life, one task at a time ✨
      </p>

      {/* Stats */}
      {totalCount > 0 && (
        <div 
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6"
          role="status"
          aria-live="polite"
          aria-label={`${activeCount} active tasks, ${completedCount} completed tasks`}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active: </span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{activeCount}</span>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed: </span>
            <span className="font-bold text-green-600 dark:text-green-400">{completedCount}</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
