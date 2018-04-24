import { Book } from "../../service/vo/Book";

export interface IBookCRUDState{
    book: Book;
    showNotification: boolean;
    validationErrors: Map<string,string>;
}