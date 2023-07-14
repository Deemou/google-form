import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItitleSlice {
  title: string;
  description: string;
  isFocused: boolean;
}

const initialState: ItitleSlice = {
  title: 'Untitled form',
  description: '',
  isFocused: false
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
    },
    setFocusedStatus: (state, action: PayloadAction<{ status: boolean }>) => {
      const { status } = action.payload;
      state.isFocused = status;
    }
  }
});

export const { updateTitle, updateDescription, setFocusedStatus } =
  titleSlice.actions;

export default titleSlice.reducer;
