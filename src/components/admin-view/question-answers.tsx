import { useAppSelector } from '@/app/hooks';
import OptionList from './option-list';

interface QuestionAnswersProps {
  index: number;
}

export default function QuestionAnswers({ index }: QuestionAnswersProps) {
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { type } = questions[index];

  if (type === 'short-answer')
    return (
      <input
        disabled
        placeholder="Short answer text"
        aria-label="Short answer"
        className="short-answer"
      />
    );
  else if (type === 'long-answer')
    return (
      <input disabled placeholder="Long answer text" aria-label="Long answer" />
    );
  else return <OptionList questionIndex={index} />;
}
