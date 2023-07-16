export type questionType =
  | 'short-answer'
  | 'long-answer'
  | 'radio'
  | 'checkboxes'
  | 'dropdown';

export interface IOption {
  id: string;
  value: string;
}
