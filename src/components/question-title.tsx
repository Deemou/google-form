import { useAppDispatch, useAppSelector } from '@app/hooks';
import { updateTitleAt } from '@app/slices/contentSlice';
import QuestionDropdownList from './question-dropdown-list';
import matchType from '@/utils/matchType';
import { useState } from 'react';

interface QuestionTitleProps {
  index: number;
}

export default function QuestionTitle({ index }: QuestionTitleProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { title, type, isFocused, isRequired } = questions[index];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const onTitleBlur = (e: React.FocusEvent<HTMLDivElement>, index: number) => {
    if (title === e.target.innerText) return;
    dispatch(updateTitleAt({ index, title: e.target.innerText }));
  };

  const onDropdownButtonClick = () => {
    setIsDropdownVisible(true);
  };

  return (
    <>
      {isFocused ? (
        <div className="question-top">
          <div
            onBlur={(e) => onTitleBlur(e, index)}
            contentEditable
            suppressContentEditableWarning={true}
            role="textbox"
            aria-label="Question title"
            className="question-title textbox"
          >
            {title}
          </div>
          <div className="question-dropdown">
            <button onClick={onDropdownButtonClick}>
              <span>{matchType(type)}</span>
            </button>
            {isDropdownVisible && (
              <QuestionDropdownList
                index={index}
                type={type}
                setIsDropdownVisible={setIsDropdownVisible}
              />
            )}
          </div>
        </div>
      ) : (
        <span className="question-title">
          {title || 'Question'}
          {isRequired && <span className="required">*</span>}
        </span>
      )}
    </>
  );
}
