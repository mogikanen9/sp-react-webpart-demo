import { Book } from "./vo/Book";

export interface BookService {
    getAll(): Promise<Book[]>;
}