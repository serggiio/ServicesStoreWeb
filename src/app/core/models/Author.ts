import { Book } from './Book';

export interface Author {
  authorBookId?: number;
  name?: string;
  lastName?: string;
  birthDate?: string;
  books?: Book[];
  isCollapsed: boolean;
}
