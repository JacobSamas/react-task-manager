import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddTaskModal from "../components/AddTaskModal"; 

const dummyTasks = [
  {
    id: 1,
    title: "Complete React Project",
    status: "Pending",
    deadline: "2024-10-30",
    priority: "High",
  },
  {
    id: 2,
    title: "Submit Assignment",
    status: "In Progress",
    deadline: "2024-11-01",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Buy Groceries",
    status: "Completed",
    deadline: "2024-10-20",
    priority: "Low",
  },
];

const Home = ({ darkMode }) => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (task) => {
    const taskToAdd = {
      ...task,
      id: tasks.length + 1,
      status: "Pending",
    };

    setTasks([...tasks, taskToAdd]);
  };

  const tasksOnSelectedDate = tasks.filter(
    (task) =>
      new Date(task.deadline).toISOString().slice(0, 10) ===
      calendarDate.toISOString().slice(0, 10)
  );

  return (
    <div className={`p-6 bg-gray-100 dark:bg-gray-900 min-h-screen`}>
      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addTask={addTask}
      />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Dashboard
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {tasks.length}
          </p>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Tasks Due Today
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {
              tasks.filter(
                (task) =>
                  new Date(task.deadline).toISOString().slice(0, 10) ===
                  new Date().toISOString().slice(0, 10)
              ).length
            }
          </p>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Pending Tasks
          </h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {tasks.filter((task) => task.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Calendar and Task Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Task Calendar
          </h3>
          <Calendar
            value={calendarDate}
            onChange={setCalendarDate}
            tileContent={({ date }) => {
              const taskDates = tasks.map((task) => task.deadline);
              return taskDates.includes(date.toISOString().slice(0, 10)) ? (
                <div className="mt-1 mx-auto w-2 h-2 rounded-full bg-blue-500"></div>
              ) : null;
            }}
          />
        </div>

        {/* Task Previews */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Tasks on {calendarDate.toDateString()}
          </h3>
          {tasksOnSelectedDate.length > 0 ? (
            <ul>
              {tasksOnSelectedDate.map((task) => (
                <li
                  key={task.id}
                  className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-md shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {task.title}
                  </h4>
                  <p className="text-gray-800 dark:text-white">
                    Priority: {task.priority}
                  </p>
                  <p className="text-gray-800 dark:text-white">
                    Status: {task.status}
                  </p>
                  <p className="text-gray-800 dark:text-white">
                    Deadline: {task.deadline}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800 dark:text-white">
              No tasks on this day.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
