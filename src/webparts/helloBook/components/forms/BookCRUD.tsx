import * as React from 'react';
import { IBookCRUDProps, Mode } from './IBookCRUDProps';
import { Book } from '../../service/vo/Book';
import { Link } from 'react-router-dom';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

class BookCRUD extends React.Component<IBookCRUDProps> {

    private nvName: string;
    private nvISBN: string;
    private nvDesc: string;
    private nvPubDate: Date;

    constructor(props: IBookCRUDProps) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleISBNChange = this.handleISBNChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    public componentDidMount() {
        this.nvName = this.props.book.name;
        this.nvISBN = this.props.book.isbn;
        this.nvDesc = this.props.book.description;
    }

    protected handleNameChange(newValue: string) {
        this.nvName = newValue;       
    }

    protected handleISBNChange(newValue: string) {
        this.nvISBN = newValue;       
    }

    protected handleDescChange(newValue: string) {
        this.nvDesc = newValue;       
    }

    protected handleSubmit(e) {
        this.props.updateSelectedBook({
            isbn: this.nvISBN,
            name: this.nvName,
            description: this.nvDesc,
            pubDate: this.props.book.pubDate
        });
        this.props.handleSubmit();
    }

    public render() {
        const readOnlyMode: boolean = this.props.mode === Mode.DELETE;

        return (<div>
            <h3>Book CRUD Mode {this.props.mode}</h3>
            <p>
                <Link to="/home">Home</Link>
            </p>
            <div>
                <TextField
                    label='ISBN'
                    placeholder='ISBN'
                    required={true}
                    readOnly={readOnlyMode}
                    value={this.props.book.isbn}
                    onChanged={this.handleISBNChange}
                />
                <DatePicker
                    label='Publication date'
                    isRequired={true}
                    value={this.props.book.pubDate} />
                <TextField
                    label='Name'
                    placeholder='Book name'
                    required={true}
                    readOnly={readOnlyMode}
                    value={this.props.book.name}
                    onChanged={this.handleNameChange}
                />
                <TextField
                    label='Description'
                    placeholder='Description of the book'
                    multiline={true}
                    rows={4}
                    readOnly={readOnlyMode}
                    value={this.props.book.description}
                    onChanged={this.handleDescChange}
                />
                <PrimaryButton
                    type='submit'
                    onClick={this.handleSubmit}>Submit</PrimaryButton>
                <DefaultButton
                    href="home">
                    Cancel
                </DefaultButton>
            </div>
        </div>);
    }
}

export default BookCRUD;