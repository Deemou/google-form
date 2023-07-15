import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  duplicateQuestionAt,
  removeQuestionAt,
  setFocusedStatusAt,
  toggleRequiredAt
} from '@/app/slices/contentSlice';
import DuplicateICon from '@/asset/icon/duplicate-icon';
import TrashbinIcon from '@/asset/icon/trashbin-icon';

interface QuestionSettingProps {
  index: number;
}

export default function QuestionSetting({ index }: QuestionSettingProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { isRequired } = questions[index];

  const onClickDuplicateQuestion = () => {
    dispatch(duplicateQuestionAt({ index }));
    dispatch(setFocusedStatusAt({ index, status: false }));
  };

  const onClickDeleteQuestion = () => {
    dispatch(removeQuestionAt({ index }));
    if (questions.length === 0) return;
    if (index === 0) dispatch(setFocusedStatusAt({ index: 0, status: true }));
    else dispatch(setFocusedStatusAt({ index: index - 1, status: true }));
  };

  const toggleRequired = () => {
    dispatch(toggleRequiredAt({ index }));
  };

  return (
    <>
      <div className="question-setting">
        <button
          onClick={onClickDuplicateQuestion}
          type="button"
          title="Duplicate"
          aria-label="Duplicate Question"
          className="feature-button backlight"
        >
          <DuplicateICon />
        </button>
        <button
          onClick={onClickDeleteQuestion}
          type="button"
          title="Delete"
          aria-label="Delete Question"
          className="feature-button backlight"
        >
          <TrashbinIcon />
        </button>
        <div className="divider-vertical" />
        <div className="required-checkbox">
          <span>Required</span>
          <input
            type="checkbox"
            checked={isRequired}
            onChange={toggleRequired}
          />
        </div>
      </div>
    </>
  );
}
