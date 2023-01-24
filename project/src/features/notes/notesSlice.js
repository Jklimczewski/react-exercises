import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  currNote: {},
  allNotes: []
};
export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setCurrNoteShowingUp: (state, action) => {
      const {id, exId, body, data, atIndex} = action.payload;
      state.currNote = {id: id, exId: exId, body: body, data: data, atIndex: atIndex};
    },
    addNote: (state, action) => {
      const {id, exId, body, data} = action.payload;
      state.allNotes.push({id: id, exId: exId, body: body, data: data});
    },
    updateSingleNote: (state, action) => {
      const {id, exId, body, data, atIndex} = action.payload;
      state.allNotes.splice(atIndex, 0, {id: id, exId: exId, body: body, data: data});
    },
    deleteSingleNote: (state, action) => {
      state.allNotes.splice(action.payload.atIndex, 1);
    },
    deleteAllNotes: (state, action) => {
      const newNotes = state.allNotes.filter(note => note.exId !== action.payload.id);
      state.allNotes = newNotes;
    },
  },
});

export const { setCurrNoteShowingUp, addNote, updateSingleNote, deleteSingleNote, deleteAllNotes } = notesSlice.actions;

export default notesSlice.reducer;
