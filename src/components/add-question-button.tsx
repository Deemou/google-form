import { useAppDispatch } from '@/app/hooks';
import {
  addDefaultQuestionAt,
  setFocusedStatusAt
} from '@/app/slices/contentSlice';
import { setFocusedStatus } from '@/app/slices/infoSlice';
import AddIcon from '@/asset/icon/add-icon';

interface AddQuestionButtonProps {
  index?: number;
  isTitle: boolean;
}

export const AddQuestionButton = ({
  index = 0,
  isTitle
}: AddQuestionButtonProps) => {
  const dispatch = useAppDispatch();

  const onClickAddQuestion = () => {
    if (isTitle) {
      dispatch(addDefaultQuestionAt({ index: 0 }));
      dispatch(setFocusedStatus({ status: false }));
    } else {
      dispatch(addDefaultQuestionAt({ index: index + 1 }));
      dispatch(setFocusedStatusAt({ index, status: false }));
    }
  };

  return (
    <button
      onClick={onClickAddQuestion}
      type="button"
      title="Add question"
      aria-label="Add question"
      className="add-question-button"
    >
      <AddIcon />
    </button>
  );
};
