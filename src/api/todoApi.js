// src/api/todoApi.js
import axios from "axios";

// Using JSONPlaceholder as a mock API
const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const todoApi = {
  // Fetch todos (limited to 5 for this example)
  fetchTodos: async () => {
    const response = await axios.get(`${BASE_URL}?_limit=5`);
    return response.data;
  },

  // Add new todo
  addTodo: async (todo) => {
    //Make API request to add todo
    const response = await axios.post(BASE_URL, todo);
    return response.data;
  },

  // Toggle todo completion
  toggleTodo: async (id, completed) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, { completed });
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  },
};
