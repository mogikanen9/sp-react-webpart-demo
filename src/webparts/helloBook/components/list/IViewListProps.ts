import { Book } from "../../service/vo/Book";

export interface IViewListProps {
    books: Book[];
    onItemSelected: (itemId: string) => void;
}