import { useAppDispatch } from '@/app/hooks';
import { changeNthOptionAt, removeOptionAt } from '@/app/slices/contentSlice';
import RemoveOptionButton from '../remove-option-button';

interface OptionProps {
  optionList: string[];
  option: string;
  questionIndex: number;
  optionIndex: number;
}

export default function Option({
  optionList,
  option,
  questionIndex,
  optionIndex
}: OptionProps) {
  const dispatch = useAppDispatch();

  const onChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeNthOptionAt({
        questionIndex,
        optionIndex,
        option: e.target.value
      })
    );
  };

  const onClickRemoveOption = () => {
    dispatch(removeOptionAt({ questionIndex, optionIndex }));
  };

  return (
    <div aria-label="Option" className="option">
      <input
        value={option}
        aria-label="Option"
        onChange={onChangeOption}
        className="option-input"
      />
      {optionList.length > 1 && (
        <RemoveOptionButton onClickRemove={onClickRemoveOption} />
      )}
    </div>
  );
}
