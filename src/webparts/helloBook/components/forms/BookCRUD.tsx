import * as React from 'react';

import { withRouter } from "react-router-dom";

import { IBookCRUDProps, Mode } from './IBookCRUDProps';
import { Book } from '../../service/vo/Book';
import { Link } from 'react-router-dom';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton, Button } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { IBookCRUDState } from './IBookCRUDState';

class BookCRUD extends React.Component<IBookCRUDProps, IBookCRUDState> {

    constructor(props: IBookCRUDProps) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePubDateChange = this.handlePubDateChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);

        this.state = { book: {} };
    }

    public componentDidMount() {
        if (this.props.bookId) {
            this.props.loadBook(this.props.bookId).then((loadedBook: Book) => {
                this.setState({
                    book: loadedBook
                });
            }).catch((err) => {
                throw new Error('Cannot load book ->' + this.props.bookId);
            });
        }

    }

    protected handleNameChange(newValue: string) {
        this.setState({
            book: {
                isbn: this.state.book.isbn,
                name: newValue,
                description: this.state.book.description,
                pubDate: this.state.book.pubDate
            }
        });
    }

    protected handlePubDateChange(newValue: Date) {
        this.setState({
            book: {
                isbn: this.state.book.isbn,
                name: this.state.book.name,
                description: this.state.book.description,
                pubDate: newValue
            }
        });
    }

    protected handleDescChange(newValue: string) {
        this.setState({
            book: {
                isbn: this.state.book.isbn,
                name: this.state.book.name,
                description: newValue,
                pubDate: this.state.book.pubDate
            }
        });
    }

    protected handleSubmit(e) {
        this.props.handleSubmit(this.state.book, this.props.mode);
        this.props.history.push('/home');
    }

    public render() {
        const readOnlyMode: boolean = this.props.mode === Mode.DELETE;

        return (<div>
            <h3>Book CRUD Mode {this.props.mode}</h3>

            <div>
                <TextField
                    label='ISBN'
                    placeholder='ISBN'
                    required={true}
                    readOnly={true}
                    value={this.state.book.isbn}
                />
                <DatePicker
                    label='Publication date'
                    isRequired={true}
                    value={this.state.book.pubDate}
                    onSelectDate={this.handlePubDateChange} />
                <TextField
                    label='Name'
                    placeholder='Book name'
                    required={true}
                    readOnly={readOnlyMode}
                    value={this.state.book.name}
                    onChanged={this.handleNameChange}
                />
                <TextField
                    label='Description'
                    placeholder='Description of the book'
                    multiline={true}
                    rows={4}
                    readOnly={readOnlyMode}
                    value={this.state.book.description}
                    onChanged={this.handleDescChange}
                />
                <PrimaryButton
                    type='submit'
                    onClick={this.handleSubmit}>Submit</PrimaryButton>
                <Button>
                    <Link to="/home">Cancel</Link>
                </Button>

            </div>
        </div>);
    }
}

export default withRouter(BookCRUD);