import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setFocusedStatus } from '@app/slices/infoSlice';
import { setFocusedStatusAt, moveQuestion } from '@app/slices/contentSlice';
import { useCallback } from 'react';
import Question from './question';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import StrictDroppable from './strict-droppable';

export default function FormContent() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);

  const unfocusAllQuestions = useCallback(() => {
    if (questions.length === 0) return;
    questions.forEach((_, index) => {
      dispatch(setFocusedStatusAt({ index, status: false }));
    });
  }, [questions.length]);

  const onClickQuestion = (index: number) => {
    if (questions[index].isFocused) return;
    dispatch(setFocusedStatus({ status: false }));
    unfocusAllQuestions();
    dispatch(setFocusedStatusAt({ index, status: true }));
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const oldIndex = source.index,
      newIndex = destination.index;
    if (oldIndex === newIndex) return;

    dispatch(moveQuestion({ oldIndex, newIndex }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictDroppable droppableId="form-content">
        {(provided) => (
          <section
            key="form-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
            aria-label="Form content"
          >
            {questions.map(({ isFocused, id }, index) => (
              <Question
                key={id}
                id={id}
                index={index}
                isFocused={isFocused}
                onClickQuestion={onClickQuestion}
              />
            ))}
            {provided.placeholder}
          </section>
        )}
      </StrictDroppable>
    </DragDropContext>
  );
}
