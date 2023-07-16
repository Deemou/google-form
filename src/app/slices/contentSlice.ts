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
  isError: boolean;
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
  questions: [{ ...defaultQuestion, isFocused: false }]
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
    },

    updateTextAnswerAt: (
      state,
      action: PayloadAction<{ index: number; text: string }>
    ) => {
      const { index, text } = action.payload;
      state.questions[index].chosenOptions[0] = text;
    },

    updateRadioOrDropdownAnswerAt: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      const { index, value } = action.payload;
      state.questions[index].chosenOptions[0] = value;
    },

    updateCheckboxAnswerAt: (
      state,
      action: PayloadAction<{ index: number; value: string; checked: boolean }>
    ) => {
      const { index, value, checked } = action.payload;
      if (checked) state.questions[index].chosenOptions.push(value);
      else
        state.questions[index].chosenOptions.splice(
          state.questions[index].chosenOptions.indexOf(value),
          1
        );
    },

    updateEtcInputAt: (
      state,
      action: PayloadAction<{ index: number; etcInput: string }>
    ) => {
      const { index, etcInput } = action.payload;
      state.questions[index].etcInput = etcInput;
    },

    updateErrorStatusAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (
        state.questions[index].isRequired &&
        (state.questions[index].chosenOptions.length === 0 ||
          state.questions[index].chosenOptions[0] === '')
      )
        state.questions[index].isError = true;
      else state.questions[index].isError = false;
    },

    clearAnswerAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.questions[index].chosenOptions = [];
    },

    clearForm: (state) => {
      for (let i = 0; i < state.questions.length; i++) {
        state.questions[i].chosenOptions = [];
        state.questions[i].etcInput = '';
      }
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
  setEtcStatusAt,
  updateTextAnswerAt,
  updateRadioOrDropdownAnswerAt,
  updateCheckboxAnswerAt,
  updateEtcInputAt,
  updateErrorStatusAt,
  clearAnswerAt,
  clearForm
} = contentSlice.actions;

export default contentSlice.reducer;
