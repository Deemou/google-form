import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  clearAnswerAt,
  updateErrorStatusAt,
  updateRadioOrDropdownAnswerAt
} from '@/app/slices/contentSlice';
import { useCallback, useRef, useState } from 'react';

interface UserDropdownAnswer {
  index: number;
}

export default function UserDropdownAnswer({ index }: UserDropdownAnswer) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { optionList, chosenOptions } = questions[index];

  const clearAnswer = () => {
    dispatch(clearAnswerAt({ index }));
    dispatch(updateErrorStatusAt({ index }));
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownListRef = useRef<HTMLDivElement | null>(null);
  const onDropdownButtonClick = () => {
    setIsDropdownVisible(true);
  };
  const onListClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDropdownVisible(false);

    // 부모 컴포넌트에 이벤트 위임
    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('dropdown-item')) return;
    if (!target.dataset.key) return;
    if (target.dataset.key === chosenOptions[0]) return;
    if (target.dataset.key === 'Choose') {
      clearAnswer();
      return;
    }

    dispatch(
      updateRadioOrDropdownAnswerAt({ index, value: target.dataset.key })
    );
  }, []);

  return (
    <>
      <div className="dropdown">
        <button onClick={onDropdownButtonClick}>
          {chosenOptions[0] || 'Choose'}
        </button>
        {isDropdownVisible && (
          <div
            onClick={onListClick}
            ref={dropdownListRef}
            className="dropdown-list"
          >
            {['Choose', ...optionList].map((option) => (
              <button
                key={option}
                data-key={option}
                className={`dropdown-item ${
                  option === chosenOptions[0] ? 'highlight' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
