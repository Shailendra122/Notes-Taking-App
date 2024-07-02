// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import settingsReducer from './settingsSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    settings: settingsReducer,
  },
});

export default store;
