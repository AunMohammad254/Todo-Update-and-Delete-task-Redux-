import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
    todo: [{
        id: 1, 
        task: "Learn Redux Toolkit",
        completed: false
    }]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action)=>{
            const todo = {
                id: nanoid(),
                task: action.payload.task,
                completed: false
            }
            state.todo.push(todo)
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter((item) => item.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, task } = action.payload
            const todo = state.todo.find((item) => item.id === id)
            if (todo) {
                todo.task = task
            }
        },
        toggleComplete: (state, action) => {
            const todo = state.todo.find((item) => item.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    }
})


export const { addTodo, deleteTodo, updateTodo, toggleComplete } = todoSlice.actions
export default todoSlice.reducer