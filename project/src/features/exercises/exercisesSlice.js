import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  currEx: {},
  allEx: []
};
export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setCurrExShowingUp: (state, action) => {
      const {id, exercise, weight, atIndex} = action.payload;
      state.currEx = {id: id, exercise: exercise, weight: weight, atIndex: atIndex};
    },
    addEx: (state, action) => {
      const {id, exercise, weight, date} = action.payload;
      state.allEx.push({id: id, exercise: exercise, weight: weight, date: date});
    },
    updateSingleEx: (state, action) => {
      const {id, exercise, weight, atIndex, date} = action.payload;
      state.allEx.splice(atIndex, 0, {id: id, exercise: exercise, weight: weight, date: date});
    },
    deleteSingleEx: (state, action) => {
      state.allEx.splice(action.payload.atIndex, 1);
    },
  },
});

export const { setCurrExShowingUp, addEx, updateSingleEx, deleteSingleEx } = exercisesSlice.actions;

export default exercisesSlice.reducer;
