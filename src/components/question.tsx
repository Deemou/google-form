import MoveIcon from '@/asset/icon/move-icon';
import { AddQuestionButton } from './add-question-button';
import QuestionAnswers from './question-answers';
import QuestionSetting from './question-setting';
import QuestionTitle from './question-title';
import { Draggable } from 'react-beautiful-dnd';

interface QuestionProps {
  id: string;
  index: number;
  isFocused: boolean;
  onClickQuestion: (index: number) => void;
}

export default function Question({
  id,
  index,
  isFocused,
  onClickQuestion
}: QuestionProps) {
  return (
    <Draggable draggableId={`question_${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => onClickQuestion(index)}
          aria-label="Question"
          className={`question ${isFocused ? 'focus' : ''}`}
        >
          <div {...provided.dragHandleProps} className="move">
            <MoveIcon />
          </div>
          <QuestionTitle index={index} />
          <QuestionAnswers index={index} />
          {isFocused && <QuestionSetting index={index} />}
          {isFocused && <AddQuestionButton index={index} isTitle={false} />}
        </div>
      )}
    </Draggable>
  );
}
