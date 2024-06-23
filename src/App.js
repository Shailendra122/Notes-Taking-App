import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleAddNote = (newNote) => {
    setNotes([...notes, { id: Date.now(), ...newNote }]);
    setFilteredNotes([...notes, { id: Date.now(), ...newNote }]);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  const handleEditNote = (id, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  const handleSearch = (tagQuery) => {
    if (tagQuery.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.tags.some((tag) => tag.toLowerCase().includes(tagQuery.toLowerCase()))
      );
      setFilteredNotes(filtered);
    }
  };
  

  return (
    <div className="container mx-auto p-8 max-w-[11/12] w-[650px]">
      <Header onSearch={handleSearch} />
      <NoteForm onSubmit={handleAddNote} />
      <NoteList notes={filteredNotes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
    </div>
  );
};

export default App;
