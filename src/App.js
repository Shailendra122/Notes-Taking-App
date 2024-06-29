import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState(['Work', 'Personal', 'Ideas']);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = (newNote) => {
    const noteWithTimestamp = {
      ...newNote,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title: newNote.text.split(' ').slice(0, 5).join(' ') + '...'
    };
    setNotes([...notes, noteWithTimestamp]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id, updatedNote) => {
    setNotes(notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote, title: updatedNote.text.split(' ').slice(0, 5).join(' ') + '...' } : note
    ));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery) ||
    note.category.toLowerCase().includes(searchQuery)
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto p-8 max-w-[11/12] w-[750px]">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg p-6`}>
          <Header onSearch={handleSearch} onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <NoteForm onSubmit={handleAddNote} categories={categories} onAddCategory={handleAddCategory} />
          <div className="mt-8">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>All Notes</h2>
            <NoteList
              notes={filteredNotes}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
              darkMode={darkMode}
            />
          </div>
          {filteredNotes.length === 0 && <p className="text-center mt-4">No notes found</p>}
        </div>
      </div>
    </div>
  );
};

export default App;