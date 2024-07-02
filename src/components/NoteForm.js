import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSlice';
import { addCategory } from '../redux/settingsSlice';

const NoteForm = ({ categories, onAddCategory }) => {
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState('');
  const [notePriority, setNotePriority] = useState('');
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote = {
      text: noteText,
      category: noteCategory,
      priority: notePriority,
      createdAt: new Date().toISOString(),
      id: Date.now(),
      image: image,
      title: noteText.split(' ').slice(0, 5).join(' ') + '...',
    };

    dispatch(addNote(newNote));
    setNoteText('');
    setNoteCategory(categories[0]);
    setNotePriority('medium');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCategoryChange = (e) => {
    setNoteCategory(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setNotePriority(e.target.value);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
   
    if (noteCategory) {
      dispatch(addCategory(noteCategory));
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className='mb-2 space-x-4'>
        <input
          type="text"
          placeholder="New category"
          value={noteCategory}
          onChange={(e) => setNoteCategory(e.target.value)}
          className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </div>


      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        rows="4"
        placeholder="Write your note here..."
      />
      <div className="flex space-x-4">

        <div className="flex space-x-4">


          <select
            value={noteCategory}
            onChange={handleCategoryChange}
            className=" p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value="" disabled hidden>
              Choose Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={notePriority}
            onChange={handlePriorityChange}
            className=" p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value="" disabled hidden>
              Choose Priority
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={fileInputRef}
          />
        </div>

      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded shadow-sm hover:bg-blue-600">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
