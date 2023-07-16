import DropdownIcon from '@/asset/icon/dropdown-icon';
import { questionType } from '@/types/formTypes';

interface CheckerProps {
  type: questionType;
}

export default function Checker({ type }: CheckerProps) {
  return (
    <div className="checker">
      {type === 'radio' && <input type="radio" disabled />}
      {type === 'checkboxes' && <input type="checkbox" disabled />}
      {type === 'dropdown' && <DropdownIcon />}
    </div>
  );
}
