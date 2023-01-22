import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/exercises/exercisesSlice';
import notesReducer from '../features/notes/notesSlice';


export const store = configureStore({
  reducer: {
    exercise: exercisesReducer,
    note: notesReducer
  },
});
