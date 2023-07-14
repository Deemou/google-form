import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItitleSlice {
  title: string;
  description: string;
}

const initialState: ItitleSlice = {
  title: 'Untitled form',
  description: ''
};

const titleSlice = createSlice({
  name: 'titleSlice',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      state.title = title;
    },
    updateDescription: (
      state,
      action: PayloadAction<{ description: string }>
    ) => {
      const { description } = action.payload;
      state.description = description;
    }
  }
});

export const { updateTitle, updateDescription } = titleSlice.actions;

export default titleSlice.reducer;
