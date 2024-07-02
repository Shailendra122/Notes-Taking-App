import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Header from './components/Header';
import { addNote, deleteNote, editNote, setNotes } from './redux/notesSlice';
import { addCategory, setSearchQuery } from './redux/settingsSlice';
import './App.css';
import { nanoid } from '@reduxjs/toolkit';

const App = () => {
  const notes = useSelector((state) => state.notes);
  const categories = useSelector((state) => state.settings.categories);
  const darkMode = useSelector((state) => state.settings.darkMode);
  const searchQuery = useSelector((state) => state.settings.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      dispatch(setNotes(storedNotes));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (newNote) => {
    const noteWithTimestamp = {
      ...newNote,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      title: newNote.text.split(' ').slice(0, 5).join(' ') + '...',
    };
    dispatch(addNote(noteWithTimestamp));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleEditNote = (id, updatedNote) => {
    dispatch(editNote({
      id,
      updatedNote,
    }));
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery) ||
    note.category.toLowerCase().includes(searchQuery)
  );

  const toggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleAddCategory = (newCategory) => {
    dispatch(addCategory(newCategory));
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
