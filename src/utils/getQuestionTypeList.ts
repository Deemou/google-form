import { questionType } from '@/types/formTypes';

export default function getQuestionTypeList(): questionType[] {
  return ['short-answer', 'long-answer', 'radio', 'checkboxes', 'dropdown'];
}
