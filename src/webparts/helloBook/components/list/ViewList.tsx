import * as React from 'react';
import { IViewListProps } from './IViewListProps';
import { Book } from '../../service/vo/Book';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

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

    constructor(props) {
        super();

        this.fillRows = this.fillRows.bind(this);
    }

    public fillRows(books: Array<Book>): Array<{}> {
        let items: {}[] = new Array<{}>();

        books.map((book: Book) => {
            items.push({
                key: book.isbn,
                isbn: book.isbn,
                name: book.name,
                desc: book.description
            });
        });

        return items; 
    }

    public render(): React.ReactElement<IViewListProps> {

        /*let items: {}[] = new Array<{}>();

        this.props.books.map((book: Book) => {
            items.push({
                key: book.isbn,
                isbn: book.isbn,
                name: book.name,
                desc: book.description
            });
        });*/

        return (
            <div>
                <h3>Book List</h3>
                <div>
                    <DetailsList
                        items={this.fillRows(this.props.books)}
                        columns={BOOK_COLUMNS}
                        setKey='set'
                    //layoutMode={DetailsListLayoutMode.fixedColumns}
                    //selection={this._selection}
                    //selectionPreservedOnEmptyClick={true}
                    //ariaLabelForSelectionColumn='Toggle selection'
                    //ariaLabelForSelectAllCheckbox='Toggle selection for all items'
                    //onItemInvoked={this._onItemInvoked}
                    />
                </div>
            </div>);
    }
}