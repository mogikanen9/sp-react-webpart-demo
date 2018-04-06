import * as React from 'react';
import { IBookCRUDProps } from './IBookCRUDProps';
import { Book } from '../../service/vo/Book';
import { Link } from 'react-router-dom';

class BookCRUD extends React.Component<IBookCRUDProps> {

    constructor(props: IBookCRUDProps) {
        super();
    }

    public componentDidMount() {
        this.props.bookService.getById(this.props.itemId).then((book: Book) => {
            console.log('loaded book->', book);
        }).catch((err) => {
            console.error(err);
        });
    }

    public render() {
        return (<div>
            <h3>Book CRUD for item {this.props.itemId}</h3>
            <p>
                <Link to="/home">Home</Link>
            </p>
        </div>);
    }
}

export default BookCRUD;