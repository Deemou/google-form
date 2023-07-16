import { useAppDispatch } from '@/app/hooks';
import { clearForm } from '@app/slices/contentSlice';

export default function PreviewButtonBar() {
  const dispatch = useAppDispatch();

  const onClickClearForm = () => {
    dispatch(clearForm());
  };

  return (
    <>
      <div aria-label="Preview button bar" className="preview-button-bar">
        <button
          onClick={onClickClearForm}
          type="button"
          aria-label="Clear form"
        >
          Clear Form
        </button>
      </div>
    </>
  );
}
