import PreviewIcon from '@/asset/icon/preview-icon';
import { useNavigate } from 'react-router-dom';

export default function PreviewButton() {
  const navigate = useNavigate();

  const onClickPreview = () => {
    navigate('/preview');
  };

  return (
    <button
      onClick={onClickPreview}
      type="button"
      title="Preview"
      aria-label="Preview"
      className="feature-button backlight"
    >
      <PreviewIcon />
    </button>
  );
}
