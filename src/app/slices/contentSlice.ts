import { questionType } from '@/types/formTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQuestion {
  id: string;
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

interface ICounter {
  questionId: number;
}

interface IcontentSlice {
  questions: IQuestion[];
  counter: ICounter;
}

const defaultQuestion: IQuestion = {
  id: '1',
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

const defaultCounter: ICounter = {
  questionId: 2
};

const initialState: IcontentSlice = {
  questions: [{ ...defaultQuestion, isFocused: false }],
  counter: defaultCounter
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
      state.questions.splice(index, 0, {
        ...defaultQuestion,
        id: String(state.counter.questionId)
      });
      state.counter.questionId += 1;
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
        etcInput: '',
        id: String(state.counter.questionId)
      };
      state.counter.questionId += 1;
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
      const question = state.questions[index];
      if (!question.chosenOptions.includes('etc')) {
        if (question.type === 'radio') question.chosenOptions = [];
        question.chosenOptions.push('etc');
      }
      question.etcInput = etcInput;
    },

    updateErrorStatusAt: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      const question = state.questions[index];

      const isOptionEmpty =
        question.chosenOptions.length === 0 || question.chosenOptions[0] === '';
      const isInvalidEtcInput =
        question.chosenOptions[0] === 'etc' && question.etcInput === '';

      if (question.isRequired && (isOptionEmpty || isInvalidEtcInput))
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
    },

    moveQuestion: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      state.questions.splice(
        newIndex < 0 ? state.questions.length + newIndex : newIndex,
        0,
        state.questions.splice(oldIndex, 1)[0]
      );
    },

    moveOption: (
      state,
      action: PayloadAction<{
        questionIndex: number;
        oldIndex: number;
        newIndex: number;
      }>
    ) => {
      const { questionIndex, oldIndex, newIndex } = action.payload;
      const optionList = state.questions[questionIndex].optionList;
      optionList.splice(
        newIndex < 0 ? optionList.length + newIndex : newIndex,
        0,
        optionList.splice(oldIndex, 1)[0]
      );
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
  clearForm,
  moveQuestion,
  moveOption
} = contentSlice.actions;

export default contentSlice.reducer;
