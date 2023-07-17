import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  clearAnswerAt,
  updateErrorStatusAt,
  updateRadioOrDropdownAnswerAt
} from '@/app/slices/contentSlice';
import DropdownIcon from '@/asset/icon/dropdown-icon';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UserDropdownAnswer {
  index: number;
}

export default function UserDropdownAnswer({ index }: UserDropdownAnswer) {
  const dispatch = useAppDispatch();
  const { isSubmit } = useAppSelector((state) => state.infoSlice);
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
      {!isSubmit && (
        <div className="dropdown">
          <button
            onClick={onDropdownButtonClick}
            type="button"
            aria-label="Dropdown button"
            className="dropdown-button"
          >
            {chosenOptions[0] || 'Choose'}
            <DropdownIcon />
          </button>
          {isDropdownVisible && (
            <div
              onClick={onListClick}
              ref={dropdownListRef}
              role="listbox"
              aria-label="Dropdown list"
              className="dropdown-list"
            >
              {[{ id: `${index}_default`, value: 'Choose' }, ...optionList].map(
                (option) => (
                  <button
                    key={option.id}
                    data-key={option.value}
                    type="button"
                    aria-label="Dropdown item"
                    className={`dropdown-item ${
                      option.value === chosenOptions[0] ? 'highlight' : ''
                    }`}
                  >
                    {option.value}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      )}
      {isSubmit && (
        <div className="dropdown">
          <div aria-label="chosen option" className="dropdown-button">
            {chosenOptions[0] || 'Choose'}
            <DropdownIcon />
          </div>
        </div>
      )}
    </>
  );
}
