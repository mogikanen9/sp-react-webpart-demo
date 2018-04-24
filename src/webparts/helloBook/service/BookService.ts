import { Book } from "./vo/Book";

export interface BookService {
    getAll(): Promise<Book[]>;
    getById(bookId: string): Promise<Book>;
    create(book: Book): Promise<string>;
    update (book: Book): Promise<string>;
    delete (bookId: string): Promise<string>;
    exists(bookId: string): Promise<boolean>;
}