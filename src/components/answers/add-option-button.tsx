import { useAppDispatch } from '@/app/hooks';
import { addOptionAt } from '@/app/slices/contentSlice';

interface AddOptionButtonProps {
  index: number;
}

export default function AddOptionButton({ index }: AddOptionButtonProps) {
  const dispatch = useAppDispatch();

  const onClickAddOption = () => {
    dispatch(addOptionAt({ index }));
  };

  return (
    <button onClick={onClickAddOption} type="button" className="add-option">
      Add option
    </button>
  );
}
