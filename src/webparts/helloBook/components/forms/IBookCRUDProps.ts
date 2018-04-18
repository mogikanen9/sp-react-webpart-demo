import { BookService } from '../../service/BookService';
import { Book } from '../../service/vo/Book';

interface IBookCRUDProps {
    mode: Mode;
    book?: Book;
    handleSubmit(book: Book): void;
    history?:any;
}

enum Mode {
    NEW, EDIT, DELETE
}

export { IBookCRUDProps, Mode };