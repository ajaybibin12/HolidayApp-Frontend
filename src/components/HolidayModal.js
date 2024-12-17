import React from "react";

const HolidayModal = ({ holiday, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">{holiday.name}</h2>
        <p className="text-gray-700 mb-1">
          <strong>Date:</strong> {holiday.date}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Type:</strong> {holiday.type || "General Holiday"}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {holiday.description || "N/A"}
        </p>

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HolidayModal;
