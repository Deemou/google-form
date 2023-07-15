import { questionType } from '@/types/formTypes';

export default function matchType(type: questionType): string {
  const typeMatchObj = {
    'short-answer': 'Short Answer',
    'long-answer': 'Paragraph',
    radio: 'Multiple choice',
    checkboxes: 'Checkboxes',
    dropdown: 'Dropdown'
  };
  return typeMatchObj[type];
}
