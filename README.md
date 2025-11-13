# 📋 Task Master - Modern Todo App

A beautifully designed, fully-functional Todo application built with **React**, **Redux Toolkit**, and **Tailwind CSS**. Features a modern UI with smooth animations, complete CRUD operations, and full mobile responsiveness.

![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-blue?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-5+-purple?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- ✅ **Add Tasks** - Create new todos with an intuitive input field
- ✏️ **Edit Tasks** - Modify existing tasks inline with a smooth edit interface
- 🗑️ **Delete Tasks** - Remove tasks with a single click
- ✔️ **Complete Tasks** - Mark tasks as done with visual feedback
- 📊 **Task Statistics** - Real-time tracking of active and completed tasks
- 🎨 **Modern Design** - Beautiful gradient UI with glassmorphism effects
- ⚡ **Smooth Animations** - Fade-in, slide-up, and bounce animations
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🌐 **Mobile-First Buttons** - Action buttons always visible on mobile

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AunMohammad254/Todo-Update-and-Delete-task-Redux-.git
   cd Todo-Update-and-Delete-task-Redux-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`

---

## 📦 Build

To build for production:

```bash
npm run build
```

The optimized build will be generated in the `dist/` folder.

---

## 🏗️ Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # App styles
├── main.jsx                # Entry point
├── index.css               # Global styles & animations
├── features/
│   └── todoSlice.js        # Redux slice for todo state management
├── store/
│   └── store.js            # Redux store configuration
├── lib/
│   └── utils.js            # Utility functions
└── assets/                 # Static assets
```

---

## 🎮 How to Use

### Adding a Task
1. Type your task in the input field
2. Press **Enter** or click **Add Task**
3. Task appears in the list with animations

### Editing a Task
1. Hover over the task (on desktop) or the button is always visible (on mobile)
2. Click the **blue edit button** ✏️
3. Modify the text and click **Save** or press **Enter**
4. Click **Cancel** to discard changes

### Deleting a Task
1. Hover over the task (on desktop) or the button is always visible (on mobile)
2. Click the **red delete button** 🗑️
3. Task is instantly removed

### Marking Tasks Complete
1. Click the **circular checkbox** next to the task
2. Task gets a strikethrough and grayed out
3. Completed count updates automatically

---

## 🎨 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React** | UI Library & Component Management |
| **Redux Toolkit** | State Management |
| **Vite** | Fast Build Tool & Dev Server |
| **Tailwind CSS** | Utility-First CSS Framework |
| **JavaScript** | Programming Language |

---

## 📱 Responsive Breakpoints

- **Mobile (< 640px)** - Single column, always-visible buttons, compact spacing
- **Tablet (640px - 1024px)** - Optimized touch targets, flexible layout
- **Desktop (> 1024px)** - Hover effects, spacious layout, full animations

---

## 🎯 Redux State Management

### Redux Slice Actions

```javascript
// Add a new todo
addTodo({ task: "Learn Redux" })

// Delete a todo by ID
deleteTodo(todoId)

// Update a todo
updateTodo({ id: todoId, task: "Updated task" })

// Toggle completion status
toggleComplete(todoId)
```

### State Structure

```javascript
{
  todo: [
    {
      id: "unique-id",
      task: "Task description",
      completed: false
    }
  ]
}
```

---

## ✨ UI/UX Highlights

### Color Scheme
- **Primary**: Indigo & Purple gradients
- **Success**: Green (for completed tasks)
- **Danger**: Red (for delete actions)
- **Info**: Blue (for edit actions)

### Animations
- **Fade-in**: Smooth appearance of elements
- **Slide-up**: Staggered task list entry
- **Bounce**: Icon header movement
- **Hover Effects**: Interactive button scaling

### Visual Effects
- Gradient backgrounds
- Glass-morphism elements
- Shadow depth layers
- Smooth transitions

---

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Aun Mohammad**

- GitHub: [@AunMohammad254](https://github.com/AunMohammad254)
- Repository: [Todo-Update-and-Delete-task-Redux-](https://github.com/AunMohammad254/Todo-Update-and-Delete-task-Redux-)

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Guide](https://redux-toolkit.js.org)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📸 Screenshots

### Desktop View
- Full-featured interface with hover effects
- Spacious layout with visible statistics
- Smooth animations on all interactions

### Mobile View
- Responsive design with touch-friendly buttons
- Always-visible action buttons
- Optimized spacing and typography

---

## 🐛 Known Issues

None currently. If you find any bugs, please [open an issue](https://github.com/AunMohammad254/Todo-Update-and-Delete-task-Redux-/issues).

---

## 🚀 Future Enhancements

- [ ] Local storage persistence
- [ ] Task filtering (All, Active, Completed)
- [ ] Task categories/tags
- [ ] Dark mode theme
- [ ] Drag and drop reordering
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Undo/Redo functionality

---

## 💬 Feedback

Have suggestions or feedback? Feel free to [create an issue](https://github.com/AunMohammad254/Todo-Update-and-Delete-task-Redux-/issues) or reach out!

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

</div>
