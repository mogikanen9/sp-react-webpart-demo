import * as React from 'react';
import { IViewListProps } from './IViewListProps';
import { Book } from '../../service/vo/Book';

export class ViewList extends React.Component<IViewListProps, {}>{

    constructor(props) {
        super();
    }

    public render(): React.ReactElement<IViewListProps> {
        
        let listOfBooks = this.props.books.map((book:Book)=>{
           return <li>{book.isbn} - {book.name} - {book.description}</li>
        });

        return (
            <div>
                <h3>Book List</h3>
                <div>
                    <ul>
                        {listOfBooks}
                    </ul>
                </div>
            </div>);
    }
}