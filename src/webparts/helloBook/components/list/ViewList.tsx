import * as React from 'react';
import { IViewListProps } from './IViewListProps';
import { Book } from '../../service/vo/Book';
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

const BOOK_COLUMNS: IColumn[] = [
    {
      key: 'isbn',
      name: 'ISBN',
      fieldName: 'isbn',
      minWidth: 20,
      maxWidth: 20,
      isResizable: false,
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
    }

    public render(): React.ReactElement<IViewListProps> {

        let listOfBooks = this.props.books.map((book: Book) => {
            return <li>{book.isbn} - {book.name} - {book.description}</li>;
        });

        let items: {}[] = new Array<{}>();
        //items.pu
        return (
            <div>
                <h3>Book List</h3>
                <div>
                    <ul>
                        {listOfBooks}
                    </ul>
                </div>
                <div>
                    <DetailsList
                        items={items}
                        columns={BOOK_COLUMNS}
                        //setKey='set'
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