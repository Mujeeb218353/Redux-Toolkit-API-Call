import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    return response.json()
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.rejected, (state) => {
            state.isError = true
        })
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
    },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        removeTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer