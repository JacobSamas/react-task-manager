import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400"
          onClick={onClose}
        >
          &times; 
        </button>
        {children} 
      </div>
    </div>
  );
};

export default Modal;
