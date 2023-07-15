import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setFocusedStatus } from '@app/slices/infoSlice';
import { setFocusedStatusAt } from '@app/slices/contentSlice';
import { useCallback } from 'react';
import Question from './question';

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

  return (
    <section>
      {questions.map(({ isFocused }, index) => (
        <Question
          key={`question_${index}`}
          index={index}
          isFocused={isFocused}
          onClickQuestion={onClickQuestion}
        />
      ))}
    </section>
  );
}
