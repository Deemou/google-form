import { useAppSelector } from '@/app/hooks';

interface UserFormInfoProps {
  isSubmit: boolean;
}

export default function UserFormInfo({ isSubmit }: UserFormInfoProps) {
  const { title, description } = useAppSelector((state) => state.infoSlice);

  return (
    <section aria-label="Form info">
      <div className="form-info">
        <span aria-label="Form title" className="form-title">
          {title || 'Untitled form'}
        </span>
        <span aria-label="Form description" className="form-description">
          {description}
        </span>
        <span aria-label="Required question notification" className="required">
          * Indicates required question
        </span>
        {isSubmit && <span>Thanks for your resposne!</span>}
      </div>
    </section>
  );
}
