import { BookService } from '../service/BookService';
import { Book } from "../service/vo/Book";
import { IDateService } from './util/IDateService';

export default interface IHelloBookProps {
  description: string;
  bookService: BookService;
  dateService: IDateService;
  books: Book[];
  selectedBookId: string;
  refreshBooks: (books: Book[]) => void;
  refreshSelectedBook: (selectedBookId: string) => void;
}
