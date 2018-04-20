import { BookService } from "./BookService";
import { Book } from "./vo/Book";

import * as _ from "lodash";

const INIT_BOOK_DATA = [
    { name: 'Remote. Office Not Required.', isbn: 'XXX-000-111', description: 'Working remote', pubDate: new Date('2012-02-03') },
    { name: "Hatching Twitter", isbn: 'XXX-020-181', description: "How Twitter was born", pubDate: new Date('2014-11-13') },

    {
        name: 'Java Concurrency in Practice',
        isbn: '0321349601',
        description: 'Comprehensive coverage on one of the most advanced topics in Java',
        pubDate: new Date('2006-07-23')
    },
    {
        name: "Refactoring: Improving the Design of Existing Code",
        isbn: '0201485672',
        description: "Code refactoring", pubDate: new Date('1999-12-17')
    },
    {
        name: "Building Microservices: Designing Fine-Grained Systems",
        isbn: '1491950358',
        description: "Microservices", pubDate: new Date('2013-6-11')
    },
    {
        name: "Java Programming Interviews Exposed",
        isbn: '1118722868',
        description: "The book is written to specifically prepare you for the questions you will face when interviewing for highly sought-after jobs in Java",
        pubDate: new Date('2010-12-02')
    },
    {
        name: "Patterns of Enterprise Application Architecture",
        isbn: '0321127420',
        description: "Enterprise patterns", pubDate: new Date('2003-10-29')
    }
    ,
    {
        name: "Domain-Specific Languages",
        isbn: '0321712943',
        description: "DSL",
        pubDate: new Date('2009-09-08')
    }
    ,
    {
        name: "Angular 2 Development with TypeScript",
        isbn: '1617293121',
        description: "Angular2 development", pubDate: new Date('20015-09-30')
    },
    {
        name: "Spring Microservices",
        isbn: '1786466686',
        description: "Microservices with Spring",
        pubDate: new Date('2015-05-14')
    }];

export class BookServiceSTubImpl implements BookService {

    private bookDataStore: Map<string, Book>;

    constructor() {
        this.bookDataStore = new Map<string, Book>();
        INIT_BOOK_DATA.forEach((book) => {
            this.bookDataStore.set(book.isbn, book);
        });
    }

    public delete(bookId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.bookDataStore.has(bookId)) {
                this.bookDataStore.set(bookId, null);
                resolve(bookId);
            } else {
                reject(new Error('Book with isbn->' + bookId + ' was not found.'));
            }
        });
    }

    public getById(bookId: string): Promise<Book> {

        return new Promise((resolve, reject) => {
            const result: Book = this.bookDataStore.get(bookId);
            if (result) {
                resolve(result);
            } else {
                reject(new Error('Book with isbn->' + bookId + ' was not found.'));
            }
        });
    }
    public create(book: Book): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.bookDataStore.has(book.isbn)) {
                reject(book.isbn);
            } else {
                this.bookDataStore.set(book.isbn, book);
                resolve(book.isbn);
            }
        });
    }
    public update(book: Book): Promise<string> {
        return new Promise((resolve, reject) => {
            if (book && book.isbn) {
                this.bookDataStore.set(book.isbn, book);
                resolve(book.isbn);
            } else {
                reject('Book with ISBN were not provided.');
            }

        });
    }
    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            resolve(this.getMyBooks());
        });
    }

    public getMyBooks(): Book[] {
        const rs: Array<Book> = new Array<Book>();
        this.bookDataStore.forEach((value: Book) => {
            rs.push(value);
        });
        return rs;
    }
}