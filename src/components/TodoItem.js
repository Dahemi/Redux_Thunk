import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../features/todos/todoSlice";

export function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 p-2 border rounded mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          dispatch(toggleTodo({ id: todo.id, completed: !todo.completed }))
        }
      />
      <span
        className={`flex-grow ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
