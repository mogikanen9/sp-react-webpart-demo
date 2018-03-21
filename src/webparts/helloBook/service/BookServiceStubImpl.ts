import { BookService } from "./BookService";
import { Book } from "./vo/Book";

const MY_BOOKS = [
    { name: "Remote. Office Not Required.", isbn: "XXX-000-111", description: "Working remote" },
    { name: "Hatching Twitter", isbn: "XXX-020-181", description: "How Twitter was born" }];

export class BookServiceSTubImpl implements BookService {
    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            resolve(MY_BOOKS);
        });
    }
}