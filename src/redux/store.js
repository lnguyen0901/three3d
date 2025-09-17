import { configureStore, createSlice } from '@reduxjs/toolkit';

const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    selectedObjects: [],
  },
  reducers: {
    toggleObjectSelection: (state, action) => {
      const { objectName } = action.payload;
      const index = state.selectedObjects.indexOf(objectName);
      if (index === -1) {
        state.selectedObjects.push(objectName);
      } else {
        state.selectedObjects.splice(index, 1);
      }
    },
    clearSelection: (state) => {
      state.selectedObjects = [];
    },
  },
});

export const { toggleObjectSelection, clearSelection } = selectionSlice.actions;

export const store = configureStore({
  reducer: {
    selection: selectionSlice.reducer,
  },
});