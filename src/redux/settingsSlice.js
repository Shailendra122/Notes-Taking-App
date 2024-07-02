// src/redux/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    categories: ['Work', 'Personal', 'Ideas'],
    darkMode: false,
    searchQuery: '',
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
  },
});

export const { addCategory, toggleDarkMode, setSearchQuery } = settingsSlice.actions;
export default settingsSlice.reducer;
