import React, { useState, useEffect } from "react";
import Modal from "./Modal"; 
import { FaRegClock, FaBell, FaFlag, FaTag, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddTaskModal = ({ isOpen, onClose, addTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    deadline: "",
    priority: "Medium",
    notification: "In 1 hour",
    tags: "",
    assignee: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); 

  // Handle form submission
  const handleAddTask = () => {
    const validationErrors = validateFields(newTask);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the validation errors.");
      return;
    }

    addTask(newTask);
    toast.success("Task added successfully!");

    // Reset form and close modal
    setNewTask({
      title: "",
      deadline: "",
      priority: "Medium",
      notification: "In 1 hour",
      tags: "",
      assignee: "",
      description: "",
    });
    setErrors({});
    onClose();
  };

  // Field validation logic
  const validateFields = (task) => {
    const errors = {};
    if (!task.title) errors.title = "Task title is required.";
    if (!task.deadline) errors.deadline = "Deadline is required.";
    if (!task.priority) errors.priority = "Priority is required.";
    return errors;
  };

  // Autofocus on the first invalid field
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
    }
  }, [errors]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Add New Task</h2>

      {/* Task Title */}
      <input
        type="text"
        id="title"
        placeholder="Name of task"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className={`w-full p-3 mb-4 rounded-md border ${
          errors.title
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        } text-lg font-semibold`}
      />
      {errors.title && <p className="text-red-500 mb-4">{errors.title}</p>}

      {/* Date/Day Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaRegClock className="text-gray-500 dark:text-gray-400" />
          <span className="font-semibold dark:text-white">Day</span>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
            onClick={() =>
              setNewTask({ ...newTask, deadline: new Date().toISOString().slice(0, 10) })
            }
          >
            Today
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
            onClick={() =>
              setNewTask({
                ...newTask,
                deadline: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
              })
            }
          >
            Tomorrow
          </button>
          <input
            type="date"
            id="deadline"
            className={`bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm ${
              errors.deadline ? "border-red-500" : ""
            }`}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            value={newTask.deadline}
          />
        </div>
      </div>
      {errors.deadline && <p className="text-red-500 mb-4">{errors.deadline}</p>}

      {/* Notification Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaBell className="text-gray-500 dark:text-gray-400" />
          <span className="font-semibold dark:text-white">Notification</span>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
            onClick={() => setNewTask({ ...newTask, notification: "In 1 hour" })}
          >
            In 1 hour
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
            onClick={() => setNewTask({ ...newTask, notification: "In 2 hours" })}
          >
            In 2 hours
          </button>
          <button
            className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
            onClick={() => setNewTask({ ...newTask, notification: "Custom" })}
          >
            +
          </button>
        </div>
      </div>

      {/* Priority Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaFlag className="text-gray-500 dark:text-gray-400" />
          <span className="font-semibold dark:text-white">Priority</span>
        </div>
        <div>
          <select
            id="priority"
            className={`bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm ${
              errors.priority ? "border-red-500" : ""
            }`}
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Tags Selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaTag className="text-gray-500 dark:text-gray-400" />
          <span className="font-semibold dark:text-white">Tags</span>
        </div>
        <input
          type="text"
          placeholder="Add tags"
          value={newTask.tags}
          onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
        />
      </div>

      {/* Assign Task */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-500 dark:text-gray-400" />
          <span className="font-semibold dark:text-white">Assign</span>
        </div>
        <input
          type="text"
          placeholder="Add assignee"
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
          className="bg-gray-200 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm"
        />
      </div>

      {/* Description */}
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className="w-full p-3 mb-4 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        rows="4"
      ></textarea>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAddTask}
          className="bg-yellow-500 px-4 py-2 rounded-md text-white font-semibold hover:bg-yellow-600"
        >
          Create task
        </button>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
