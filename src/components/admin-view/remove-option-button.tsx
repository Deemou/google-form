import XIcon from '@/asset/icon/x-icon';

interface RemoveOptionButtonProps {
  onClickRemove: () => void;
}

export default function RemoveOptionButton({
  onClickRemove
}: RemoveOptionButtonProps) {
  return (
    <button
      onClick={onClickRemove}
      type="button"
      title="Remove"
      aria-label="Remove option"
      className="remove-option-btn"
    >
      <XIcon />
    </button>
  );
}
