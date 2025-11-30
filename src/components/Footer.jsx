import { memo } from 'react';

/**
 * Footer component with helpful tips
 */
function Footer({ hasTodos }) {
  if (!hasTodos) return null;

  return (
    <footer className="mt-6 sm:mt-8 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm animate-fade-in">
      <p className="hidden sm:block">
        💡 Hover over tasks to see edit and delete options
      </p>
      <p className="sm:hidden">
        💡 Tap the buttons to edit or delete tasks
      </p>
      <p className="mt-2 text-gray-400 dark:text-gray-500">
        Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 font-mono text-xs">Enter</kbd> to quickly add tasks
      </p>
    </footer>
  );
}

export default memo(Footer);
