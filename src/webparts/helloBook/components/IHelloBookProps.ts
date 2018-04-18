import { BookService } from '../service/BookService';
import { Book } from "../service/vo/Book";
import { IDateService } from './util/IDateService';

export default interface IHelloBookProps {
  description: string;
  dateService: IDateService;
  books: Book[];
  selectedBookId: string;
  selectedBookIndex: number;
  refreshBooks: () => void;
  refreshSelectedBook: (selectedBookId: string) => void;
}
