import * as React from 'react';
import { IBookCRUDProps } from './IBookCRUDProps';

class BookCRUD extends React.Component<IBookCRUDProps> {

    constructor(props: IBookCRUDProps) {
        super();
    }

    public render() {
        return (<div>Book CRUD for item {this.props.itemId}</div>);
    }
}

export default BookCRUD;