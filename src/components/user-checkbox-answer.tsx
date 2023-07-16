import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateErrorStatusAt,
  updateCheckboxAnswerAt,
  updateEtcInputAt
} from '@/app/slices/contentSlice';

interface UserCheckboxAnswer {
  index: number;
}

export default function UserCheckboxAnswer({ index }: UserCheckboxAnswer) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { optionList, chosenOptions, hasEtc, etcInput } = questions[index];

  const onChangeCheckboxAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCheckboxAnswerAt({
        index,
        value: e.target.value,
        checked: e.target.checked
      })
    );
    dispatch(updateErrorStatusAt({ index }));
  };
  const onChangeEtcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEtcInputAt({ index, etcInput: e.target.value }));
    dispatch(updateErrorStatusAt({ index }));
  };

  return (
    <>
      {optionList.map((option, optionIndex) => (
        <div
          key={`check_${optionIndex}`}
          aria-label="Option"
          className="option"
        >
          <input
            id={String(optionIndex)}
            onChange={onChangeCheckboxAnswer}
            type="checkbox"
            value={option}
            checked={chosenOptions.includes(option)}
            aria-label="Option"
          />
          <div className="min-w-0">
            <label htmlFor={String(optionIndex)} aria-label="Option value">
              {option}
            </label>
          </div>
        </div>
      ))}
      {hasEtc && (
        <div aria-label="Other option" className="option">
          <input
            id="etc"
            onChange={onChangeCheckboxAnswer}
            type="checkbox"
            value="etc"
            checked={chosenOptions.includes('etc')}
            aria-label="Other option"
          />
          <label htmlFor="etc">Other: </label>
          <input
            type="text"
            value={etcInput}
            onChange={onChangeEtcInput}
            aria-label="Other answer"
          />
        </div>
      )}
    </>
  );
}
