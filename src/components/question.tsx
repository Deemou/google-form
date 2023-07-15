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
      className={`question ${isFocused ? 'focus' : ''}`}
    >
      <QuestionTitle index={index} />
      {/* <QuestionAnswers index={index} />
      {isFocused && <QuestionSetting index={index} />} */}
    </div>
  );
}
