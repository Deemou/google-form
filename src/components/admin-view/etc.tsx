import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setEtcStatusAt } from '@/app/slices/contentSlice';
import RemoveOptionButton from './remove-option-button';
import Checker from '../checker';

interface EtcProps {
  index: number;
}

export default function Etc({ index }: EtcProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { type, isFocused } = questions[index];

  const onClickRemoveEtc = () => {
    dispatch(setEtcStatusAt({ index, status: false }));
  };

  return (
    <div className="option-wrapper">
      <Checker type={type} />
      <div className="option">
        {isFocused ? (
          <input
            disabled
            value="Other..."
            aria-label="Other option"
            className="option-input"
          />
        ) : (
          <span>Other...</span>
        )}
        {isFocused && <RemoveOptionButton onClickRemove={onClickRemoveEtc} />}
      </div>
    </div>
  );
}
