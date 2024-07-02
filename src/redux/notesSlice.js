// src/redux/notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    deleteNote: (state, action) => {
      return state.filter(note => note.id !== action.payload);
    },
    editNote: (state, action) => {
      const { id, updatedNote } = action.payload;
      const note = state.find(note => note.id === id);
      if (note) {
        note.text = updatedNote.text;
        note.title = updatedNote.text.split(' ').slice(0, 5).join(' ') + '...';
        note.category = updatedNote.category;
        note.priority = updatedNote.priority;
      }
    },
    setNotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addNote, deleteNote, editNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
