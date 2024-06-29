import React, { useState, useRef } from 'react';

const NoteForm = ({ onSubmit, categories, onAddCategory }) => {
  const [note, setNote] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState('medium');
  const [image, setImage] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      text: note,
      category,
      priority,
      image,
    });
    setNote('');
    setCategory(categories[0]);
    setPriority('medium');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      onAddCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>

      <div className='mb-2 space-x-4'>
        <input
            type="text"
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
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
        className="w-full p-3 text-lg border rounded mb-4 shadow-md focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="Enter your note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        rows="3"
        required
      />
      <div className="flex space-x-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
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
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;