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
    const radios = document.querySelectorAll('input[type=radio]');
    for (let i = 0; i < radios.length; i++) {
      const radio = radios[i] as HTMLInputElement;
      radio.checked = false;
    }
  };

  return (
    <>
      {optionList.map((option, optionIndex) => (
        <div key={`radio_${optionIndex}`} className="option">
          <input
            id={String(optionIndex)}
            onChange={onChangeRadioAnswer}
            type="radio"
            value={option}
            name="radio"
            checked={chosenOptions[0] === option}
          />
          <label htmlFor={String(optionIndex)}>{option}</label>
        </div>
      ))}
      {hasEtc && (
        <div className="option">
          <input
            id="etc"
            onChange={onChangeRadioAnswer}
            type="radio"
            value="etc"
            name="radio"
            checked={chosenOptions[0] === 'etc'}
          />
          <label htmlFor="etc">Other: </label>
          <input onChange={onChangeEtcInput} type="text" value={etcInput} />
        </div>
      )}
      {!isRequired && chosenOptions.length !== 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClearAnswer}
            type="button"
            className="clear-button"
          >
            Clear selection
          </button>
        </div>
      )}
    </>
  );
}
