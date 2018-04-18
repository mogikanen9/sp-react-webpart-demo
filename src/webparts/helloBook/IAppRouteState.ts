import { Book } from './service/vo/Book';

export interface IAppRouteState{
    books: Book[];
    selectedBookId: string;
    selectedBookIndex: number;
}