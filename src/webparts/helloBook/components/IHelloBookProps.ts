import { BookService } from '../service/BookService';

export default interface IHelloBookProps {
  description: string;
  bookService: BookService;
}
