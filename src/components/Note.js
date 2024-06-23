import React, { useState } from 'react';

const Note = ({ note, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(note.text);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewText(note.text);
  };

  const handleUpdateNote = () => {
    onEdit(note.id, newText);
    setEditMode(false);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white relative">
      {!editMode ? (
        <div>
          <h2 className="text-lg font-medium text-gray-800">{note.text}</h2>
          <div className="flex flex-wrap mt-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-sm mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute top-0 right-0 m-2 p-1 text-gray-500 hover:text-gray-700">
            <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleEditClick}>
                Edit
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => onDelete(note.id)}>
                Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="absolute top-0 right-0 mt-4 mr-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleUpdateNote}
            >
              Save
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
