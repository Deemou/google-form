import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { moveOption } from '@app/slices/contentSlice';
import Option from './option';
import AddOptionButton from './add-option-button';
import AddEtcButton from './add-etc-button';
import Etc from './etc';
import Checker from '../checker';
import StrictDroppable from '../strict-droppable';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import MoveVerticalIcon from '@/asset/icon/move-vertical-icon';

interface OptionListProps {
  questionIndex: number;
}

export default function OptionList({ questionIndex }: OptionListProps) {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.contentSlice);
  const { type, optionList, isFocused, hasEtc } = questions[questionIndex];

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const oldIndex = source.index,
      newIndex = destination.index;
    if (oldIndex === newIndex) return;

    dispatch(moveOption({ questionIndex, oldIndex, newIndex }));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div role="listbox" aria-label="Option list" className="option-list">
        <StrictDroppable
          droppableId={`option-list_${questions[questionIndex].id}`}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              key={`option-list_${questions[questionIndex].id}`}
              className="option-list"
            >
              {optionList.map((option, optionIndex) => (
                <Draggable
                  key={`option_${questions[questionIndex].id}_${option.id}`}
                  draggableId={`option_${questions[questionIndex].id}_${option.id}`}
                  index={optionIndex}
                >
                  {(provided) => (
                    <div
                      key={`option_${questions[questionIndex].id}_${option.id}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      role="listitem"
                      aria-label="Option item"
                      className="option-wrapper"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="move-vertical"
                      >
                        <MoveVerticalIcon />
                      </div>

                      <Checker type={type} />
                      {isFocused ? (
                        <Option
                          optionList={optionList}
                          option={option}
                          questionIndex={questionIndex}
                          optionIndex={optionIndex}
                        />
                      ) : (
                        <div className="min-w-0">
                          <span aria-label="Option value">{option.value}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictDroppable>
        {hasEtc && type !== 'dropdown' && <Etc index={questionIndex} />}
        {isFocused && (
          <div className="add-option-bar">
            <Checker type={type} />
            <AddOptionButton index={questionIndex} />
            {!hasEtc && type !== 'dropdown' && (
              <AddEtcButton index={questionIndex} />
            )}
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
