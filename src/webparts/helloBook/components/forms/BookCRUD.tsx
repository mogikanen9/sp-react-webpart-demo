import * as React from 'react';
import { IBookCRUDProps, Mode } from './IBookCRUDProps';
import { Book } from '../../service/vo/Book';
import { Link } from 'react-router-dom';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

class BookCRUD extends React.Component<IBookCRUDProps> {

    constructor(props: IBookCRUDProps) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {

    }

    protected handleSubmit(e) {
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
                />
                <DatePicker
                    label='Publication date'
                    isRequired={true} 
                    value={this.props.book.pubDate}/>
                <TextField
                    label='Name'
                    placeholder='Book name'
                    required={true}
                    readOnly={readOnlyMode}
                    value={this.props.book.name}
                />
                <TextField
                    label='Description'
                    placeholder='Description of the book'
                    multiline={true}
                    rows={4}
                    readOnly={readOnlyMode}
                    value={this.props.book.description}
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