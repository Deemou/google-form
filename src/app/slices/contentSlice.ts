import { questionType } from '@/types/formTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQuestion {
  title: string;
  type: questionType;
  optionList: string[];
  hasEtc: boolean;
  isRequired: boolean;
  isFocused: boolean;
  chosenOptions: string[];
  etcInput: string;
  isError: false;
}

interface IcontentSlice {
  questions: IQuestion[];
}

const defaultQuestion: IQuestion = {
  title: 'Question',
  type: 'radio',
  optionList: ['Option 1'],
  hasEtc: false,
  isRequired: false,
  isFocused: true,
  chosenOptions: [],
  etcInput: '',
  isError: false
};
const initialState: IcontentSlice = {
  questions: [defaultQuestion]
};

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    updateTitleAt: (
      state,
      action: PayloadAction<{ index: number; title: string }>
    ) => {
      const { title, index } = action.payload;
      state.questions[index].title = title;
    },

    changeQuestionType: (
      state,
      action: PayloadAction<{ index: number; type: questionType }>
    ) => {
      const { index, type } = action.payload;
      state.questions[index].type = type;
    },

    changeNthOptionAt: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        optionIndex: number;
        option: string;
      }>
    ) => {
      const { questionIndex, optionIndex, option } = action.payload;
      state.questions[questionIndex].optionList[optionIndex] = option;
    },

    addDefaultQuestionAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.questions.splice(index, 0, defaultQuestion);
    },

    removeQuestionAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },

    duplicateQuestionAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const duplicatedQuestion = {
        ...state.questions[index],
        chosenOptions: [],
        etcInput: ''
      };
      state.questions.splice(index + 1, 0, duplicatedQuestion);
    },

    addOptionAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.questions[index].optionList.push(
        `Option ${state.questions[index].optionList.length + 1}`
      );
    },

    removeOptionAt: (
      state,
      action: PayloadAction<{ questionIndex: number; optionIndex: number }>
    ) => {
      const { questionIndex, optionIndex } = action.payload;
      state.questions[questionIndex].optionList.splice(optionIndex, 1);
    },

    toggleRequiredAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.questions[index].isRequired = !state.questions[index].isRequired;
    },

    setFocusedStatusAt: (
      state,
      action: PayloadAction<{ index: number; status: boolean }>
    ) => {
      const { index, status } = action.payload;
      state.questions[index].isFocused = status;
    },

    setEtcStatusAt: (
      state,
      action: PayloadAction<{ index: number; status: boolean }>
    ) => {
      const { index, status } = action.payload;
      state.questions[index].hasEtc = status;
    }
  }
});

export const {
  updateTitleAt,
  changeQuestionType,
  changeNthOptionAt,
  addDefaultQuestionAt,
  removeQuestionAt,
  duplicateQuestionAt,
  addOptionAt,
  removeOptionAt,
  toggleRequiredAt,
  setFocusedStatusAt,
  setEtcStatusAt
} = contentSlice.actions;

export default contentSlice.reducer;
