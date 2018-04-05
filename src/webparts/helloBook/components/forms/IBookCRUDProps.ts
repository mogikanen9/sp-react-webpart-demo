import { BookService } from '../../service/BookService';
export interface IBookCRUDProps {
    bookService: BookService;
    itemId: string;
}