import React, { useState } from "react";
import { FaSort, FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const dummyTasks = [
  {
    id: 1,
    title: "Complete React Project",
    status: "Pending",
    deadline: "2024-10-30",
    priority: "High",
    notification: "In 1 hour",
    tags: "Development",
    assignee: "John Doe",
    description: "Finish the frontend and backend integration for the project.",
  },
  {
    id: 2,
    title: "Submit Assignment",
    status: "In Progress",
    deadline: "2024-11-01",
    priority: "Medium",
    notification: "In 2 hours",
    tags: "School",
    assignee: "Jane Smith",
    description: "Submit the math assignment.",
  },
  {
    id: 3,
    title: "Buy Groceries",
    status: "Completed",
    deadline: "2024-10-20",
    priority: "Low",
    notification: "Tomorrow",
    tags: "Personal",
    assignee: "John Doe",
    description: "Buy vegetables, fruits, and bread.",
  },
];

const MyTaskPage = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [sortConfig, setSortConfig] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSort = (column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[column] < b[column]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setTasks(sortedTasks);
    setSortConfig({ key: column, direction });
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  const handleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
    toast.success("Task marked as completed!");
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          My Tasks
        </h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title <FaSort />
              </th>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("deadline")}
              >
                Deadline <FaSort />
              </th>
              <th
                className="p-4 text-left cursor-pointer"
                onClick={() => handleSort("priority")}
              >
                Priority <FaSort />
              </th>
              <th className="p-4 text-left">Notification</th>
              <th className="p-4 text-left">Tags</th>
              <th className="p-4 text-left">Assignee</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-4 text-gray-800 dark:text-white">{task.title}</td>
                <td className="p-4 text-gray-800 dark:text-white">{task.deadline}</td>
                <td className={`p-4 ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </td>
                <td className="p-4 text-gray-800 dark:text-white">{task.notification}</td>
                <td className="p-4 text-gray-800 dark:text-white">{task.tags}</td>
                <td className="p-4 text-gray-800 dark:text-white">{task.assignee}</td>
                <td className="p-4 text-gray-800 dark:text-white">{task.description}</td>
                <td className="p-4 text-gray-800 dark:text-white">{task.status}</td>
                <td className="p-4 flex space-x-2">
                  {task.status !== "Completed" && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                    onClick={() => alert("Edit functionality to be added.")}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-500 font-bold";
    case "Medium":
      return "text-yellow-500 font-bold";
    case "Low":
      return "text-green-500 font-bold";
    default:
      return "";
  }
};

export default MyTaskPage;
