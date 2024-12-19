// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { TodoList } from "./components/ToDoList.js";
function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
