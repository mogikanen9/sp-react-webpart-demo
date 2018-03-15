import { BookService } from "./BookService";
import { Book } from "./vo/Book";

const MY_BOOKS = [
    { name: "REMOTE", isbn: "XXX-000-111", description: "Working remote" }];

export class BookServiceSTubImpl implements BookService {
   public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            resolve(MY_BOOKS);
        });
    }
}