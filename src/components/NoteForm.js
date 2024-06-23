import React, { useState } from 'react';

const NoteForm = ({ onSubmit }) => {
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ text: note, tags: tags.split(',').map((tag) => tag.trim()) });
    setNote('');
    setTags('');
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full p-3 text-lg border rounded mb-4 shadow-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <input
        type="text"
        className="w-full p-3 text-lg border rounded mb-4 shadow-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter tags, separated by commas"
        value={tags}
        required
        onChange={(event) => setTags(event.target.value)}
      />
      <button
        type="submit"
        className="w-[120px] ml-[220px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
      >
        Add Notes
      </button>
    </form>
  );
};

export default NoteForm;
