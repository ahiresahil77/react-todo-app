
import "./App.css";
import { useState, useEffect } from "react";

function Todoapp() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingid, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function clearAll() {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
      setEditingId(null);
      setTask("");
    }
  }

  function addtask() {
    if (task.trim() !== "") {
      if (editingid !== null) {
        const updateTasks = tasks.map((item) => {
          if (item.id === editingid) {
            return {
              ...item,
              text: task.trim()
            };
          }
          return item;
        });

        setTasks(updateTasks);
        setEditingId(null);
      } else {
        setTasks([
          ...tasks,
          {
            id: crypto.randomUUID(),
            text: task.trim(),
            completed: false
          }
        ]);
      }

      setTask("");
    }
  }

  function toogleTask(idToToggle) {
    const updateTasks = tasks.map((item) => {
      if (item.id === idToToggle) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    });

    setTasks(updateTasks);
  }

  function deleteTask(idtodelete) {
    const updateTask = tasks.filter(
      (item) => item.id !== idtodelete
    );

    setTasks(updateTask);
  }

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

  const searchfilter = filteredTasks.filter((item) => {
    return item.text
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="todo-container">
      <p>Total tasks: {tasks.length}</p>

      <p>
        Completed: {tasks.filter((item) => item.completed).length}
      </p>

      <p>
        Pending: {tasks.filter((item) => !item.completed).length}
      </p>

      {/* Search input */}
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Add or edit task */}
      <div className="todo-input">
        <input
          placeholder={editingid !== null ? "Edit task..." : "Enter a task..."}
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button onClick={addtask}>
          {editingid !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Task list and empty-state messages */}
      {tasks.length === 0 ? (
        <h2 className="empty-message">No tasks yet!</h2>
      ) : filteredTasks.length === 0 ? (
        <h2 className="empty-message">
          {filter === "completed"
            ? "No completed tasks!"
            : "No pending tasks!"}
        </h2>
      ) : searchfilter.length === 0 ? (
        <h2 className="empty-message">
          No matching tasks found!
        </h2>
      ) : (
        <ul>
          {searchfilter.map((item) => (
            <li key={item.id} className="task-item">
              <span
                style={{
                  textDecoration: item.completed
                    ? "line-through"
                    : "none"
                }}
              >
                {item.text}
              </span>

              <button onClick={() => toogleTask(item.id)}>
                {item.completed ? "Undo" : "Completed"}
              </button>

              <button
                onClick={() => {
                  setEditingId(item.id);
                  setTask(item.text);
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Clear and filter buttons */}
      <button onClick={clearAll}>Clear All</button>

      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>

      <button
        className={filter === "pending" ? "active-filter" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
}

export default Todoapp;
