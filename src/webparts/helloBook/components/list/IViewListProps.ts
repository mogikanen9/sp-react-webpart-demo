import { Book } from "../../service/vo/Book";
import { IDateService } from "../util/IDateService";

export interface IViewListProps {
    books: Book[];
    onItemSelected: (itemId: string) => void;
    dateService: IDateService;
}