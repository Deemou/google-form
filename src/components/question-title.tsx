import { useAppDispatch, useAppSelector } from '@app/hooks';
import { updateTitleAt } from '@app/slices/contentSlice';
import QuestionDropdownList from './question-dropdown-list';
import matchType from '@/utils/matchType';
import { useState } from 'react';
import RequiredMark from './required-mark';

interface QuestionTitleProps {
  index: number;
}

export default function QuestionTitle({ index }: QuestionTitleProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { title, type, isFocused, isRequired } = questions[index];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const onTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (title === e.target.innerText) return;
    dispatch(updateTitleAt({ index, title: e.target.innerText }));
  };

  const onDropdownButtonClick = () => {
    setIsDropdownVisible(true);
  };

  return (
    <>
      <div className="question-top">
        {isFocused ? (
          <>
            <div
              onBlur={onTitleBlur}
              contentEditable
              suppressContentEditableWarning={true}
              role="textbox"
              aria-label="Question title"
              className="question-title textbox"
            >
              {title}
            </div>
            <div className="dropdown">
              <button
                onClick={onDropdownButtonClick}
                className="dropdown-button"
              >
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
          </>
        ) : (
          <span className="question-title">
            {title || 'Question'}
            {isRequired && <RequiredMark />}
          </span>
        )}
      </div>
    </>
  );
}
