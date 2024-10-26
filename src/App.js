import React, { useState } from 'react';
import Sidebar from './Sidebar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content */}
        <div className={`flex-grow transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Header 
          <Header darkMode={darkMode} toggleTheme={toggleTheme} />*/}

          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-full max-w-lg p-6 mt-16">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
              Task Manager
            </h1>

            <div className="flex mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Add a new task..."
              />
              <button
                onClick={handleAddTask}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>

            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center p-2 border rounded-md ${
                    task.completed ? "bg-green-100 dark:bg-green-800" : "bg-red-100 dark:bg-red-800"
                  }`}
                >
                  <span
                    className={`${task.completed ? "line-through" : ""} flex-grow px-2 text-gray-800 dark:text-gray-100`}
                  >
                    {task.text}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleToggleComplete(index)}
                      className={`px-4 py-2 text-white rounded-md ${
                        task.completed
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      } transition`}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
