import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  updateTitle,
  updateDescription,
  setFocusedStatus
} from '@app/slices/infoSlice';
import { setFocusedStatusAt } from '@app/slices/contentSlice';
import { useCallback } from 'react';

export default function FormInfo() {
  const dispatch = useAppDispatch();
  const { title, description, isFocused } = useAppSelector(
    (state) => state.infoSlice
  );
  const { questions } = useAppSelector((state) => state.contentSlice);

  const unfocusAllQuestions = useCallback(() => {
    if (questions.length === 0) return;
    questions.forEach((_, index) => {
      dispatch(setFocusedStatusAt({ index, status: false }));
    });
  }, [questions.length]);

  const onInfoClick = () => {
    if (isFocused) return;
    unfocusAllQuestions();
    dispatch(setFocusedStatus({ status: true }));
  };

  const onTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (title === e.target.innerText) return;
    dispatch(updateTitle({ title: e.target.innerText }));
  };

  const onDescriptionBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (description === e.target.innerText) return;
    dispatch(updateDescription({ description: e.target.innerText }));
  };

  return (
    <>
      <section
        onMouseDown={onInfoClick}
        className={` ${isFocused ? 'focus' : ''}`}
      >
        <div className="form-info">
          {isFocused ? (
            <>
              <div
                onBlur={onTitleBlur}
                contentEditable
                suppressContentEditableWarning={true}
                role="textbox"
                aria-label="Form title"
                className="form-title textbox"
              >
                {title}
              </div>
              <div
                onBlur={onDescriptionBlur}
                contentEditable
                suppressContentEditableWarning={true}
                role="textbox"
                aria-label="Form description"
                className="form-description textbox"
              >
                {description}
              </div>
            </>
          ) : (
            <>
              <span className="form-title">{title || 'Untitled form'}</span>
              <span className="form-description">
                {description || 'Form description'}
              </span>
            </>
          )}
        </div>
      </section>
    </>
  );
}
