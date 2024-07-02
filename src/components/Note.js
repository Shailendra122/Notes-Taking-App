import React, { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/solid';

const Note = ({ note, onDelete, onEdit, darkMode }) => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(note.text);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewText(note.text);
  };

  const handleUpdateNote = () => {
    onEdit(note.id, { text: newText });
    setEditMode(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const toggleImageZoom = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  return (
    <div className={`p-4 border rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} relative mb-4`}>
      {!editMode ? (
        <div>
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{note.title}</h2>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{note.text}</p>
          {note.image && (
            <div className="mt-4 relative">
              <img
                src={note.image}
                alt="Note"
                className={`cursor-pointer transition-all duration-300 ease-in-out ${
                  isImageZoomed
                    ? 'fixed top-0 left-0 w-full h-full object-contain z-50 bg-black bg-opacity-75'
                    : 'w-32 h-32 object-cover rounded'
                }`}
                onClick={toggleImageZoom}
              />
              {isImageZoomed && (
                <div
                  className="fixed top-0 left-0 w-full h-full z-40"
                  onClick={toggleImageZoom}
                ></div>
              )}
            </div>
          )}
          <div className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Category: {note.category}
          </div>
          <div className={`flex items-center mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            <ClockIcon className="h-4 w-4 mr-1" />
            {formatDate(note.createdAt)}
          </div>
          <div className={`flex items-center mt-2 text-sm ${getPriorityColor(note.priority)}`}>
            Priority: {note.priority}
          </div>
          <div className="absolute top-0 right-0 m-2 p-1 text-gray-500 hover:text-gray-700 flex">
            <button className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded mr-2 flex items-center`} onClick={handleEditClick}>
              <PencilIcon className="h-5 w-3 mr-2" />
              Edit
            </button>
            <button className={`${darkMode ? 'bg-white hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800 font-bold py-2 px-4 rounded flex items-center mr-2`} onClick={() => onDelete(note.id)}>
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className='flex space-x-2'>
          <textarea
            className={`w-full p-2 border rounded focus:outline-none ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows="3"
          />
          <div className=" top-0 right-0 mt-0 mb-10 mr-2 flex">
            <button
              className={`${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 mt-1 rounded mr-2 flex items-center`}
              onClick={handleUpdateNote}
            >
              <CheckIcon className="h-5 w-5 mr-4" />
              Save
            </button>
            <button
              className={`${darkMode ? 'bg-white hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-800'} text-gray-800 hover:text-white font-bold py-2 px-4 mr-4 mt-1 rounded flex items-center`}
              onClick={handleCancelEdit}
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;