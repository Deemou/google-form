import matchType from '@/utils/matchType';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { updateTitleAt, changeQuestionType } from '@app/slices/contentSlice';

interface QuestionTitleProps {
  index: number;
}

export default function QuestionTitle({ index }: QuestionTitleProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { title, type, isFocused, isRequired } = questions[index];

  const onTitleBlur = (e: React.FocusEvent<HTMLDivElement>, index: number) => {
    if (title === e.target.innerText) return;
    dispatch(updateTitleAt({ index, title: e.target.innerText }));
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
          {/* <div>Dropdown</div> */}
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
