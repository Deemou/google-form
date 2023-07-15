import { useAppDispatch } from '@/app/hooks';
import { changeQuestionType } from '@/app/slices/contentSlice';
import { questionType } from '@/types/formTypes';
import getQuestionTypeList from '@/utils/getQuestionTypeList';
import matchType from '@/utils/matchType';
import { useCallback, useEffect, useRef } from 'react';

interface QuestionDropdownListProps {
  index: number;
  type: questionType;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function QuestionDropdownList({
  index,
  type,
  setIsDropdownVisible
}: QuestionDropdownListProps) {
  const dispatch = useAppDispatch();
  const dropdownListRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (!dropdownListRef.current) return;
    if (dropdownListRef.current.contains(e.target as Node)) return;
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    // 동일한 클릭 이벤트로 인해 이벤트 리스너가 즉시 실행되는 것을 방지
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onListClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDropdownVisible(false);

    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('question-dropdown-item')) return;
    if (!target.dataset.key) return;
    if (target.dataset.key === type) return;

    dispatch(
      changeQuestionType({ index, type: target.dataset.key as questionType })
    );
  }, []);

  return (
    <div
      onClick={onListClick}
      ref={dropdownListRef}
      className="question-dropdown-list"
    >
      {getQuestionTypeList().map((v) => (
        <button
          key={v}
          data-key={v}
          className={`question-dropdown-item ${v === type ? 'highlight' : ''}`}
        >
          {matchType(v)}
        </button>
      ))}
    </div>
  );
}
