import { Header, TodoInput, TodoList, Footer, ThemeToggle } from '@/components';
import { useTodoActions, useTheme } from '@/hooks';

/**
 * Main App Component
 * Uses custom hooks and componentized architecture for clean code
 */
function App() {
  const {
    todos,
    activeCount,
    completedCount,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
  } = useTodoActions();

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <main className="max-w-3xl mx-auto" role="main">
        {/* Theme Toggle - Fixed position */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        <Header
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={todos.length}
        />

        <TodoInput onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={updateTodo}
          onDelete={deleteTodo}
        />

        <Footer hasTodos={todos.length > 0} />
      </main>
    </div>
  );
}

export default App;
