import * as React from 'react';
import { IViewListProps } from './IViewListProps';
import { Book } from '../../service/vo/Book';
import { DetailsList, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { NOT_SELECTED_BOOK_ID } from '../util/Constants';

const BOOK_COLUMNS: IColumn[] = [
    {
        key: 'isbn',
        name: 'ISBN',
        fieldName: 'isbn',
        minWidth: 50,
        maxWidth: 75,
        isResizable: true,
        ariaLabel: 'ISBN'
    },
    {
        key: 'pubDate',
        name: 'Published',
        fieldName: 'pubDate',
        minWidth: 100,
        maxWidth: 250,
        isResizable: false,
        ariaLabel: 'PUblication Date'
    },
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
        ariaLabel: 'Book name'
    },
    {
        key: 'desc',
        name: 'Description',
        fieldName: 'desc',
        minWidth: 200,
        maxWidth: 400,
        isResizable: true,
        ariaLabel: 'Book description'
    }
];

export class ViewList extends React.Component<IViewListProps, {}>{

    protected mySelection: Selection;

    constructor(props: IViewListProps) {
        super();

        this.fillRows = this.fillRows.bind(this);

        this.mySelection = new Selection({
            onSelectionChanged: () => {
                let itemId: string = NOT_SELECTED_BOOK_ID;
                if (this.mySelection.getSelectedCount() > 0) {
                    itemId = this.mySelection.getSelection()[0].key.toString();
                }

                console.log('itemId->', itemId);
                this.props.onItemSelected(itemId);
            }
        });

    }

    public componentDidMount() {
        //select the checkbox/radio
        this.mySelection.setIndexSelected(this.props.selectedBookIndex, true, false);
    }

    public fillRows(books: Array<Book>): Array<{}> {
        let items: {}[] = new Array<{}>();

        books.map((book: Book) => {
            if (book) {
                items.push({
                    key: book.isbn,
                    isbn: book.isbn,
                    pubDate: this.props.dateService.format(book.pubDate, 'N/A'),
                    //pubDate: this.printDate(new Date()),
                    name: book.name,
                    desc: book.description
                });
            }
        });

        return items;
    }

    public render(): React.ReactElement<IViewListProps> {
        return (
            <div>
                <DetailsList
                    items={this.fillRows(this.props.books)}
                    columns={BOOK_COLUMNS}
                    setKey='set'
                    selectionPreservedOnEmptyClick={true}
                    compact={true}
                    selectionMode={SelectionMode.single}
                    selection={this.mySelection}
                />
            </div>);
    }
}