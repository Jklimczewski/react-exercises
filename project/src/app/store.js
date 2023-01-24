import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/exercises/exercisesSlice';
import notesReducer from '../features/notes/notesSlice';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    exercise: exercisesReducer,
    note: notesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
