import { Book } from './service/vo/Book';

export interface IAppRouteState {
    books: Book[];
    selectedBookId: string;
    selectedBookIndex: number;
    errorOccured: boolean;
    errorMessage?: string;
    error?: Error;
}