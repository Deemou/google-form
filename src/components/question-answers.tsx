import { useAppSelector } from '@/app/hooks';
import OptionList from './answers/option-list';

interface QuestionAnswersProps {
  index: number;
}

export default function QuestionAnswers({ index }: QuestionAnswersProps) {
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { type } = questions[index];

  if (type === 'short-answer')
    return <input disabled placeholder="Short answer text" />;
  else if (type === 'long-answer')
    return <input disabled placeholder="Long answer text" />;
  else
    return (
      <div className="option-list-wrapper">
        <OptionList questionIndex={index} />
      </div>
    );
}
