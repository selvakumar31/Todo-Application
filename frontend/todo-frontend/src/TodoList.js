import React, { useEffect, useState } from "react";
import API from "./Api";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("todos/");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    await API.post("todos/", { title });
    setTitle("");
    fetchTodos();
  };

  const toggle = async (todo) => {
    await API.patch(`todos/${todo.id}/`, { completed: !todo.completed });
    fetchTodos();
  };

  const remove = async (id) => {
    await API.delete(`todos/${id}/`);
    fetchTodos();
  };

  return (
    <div className="todo-card">
      <h3 className="section-title">Todos</h3>
      <form onSubmit={addTodo} className="todo-form">
        <input
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button className="todo-add-btn">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className="todo-item">
            <div className="todo-left">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
              />
              <span
                className={
                  "todo-title" + (t.completed ? " completed" : "")
                }
              >
                {t.title}
              </span>
            </div>
            <button className="todo-delete" onClick={() => remove(t.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
