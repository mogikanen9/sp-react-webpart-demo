import { BookService } from "./BookService";
import { Book } from "./vo/Book";

/*
insert into book(name,isbn,published,description,author_id) values ('Patterns of Enterprise Application Architecture', '0321127420','2002-11-05','Patterns',3)
insert into book(name,isbn,published,description,author_id) values ('Domain-Specific Languages', '0321712943','2010-09-23','DSL',3)
insert into book(name,isbn,published,description,author_id) values ('Angular 2 Development with TypeScript', '1617293121','2016-12-04','Angular',1)
insert into book(name,isbn,published,description,author_id) values ('Spring Microservices', '1786466686','2016-06-28','Microservice adn Spring',7)
*/

const MY_BOOKS = [
    { name: "Remote. Office Not Required.", isbn: "XXX-000-111", description: "Working remote" },
    { name: "Hatching Twitter", isbn: "XXX-020-181", description: "How Twitter was born" },
    { name: "Java Concurrency in Practice", isbn: "0321349601", description: "Comprehensive coverage on one of the most advanced topics in Java" },
    { name: "'Refactoring: Improving the Design of Existing Code", isbn: "0201485672", description: "Code refactoring" },
    { name: "Building Microservices: Designing Fine-Grained Systems", isbn: "1491950358", description: "Microservices" },
    { name: "Java Programming Interviews Exposed", isbn: "1118722868", description: "The book is written to specifically prepare you for the questions you will face when interviewing for highly sought-after jobs in Java" }];

export class BookServiceSTubImpl implements BookService {
    public getAll(): Promise<Book[]> {
        return new Promise<Book[]>((resolve, reject) => {
            resolve(MY_BOOKS);
        });
    }
}