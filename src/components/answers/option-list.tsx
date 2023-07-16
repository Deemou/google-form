import { useAppSelector } from '@/app/hooks';
import Option from './option';
import AddOptionButton from './add-option-button';
import AddEtcButton from './add-etc-button';
import Etc from './etc';
import Checker from '../checker';

interface OptionListProps {
  questionIndex: number;
}

export default function OptionList({ questionIndex }: OptionListProps) {
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { type, optionList, isFocused, hasEtc } = questions[questionIndex];
  return (
    <>
      {optionList.map((option, optionIndex) => (
        <div key={`${questionIndex}_${optionIndex}`} className="option-wrapper">
          <Checker type={type} />
          {isFocused ? (
            <Option
              optionList={optionList}
              option={option}
              questionIndex={questionIndex}
              optionIndex={optionIndex}
            />
          ) : (
            <div className="min-w-0">
              <span aria-label="Option value">{option}</span>
            </div>
          )}
        </div>
      ))}
      {hasEtc && type !== 'dropdown' && <Etc index={questionIndex} />}
      {isFocused && (
        <div className="add-option-bar">
          <Checker type={type} />
          <AddOptionButton index={questionIndex} />
          {!hasEtc && type !== 'dropdown' && (
            <AddEtcButton index={questionIndex} />
          )}
        </div>
      )}
    </>
  );
}
