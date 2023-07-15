import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinfoSlice {
  title: string;
  description: string;
  isFocused: boolean;
}

const initialState: IinfoSlice = {
  title: 'Untitled form',
  description: '',
  isFocused: false
};

const infoSlice = createSlice({
  name: 'infoSlice',
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
  infoSlice.actions;

export default infoSlice.reducer;
