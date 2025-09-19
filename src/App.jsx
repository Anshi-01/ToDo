import React, { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const [subTaskInput, setSubTaskInput] = useState("");

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const trimmed = taskInput.trim();
    if (!trimmed) return;

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, title: trimmed } : task
        )
      );
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: nanoid(),
        title: trimmed,
        done: false,
        subpoints: [],
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setTaskInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (id === editingTaskId) {
      setEditingTaskId(null);
      setTaskInput("");
    }
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTaskInput(task.title);
      setEditingTaskId(id);
    }
  };

  const toggleTaskExpand = (id) => {
    setOpenTaskId((prev) => (prev === id ? null : id));
  };

  const handleAddSubtask = (taskId) => {
    const trimmed = subTaskInput.trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subpoints: [...task.subpoints, { id: nanoid(), text: trimmed }],
            }
          : task
      )
    );

    setSubTaskInput("");
  };

  const toggleTaskDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-pink-100 p-6 font-catfont">
      <h1 className="text-3xl text-center mb-6 text-purple-700 font-bold">
        🐾 CatToDo - Stay Pawsitive!
      </h1>

      <form
        onSubmit={handleTaskSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 mb-6"
      >
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="What's on your meow-nd?"
          className="px-4 py-2 rounded-full border w-full sm:w-1/2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-all duration-300"
        >
          {editingTaskId ? "🐱 Update" : "➕ Add Task"}
        </button>
      </form>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks yet... 😿</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-300"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTaskDone(task.id)}
                  className="accent-purple-500"
                />

                <h2
                  className={`flex-1 text-lg font-semibold ${
                    task.done
                      ? "line-through text-gray-400"
                      : "text-purple-800"
                  }`}
                >
                  {task.title}
                </h2>

                <button onClick={() => toggleTaskExpand(task.id)} title="Subpoints">
                  {openTaskId === task.id ? "⬇️" : "➡️"}
                </button>

                <button
                  onClick={() => handleEditTask(task.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full"
                >
                  🗑️
                </button>
              </div>

              {openTaskId === task.id && (
                <div className="mt-3 ml-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddSubtask(task.id);
                    }}
                    className="flex gap-2 items-center mb-2"
                  >
                    <input
                      value={subTaskInput}
                      onChange={(e) => setSubTaskInput(e.target.value)}
                      placeholder="Add sub-task 🐾"
                      className="px-3 py-1 rounded-full border border-purple-300 w-1/2 focus:ring focus:ring-purple-200"
                    />
                    <button
                      type="submit"
                      className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 rounded-full"
                    >
                      Add 🐾
                    </button>
                  </form>

                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {task.subpoints.map((sub) => (
                      <li key={sub.id} className="py-1">
                        {sub.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
