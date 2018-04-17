import { BookService } from '../../service/BookService';
import { Book } from '../../service/vo/Book';

interface IBookCRUDProps {
    mode: Mode;
    book?: Book;
    handleSubmit(): void;
    updateSelectedBook(book: Book): void;
}

enum Mode {
    NEW, EDIT, DELETE
}

export { IBookCRUDProps, Mode };