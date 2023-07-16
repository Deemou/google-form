import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  clearAnswerAt,
  updateErrorStatusAt,
  updateRadioOrDropdownAnswerAt
} from '@/app/slices/contentSlice';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UserDropdownAnswer {
  index: number;
}

export default function UserDropdownAnswer({ index }: UserDropdownAnswer) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { optionList, chosenOptions } = questions[index];

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownListRef = useRef<HTMLDivElement | null>(null);

  const onDropdownButtonClick = () => {
    setIsDropdownVisible(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownListRef.current) return;
    if (dropdownListRef.current.contains(e.target as Node)) return;
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    // 동일한 클릭 이벤트로 인해 이벤트 리스너가 즉시 실행되는 것을 방지
    if (!isDropdownVisible) return;
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 1);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownVisible]);

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

  const clearAnswer = () => {
    dispatch(clearAnswerAt({ index }));
    dispatch(updateErrorStatusAt({ index }));
  };

  return (
    <>
      <div className="dropdown">
        <button onClick={onDropdownButtonClick} className="dropdown-button">
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
