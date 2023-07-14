import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  updateTitle,
  updateDescription,
  setFocusedStatus
} from '@app/slices/titleSlice';
import '@styles/style.scss';
import '@styles/form-title.scss';

export default function FormTitleSection() {
  const dispatch = useAppDispatch();
  const { title, description, isFocused } = useAppSelector(
    (state) => state.titleSlice
  );

  const onTitleSectionClick = () => {
    dispatch(setFocusedStatus({ status: true }));
  };

  const onTitleSectionBlur = () => {
    dispatch(setFocusedStatus({ status: false }));
  };

  const onTitleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    dispatch(updateTitle({ title: e.target.innerText }));
  };

  const onDescriptionBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    dispatch(updateDescription({ description: e.target.innerText }));
  };

  return (
    <>
      <section
        onMouseDown={onTitleSectionClick}
        onBlur={onTitleSectionBlur}
        className={`form-title-section ${isFocused ? 'focus' : ''}`}
      >
        {isFocused ? (
          <>
            <div
              placeholder="Form title"
              onBlur={onTitleBlur}
              contentEditable
              suppressContentEditableWarning={true}
              role="textbox"
              className="form-title textbox"
            >
              {title}
            </div>
            <div
              placeholder="Form description"
              onBlur={onDescriptionBlur}
              contentEditable
              suppressContentEditableWarning={true}
              role="textbox"
              className="form-description textbox"
            >
              {description}
            </div>
          </>
        ) : (
          <>
            <h1 className="form-title">{title || 'Untitled form'}</h1>
            <h4 className="form-description">
              {description || 'Form description'}
            </h4>
          </>
        )}
      </section>
    </>
  );
}
