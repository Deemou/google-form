import XIcon from '@/asset/icon/x-icon';

interface RemoveOptionButtonProps {
  onClickRemove: () => void;
}

export default function RemoveOptionButton({
  onClickRemove
}: RemoveOptionButtonProps) {
  return (
    <button onClick={onClickRemove} className="remove-option-btn">
      <XIcon />
    </button>
  );
}
