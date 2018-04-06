import { BookService } from "./BookService";
import { Book } from "./vo/Book";

import * as _ from "lodash";

const INIT_BOOK_DATA = [
    { name: "Remote. Office Not Required.", isbn: "XXX-000-111", description: "Working remote" },
    { name: "Hatching Twitter", isbn: "XXX-020-181", description: "How Twitter was born" },
    { name: "Java Concurrency in Practice", isbn: "0321349601", description: "Comprehensive coverage on one of the most advanced topics in Java" },
    { name: "Refactoring: Improving the Design of Existing Code", isbn: "0201485672", description: "Code refactoring" },
    { name: "Building Microservices: Designing Fine-Grained Systems", isbn: "1491950358", description: "Microservices" },
    { name: "Java Programming Interviews Exposed", isbn: "1118722868", description: "The book is written to specifically prepare you for the questions you will face when interviewing for highly sought-after jobs in Java" },
    { name: "Patterns of Enterprise Application Architecture", isbn: "0321127420", description: "Enterprise patterns" },
    { name: "Domain-Specific Languages", isbn: "0321712943", description: "DSL" },
    { name: "Angular 2 Development with TypeScript", isbn: "1617293121", description: "Angular2 development" },
    { name: "Spring Microservices", isbn: "1786466686", description: "Microservices with Spring" }];

export class BookServiceSTubImpl implements BookService {

    private bookDataStore: Array<Book>;

    constructor() {
        this.bookDataStore = INIT_BOOK_DATA;
    }

    public getById(bookId: string): Promise<Book> {

        return new Promise((resolve, reject) => {
            const result: Book = _.find(this.bookDataStore, (book) => { return book.isbn === bookId; });
            if (result) {
                resolve(result);
            } else {
                reject(new Error('Book with isbn->' + bookId + ' was not found.'));
            }
        });
    }
    public create(book: Book): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public update(book: Book): Promise<string> {
        throw new Error("Method not implemented.");
    }
    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            resolve(this.getMyBooks());
        });
    }

    public getMyBooks(): Book[] {
        return this.bookDataStore;
    }
}