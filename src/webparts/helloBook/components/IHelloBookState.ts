import { Book } from "../service/vo/Book";

export interface IHelloBookState{
    books: Book[];
    selectedBookId: string;
}