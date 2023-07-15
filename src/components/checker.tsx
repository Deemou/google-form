import { questionType } from '@/types/formTypes';

interface CheckerProps {
  type: questionType;
}

export default function Checker({ type }: CheckerProps) {
  return (
    <div className="checker">
      {type === 'radio' && <input type="radio" disabled />}
      {type === 'checkboxes' && <input type="checkbox" disabled />}
      {type === 'dropdown' && (
        <svg
          width="20px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <rect x="0" fill="none" width="24" height="24"></rect>{' '}
            <g>
              {' '}
              <path d="M7 10l5 5 5-5"></path>{' '}
            </g>{' '}
          </g>
        </svg>
      )}
    </div>
  );
}
