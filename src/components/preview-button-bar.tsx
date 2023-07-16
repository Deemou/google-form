import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { clearForm } from '@app/slices/contentSlice';

export default function PreviewButtonBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickGoBack = () => {
    navigate('/');
  };

  const onClickClearForm = () => {
    dispatch(clearForm());
  };

  return (
    <>
      <div aria-label="Preview button bar" className="preview-button-bar">
        <div>
          <button
            onClick={onClickGoBack}
            type="button"
            aria-label="Go back"
            className="go-back-button"
          >
            Go back
          </button>
        </div>
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
