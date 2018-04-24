import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Book } from '../../service/vo/Book';
import { IBookCRUDProps, Mode } from './IBookCRUDProps';
import { IBookCRUDState } from './IBookCRUDState';

const HEADER = new Map<Mode, string>();
HEADER.set(Mode.DELETE, 'Delete book?');
HEADER.set(Mode.EDIT, 'Update book details');
HEADER.set(Mode.NEW, 'Add book');

const SUBMIT_LABEL = new Map<Mode, string>();
SUBMIT_LABEL.set(Mode.DELETE, 'Delete');
SUBMIT_LABEL.set(Mode.EDIT, 'Update');
SUBMIT_LABEL.set(Mode.NEW, 'Add');

const DAY_PICKER_STRINGS: IDatePickerStrings = {
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],

    shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],

    days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],

    shortDays: [
        'S',
        'M',
        'T',
        'W',
        'T',
        'F',
        'S'
    ],

    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',

    isRequiredErrorMessage: 'Field is required.',

    invalidInputErrorMessage: 'Invalid date format.'
};

const MIN_LENGTH_ISBN = 5;
const MIN_LENGTH_NAME = 1;

class BookCRUD extends React.Component<IBookCRUDProps, IBookCRUDState> {

    constructor(props: IBookCRUDProps) {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePubDateChange = this.handlePubDateChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleISBNChange = this.handleISBNChange.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.bookDataIsValid = this.bookDataIsValid.bind(this);
        this.onValidateISBN = this.onValidateISBN.bind(this);
        this.onValidateName = this.onValidateName.bind(this);

        this.state = {
            book: {},
            showNotification: false,
            validationErrors: new Map<string, string>()
        };
    }

    public componentDidMount() {
        if (this.props.bookId
            && (this.props.mode === Mode.EDIT ||
                this.props.mode === Mode.DELETE)) {
            this.props.loadBook(this.props.bookId).then((loadedBook: Book) => {
                this.setState({
                    book: loadedBook
                });
            }).catch((err) => {
                throw new Error('Cannot load book ->' + this.props.bookId);
            });
        }

    }

    protected isValidTextField(name: string, value: string, maxLength: number): boolean {

        if (value == null || value.length < maxLength) {
            this.state.validationErrors.set(name, 
                `${name} cannot be empty or less the ${maxLength} characters`);
            return false;
        } else {
            this.state.validationErrors.delete(name);
            return true;
        }
    }

    protected bookDataIsValid(book: Book): boolean {
        let rs = true;
        if (book == null) {
            rs = false;
        } else {
            if (!this.isValidTextField('isbn', book.isbn, MIN_LENGTH_ISBN)) {
                rs = false;
            }
            if (!this.isValidTextField('name', book.name, MIN_LENGTH_NAME)) {
                rs = false;
            }
        }
        return rs;
    }

    protected handleISBNChange(newValue: string) {
        if (this.props.mode === Mode.NEW) {
            this.setState({
                book: {
                    isbn: newValue,
                    name: this.state.book.name,
                    description: this.state.book.description,
                    pubDate: this.state.book.pubDate
                }
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

        if (this.bookDataIsValid(this.state.book)) {
            if (this.props.mode === Mode.NEW) {
                this.props.bookExsists(this.state.book.isbn).then((rs: boolean) => {
                    if (rs === true) {
                        this.setState({ showNotification: true });
                    } else {
                        this.props.handleSubmit(this.state.book, this.props.mode);
                        this.props.history.push('/home');
                    }
                });
            } else { //EDIT and DELETE
                this.props.handleSubmit(this.state.book, this.props.mode);
                this.props.history.push('/home');
            }
        } else {
            console.log('There are validation errors.');
        }

    }

    protected closeDialog() {
        this.setState({ showNotification: false });
    }

    protected showNotificationDialog() {
        return (
            <Dialog
                hidden={!this.state.showNotification}
                onDismiss={this.closeDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Book cannot be created',
                    subText: 'Book with ISBN->'
                        + this.state.book.isbn + ' already exists.'
                }}
                modalProps={{
                    titleAriaId: 'myLabelId',
                    subtitleAriaId: 'mySubTextId',
                    isBlocking: true,
                    containerClassName: 'ms-dialogMainOverride'
                }}
            >
                {null /** You can also include null values as the result of conditionals */}
                <DialogFooter>
                    <PrimaryButton onClick={this.closeDialog} text='Got it' />
                </DialogFooter>
            </Dialog>
        );
    }

    private onValidateISBN(value: string): string {
        if (this.isValidTextField('isbn', value, MIN_LENGTH_ISBN)) {
            return '';
        } else {
            return this.state.validationErrors.get('isbn');
        }
    }

    private onValidateName(value: string): string {
        if (this.isValidTextField('name', value, MIN_LENGTH_NAME)) {
            return '';
        } else {
            return this.state.validationErrors.get('name');
        }
    }

    public render() {
        const readOnlyMode: boolean = this.props.mode === Mode.DELETE;

        return (<div>
            <h3>{HEADER.get(this.props.mode)}</h3>

            <div>
                <TextField
                    label='ISBN'
                    placeholder='ISBN'
                    required={true}
                    readOnly={this.props.mode !== Mode.NEW}
                    borderless={true}
                    value={this.state.book.isbn}
                    onChanged={this.handleISBNChange}
                    errorMessage={this.state.validationErrors.get('isbn')}
                    onGetErrorMessage={this.onValidateISBN}
                    validateOnFocusOut={true}
                    validateOnFocusIn={true}
                    validateOnLoad={false}
                    minLength={MIN_LENGTH_ISBN}
                />
                <DatePicker
                    label='Publication date'
                    isRequired={true}
                    disabled={readOnlyMode}
                    borderless={readOnlyMode}
                    value={this.state.book.pubDate}
                    onSelectDate={this.handlePubDateChange}
                    strings={DAY_PICKER_STRINGS} />
                <TextField
                    label='Name'
                    placeholder='Book name'
                    required={true}
                    readOnly={readOnlyMode}
                    borderless={readOnlyMode}
                    value={this.state.book.name}
                    onChanged={this.handleNameChange}
                    errorMessage={this.state.validationErrors.get('name')}
                    onGetErrorMessage={this.onValidateName}
                    validateOnFocusOut={true}
                    validateOnFocusIn={true}
                    validateOnLoad={false}
                    minLength={MIN_LENGTH_NAME}
                />
                <TextField
                    label='Description'
                    placeholder='Description of the book'
                    multiline={true}
                    required={true}
                    rows={4}
                    readOnly={readOnlyMode}
                    borderless={readOnlyMode}
                    value={this.state.book.description}
                    onChanged={this.handleDescChange}
                />
                <PrimaryButton
                    type='submit'
                    onClick={this.handleSubmit}>
                    {SUBMIT_LABEL.get(this.props.mode)}
                </PrimaryButton>
                <DefaultButton>
                    <Link to="/home">Cancel</Link>
                </DefaultButton>
            </div>
            <div>
                {this.showNotificationDialog()}
            </div>
        </div>);
    }
}

export default withRouter(BookCRUD);