import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { updateErrorStatusAt, clearForm } from '@app/slices/contentSlice';

export default function PreviewButtonBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);

  const onSubmit = () => {
    let isError = false;
    for (let i = 0; i < questions.length; i++) {
      dispatch(updateErrorStatusAt({ index: i }));
      if (
        (questions[i].isRequired && questions[i].chosenOptions.length === 0) ||
        questions[i].chosenOptions[0] === ''
      ) {
        isError = true;
        break;
      }
    }

    if (isError === true) {
      window.alert('Please answer all the required questions!');
      return;
    }
    navigate('/submit');
  };

  const onClickGoBack = () => {
    navigate('/');
  };

  const onClickClearForm = () => {
    dispatch(clearForm());
  };

  return (
    <>
      <div aria-label="Preview button bar" className="preview-button-bar">
        <div className="left">
          <button
            onClick={onSubmit}
            type="submit"
            aria-label="Submit"
            className="submit-button"
          >
            Submit
          </button>
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
