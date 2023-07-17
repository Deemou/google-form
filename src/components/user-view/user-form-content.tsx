import { useAppSelector } from '@/app/hooks';
import UserQuestion from './user-question';

export default function UserFormContent() {
  const { questions } = useAppSelector((state) => state.contentSlice);

  return (
    <section aria-label="Form content">
      {questions.map((_, index) => {
        return <UserQuestion key={`user_question_${index}`} index={index} />;
      })}
    </section>
  );
}
