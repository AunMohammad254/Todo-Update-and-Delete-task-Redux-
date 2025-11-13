import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, updateTodo, toggleComplete } from './features/todoSlice';

function App() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch()

  function addTodoFn() { 
    if (input.trim() === "") return;
    
    dispatch(addTodo({
      task: input
    }))
    setInput("");
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  }

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditText(item.task);
  }

  const handleUpdate = (id) => {
    if (editText.trim() === "") return;
    
    dispatch(updateTodo({
      id,
      task: editText
    }))
    setEditId(null);
    setEditText("");
  }

  const handleToggle = (id) => {
    dispatch(toggleComplete(id));
  }

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  }

  // Stats
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with Animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Task Master
          </h1>
          <p className="text-gray-600 text-lg">Organize your life, one task at a time ✨</p>
          
          {/* Stats */}
          {todos.length > 0 && (
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">Active: </span>
                <span className="font-bold text-indigo-600">{activeCount}</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">Completed: </span>
                <span className="font-bold text-green-600">{completedCount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Section with Gradient Border */}
        <div className="relative mb-8 animate-slide-up">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition"></div>
          <div className="relative bg-white rounded-2xl shadow-xl p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodoFn()}
                placeholder="What needs to be done today?"
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={addTodoFn}
                className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Todos List */}
        <div className="space-y-3">
          {todos?.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No tasks yet. Start by adding your first task!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos?.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up group overflow-hidden border-l-4 border-transparent hover:border-indigo-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {editId === item.id ? (
                    /* Edit Mode */
                    <div className="p-4 sm:p-5 bg-linear-to-r from-blue-50 to-indigo-50">
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleUpdate(item.id)}
                          className="flex-1 px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdate(item.id)}
                            className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition transform hover:scale-105 active:scale-95 shadow-md"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 sm:flex-none bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition transform hover:scale-105 active:scale-95 shadow-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          item.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 hover:border-indigo-500'
                        }`}
                      >
                        {item.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Task Text */}
                      <span 
                        className={`flex-1 text-gray-800 text-base sm:text-lg transition-all duration-300 ${
                          item.completed 
                            ? 'line-through text-gray-400' 
                            : ''
                        }`}
                      >
                        {item.task}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110 active:scale-95 shadow-md"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition transform hover:scale-110 active:scale-95 shadow-md"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm animate-fade-in">
            <p>💡 Hover over tasks to see edit and delete options</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
