import { useAppSelector } from '@/app/hooks';

export default function UserFormInfo() {
  const { title, description } = useAppSelector((state) => state.infoSlice);

  return (
    <section>
      <div className="form-info">
        <span className="form-title">{title || 'Untitled form'}</span>
        <span className="form-description">{description}</span>
      </div>
    </section>
  );
}
