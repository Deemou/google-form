import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateErrorStatusAt,
  updateTextAnswerAt
} from '@/app/slices/contentSlice';
import RequiredMark from './required-mark';
import UserRadioAnswer from './user-radio-answer';
import UserCheckboxAnswer from './user-checkbox-answer';
import UserDropdownAnswer from './user-dropdown-answer';

interface UserQuestion {
  index: number;
}
export default function UserQuestion({ index }: UserQuestion) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { title, type, isRequired, isError, chosenOptions } = questions[index];

  const onBlurShortAnswer = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(updateTextAnswerAt({ index, text: e.target.value }));
    dispatch(updateErrorStatusAt({ index }));
  };

  const onBlurLongAnswer = (e: React.FocusEvent<HTMLDivElement>) => {
    dispatch(updateTextAnswerAt({ index, text: e.target.innerText }));
    dispatch(updateErrorStatusAt({ index }));
  };

  return (
    <div aria-label="Question" className="question">
      <span className="question-title">
        {title}
        {isRequired && <RequiredMark />}
      </span>
      {type === 'short-answer' && (
        <input
          onBlur={onBlurShortAnswer}
          placeholder="Your answer"
          aria-label="Short answer"
          className="short-answer"
        />
      )}
      {type === 'long-answer' && (
        <div
          onBlur={onBlurLongAnswer}
          placeholder="Your answer"
          contentEditable
          suppressContentEditableWarning={true}
          role="textbox"
          aria-label="Long answer"
          className="textbox"
        >
          {chosenOptions[0]}
        </div>
      )}
      {type === 'radio' && <UserRadioAnswer index={index} />}
      {type === 'checkboxes' && <UserCheckboxAnswer index={index} />}
      {type === 'dropdown' && <UserDropdownAnswer index={index} />}
      {isError && (
        <span aria-label="Required question notification" className="required">
          This is a required question
        </span>
      )}
    </div>
  );
}
