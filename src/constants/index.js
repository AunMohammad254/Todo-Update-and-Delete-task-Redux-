/**
 * Application constants for better maintainability
 */

// Local Storage Keys
export const STORAGE_KEYS = {
  TODOS: 'taskmaster-todos',
};

// Animation durations (in ms)
export const ANIMATION = {
  STAGGER_DELAY: 50,
  FADE_DURATION: 300,
  TRANSITION_DURATION: 200,
};

// Keyboard codes
export const KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
};

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

// Default todo for new installations
export const DEFAULT_TODOS = [
  {
    id: 'default-1',
    task: 'Welcome to Task Master! Click here to complete this task',
    completed: false,
  },
];
