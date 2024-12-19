// src/features/todos/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoApi } from "../../api/todoApi";

// Async thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await todoApi.fetchTodos();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (title) => {
  //prepare todo object
  const newTodo = {
    title,
    completed: false,
    userId: 1, // Mock user ID
  };
  //callAPI to add todo object
  return await todoApi.addTodo(newTodo);
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    return await todoApi.toggleTodo(id, completed);
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await todoApi.deleteTodo(id);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
