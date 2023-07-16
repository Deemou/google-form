import { AddQuestionButton } from './add-question-button';
import QuestionAnswers from './question-answers';
import QuestionSetting from './question-setting';
import QuestionTitle from './question-title';

interface QuestionProps {
  index: number;
  isFocused: boolean;
  onClickQuestion: (index: number) => void;
}

export default function Question({
  index,
  isFocused,
  onClickQuestion
}: QuestionProps) {
  return (
    <div
      onClick={() => onClickQuestion(index)}
      aria-label="Question"
      className={`question ${isFocused ? 'focus' : ''}`}
    >
      <QuestionTitle index={index} />
      <QuestionAnswers index={index} />
      {isFocused && <QuestionSetting index={index} />}
      {isFocused && <AddQuestionButton index={index} isTitle={false} />}
    </div>
  );
}
