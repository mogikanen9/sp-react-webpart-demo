import { Book } from './service/vo/Book';

export interface IAppRouteState{
    books: Book[];
    selectedBookId: string;
    selectedBook: Book;
    selectedBookIndex: number;
}