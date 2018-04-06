import { BookService } from '../service/BookService';
import { Book } from "../service/vo/Book";

export default interface IHelloBookProps {
  description: string;
  bookService: BookService;
  books: Book[];
  selectedBookId: string;
  refreshBooks: (books: Book[]) => void;
  refreshSelectedBook: (selectedBookId: string) => void;
}
