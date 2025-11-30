import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { KEYS } from '@/constants';

// Icons as separate memoized components for performance
const CheckIcon = memo(() => (
  <svg 
    className="w-4 h-4 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = 'CheckIcon';

const EditIcon = memo(() => (
  <svg 
    className="w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
    />
  </svg>
));
EditIcon.displayName = 'EditIcon';

const DeleteIcon = memo(() => (
  <svg 
    className="w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
    />
  </svg>
));
DeleteIcon.displayName = 'DeleteIcon';

/**
 * TodoItem component - Individual todo item with edit/delete capabilities
 * Features: Inline editing, completion toggle, keyboard navigation
 */
function TodoItem({ 
  id, 
  task, 
  completed, 
  onToggle, 
  onEdit, 
  onDelete,
  style 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task);
  const editInputRef = useRef(null);

  // Focus edit input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = useCallback(() => {
    setEditText(task);
    setIsEditing(true);
  }, [task]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText(task);
  }, [task]);

  const handleSaveEdit = useCallback(() => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  }, [id, editText, onEdit]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === KEYS.ENTER) {
        handleSaveEdit();
      } else if (e.key === KEYS.ESCAPE) {
        handleCancelEdit();
      }
    },
    [handleSaveEdit, handleCancelEdit]
  );

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  if (isEditing) {
    return (
      <article 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border-l-4 border-indigo-500 animate-slide-up transition-colors duration-300"
        style={style}
        role="listitem"
      >
        <div className="p-3 sm:p-5 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700">
          <div className="flex gap-2 flex-col sm:flex-row">
            <label htmlFor={`edit-${id}`} className="sr-only">
              Edit task
            </label>
            <input
              ref={editInputRef}
              id={`edit-${id}`}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 sm:px-4 py-2 border-2 border-indigo-300 dark:border-indigo-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              aria-label="Edit task text"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={!editText.trim()}
                className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         text-white px-4 py-2 rounded-lg font-medium 
                         transition transform hover:scale-105 active:scale-95 
                         shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-800
                         text-sm sm:text-base"
                aria-label="Save changes"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 sm:flex-none bg-gray-400 hover:bg-gray-500 
                         text-white px-4 py-2 rounded-lg font-medium 
                         transition transform hover:scale-105 active:scale-95 
                         shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-800
                         text-sm sm:text-base"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl 
               transition-all duration-300 animate-slide-up group overflow-hidden 
               border-l-4 border-transparent hover:border-indigo-500
               focus-within:border-indigo-500 focus-within:shadow-xl"
      style={style}
      role="listitem"
      aria-label={`Task: ${task}. ${completed ? 'Completed' : 'Active'}`}
    >
      <div className="p-3 sm:p-5 flex items-center gap-2 sm:gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={handleToggle}
          className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 
                   transition-all duration-300 flex items-center justify-center
                   focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                   ${completed 
                     ? 'bg-green-500 border-green-500 focus:ring-green-500' 
                     : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 focus:ring-indigo-500'
                   }`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          aria-pressed={completed}
        >
          {completed && <CheckIcon />}
        </button>

        {/* Task Text */}
        <span 
          className={`flex-1 text-sm sm:text-lg transition-all duration-300 overflow-wrap-break-word
                   ${completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}
        >
          {task}
        </span>

        {/* Action Buttons - Always visible on mobile, hover on desktop */}
        <div 
          className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 
                   sm:group-hover:opacity-100 sm:focus-within:opacity-100 
                   transition-opacity duration-300"
        >
          <button
            type="button"
            onClick={handleStartEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white 
                     p-1.5 sm:p-2 rounded-lg transition transform 
                     hover:scale-110 active:scale-95 shadow-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Edit task: ${task}`}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white 
                     p-1.5 sm:p-2 rounded-lg transition transform 
                     hover:scale-110 active:scale-95 shadow-md
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Delete task: ${task}`}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(TodoItem);
