import React, { useState } from "react";

const Todo_List = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");
  
  <button></button>

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setActiveButton(newFilter);
  };

  const handleClearCompletedBtn = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        completed: false,
      },
    ]);
  };

  const handleTodoAdd = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id) => {
    setEditId(id);
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setEditText(todoToUpdate.text);
    }
  };

  const handleUpdateTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditId(null);
    setEditText("");
  };

  const handleUpdateKeyPress = (e, id) => {
    if (e.key === "Enter") {
      handleEdit(id);
    }
  };

  const handleCheckBox = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleToggleBtn = () => {
    const isAnyUnchecked = todos.some((todo) => !todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: isAnyUnchecked })));
  };

  const counterItem = todos.filter((todo) => !todo.completed).length;

  const showControls = todos.length > 0;

  const showToggleAllButton =
    (filter === "all" && todos.length > 0) ||
    (filter === "active" && todos.some((todo) => !todo.completed)) ||
    (filter === "completed" && todos.some((todo) => todo.completed));

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl mb-6 font-bold text-center">Todo List</h1>
      <div className="flex mb-4">
        {showToggleAllButton ? (
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
            onClick={handleToggleBtn}
          >
            ✓
          </button>
        ) : (
          <div className="w-11"></div>
        )}
        <input
          type="text"
          className="flex-1 border border-gray-300 p-2 rounded-md mr-2"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleTodoAdd}
        />
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="border border-gray-300 p-2 rounded-md mb-2 flex items-center"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              className="m-3"
              onChange={() => handleCheckBox(todo.id)}
            />
            {editId === todo.id ? (
              <input
                type="text"
                className="flex-1 border border-gray-300 p-1 rounded-md mr-2"
                value={editText}
                onChange={handleUpdateTextChange}
                onKeyDown={(e) => handleUpdateKeyPress(e, todo.id)}
                onBlur={() => handleEdit(todo.id)}
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 ${todo.completed && "line-through"}`}
                onDoubleClick={() => handleUpdate(todo.id)}
              >
                {todo.text}
              </span>
            )}
            <button
              className="py-1 px-2 text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => handleDelete(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {showControls && (
        <div className="mt-4 flex justify-between items-center">
          <span>{counterItem} item Left</span>
          <button
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeButton === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeButton === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </button>
          <button
            className={`py-2 px-4 rounded-md focus:outline-none ${
              activeButton === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md focus:outline-none"
            onClick={handleClearCompletedBtn}
          >
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo_List;
