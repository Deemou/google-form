import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateErrorStatusAt,
  updateRadioOrDropdownAnswerAt,
  updateEtcInputAt,
  clearAnswerAt
} from '@/app/slices/contentSlice';

interface UserRadioAnswerProps {
  index: number;
}

export default function UserRadioAnswer({ index }: UserRadioAnswerProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { isRequired, optionList, chosenOptions, hasEtc, etcInput } =
    questions[index];

  const onChangeRadioAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateRadioOrDropdownAnswerAt({
        index,
        value: e.target.value
      })
    );
    dispatch(updateErrorStatusAt({ index }));
  };

  const onChangeEtcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEtcInputAt({ index, etcInput: e.target.value }));
    dispatch(updateErrorStatusAt({ index }));
  };

  const onClearAnswer = () => {
    dispatch(clearAnswerAt({ index }));
  };

  return (
    <>
      {optionList.map((option, optionIndex) => (
        <div
          key={`radio_${optionIndex}`}
          aria-label="Option"
          className="option"
        >
          <input
            id={String(optionIndex)}
            onChange={onChangeRadioAnswer}
            type="radio"
            value={option}
            name={`question_${index}`}
            checked={chosenOptions[0] === option}
            aria-label="Option"
          />
          <div className="min-w-0">
            <label aria-label="Option value" htmlFor={String(optionIndex)}>
              {option}
            </label>
          </div>
        </div>
      ))}
      {hasEtc && (
        <div aria-label="Other option" className="option">
          <input
            id="etc"
            onChange={onChangeRadioAnswer}
            type="radio"
            value="etc"
            name={`question_${index}`}
            checked={chosenOptions[0] === 'etc'}
            aria-label="Other option"
          />
          <label htmlFor="etc">Other: </label>
          <input
            onChange={onChangeEtcInput}
            type="text"
            value={etcInput}
            aria-label="Other answer"
          />
        </div>
      )}
      {!isRequired && chosenOptions.length !== 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClearAnswer}
            type="button"
            aria-label="Clear selection"
            className="clear-button"
          >
            Clear selection
          </button>
        </div>
      )}
    </>
  );
}
