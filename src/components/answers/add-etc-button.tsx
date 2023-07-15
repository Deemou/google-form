import { useAppDispatch } from '@/app/hooks';
import { setEtcStatusAt } from '@/app/slices/contentSlice';

interface AddOptionButtonProps {
  index: number;
}

export default function AddEtcButton({ index }: AddOptionButtonProps) {
  const dispatch = useAppDispatch();

  const onClickAddEtc = () => {
    dispatch(setEtcStatusAt({ index, status: true }));
  };

  return (
    <>
      <span>or</span>
      <button onClick={onClickAddEtc} type="button">
        Add &quot;Other&quot;
      </button>
    </>
  );
}
