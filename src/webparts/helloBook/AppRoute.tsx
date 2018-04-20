import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { DateServiceImpl } from '../helloBook/components/util/DateServiceImpl';
import { IDateService } from '../helloBook/components/util/IDateService';
import { IAppRouteState } from './IAppRouteState';
import HelloBook from './components/HelloBook';
import IHelloBookProps from './components/IHelloBookProps';
import GenericScreen from './components/error/GenericScreen';
import IGenericScreenProps from './components/error/IGenericScreenProps';
import BookCRUD from './components/forms/BookCRUD';
import { IBookCRUDProps, Mode as BookCRUDMode } from './components/forms/IBookCRUDProps';
import { EMPTY_BOOKS, NOT_SELECTED_BOOK_ID, NOT_SELECTED_BOOK_INDEX } from './components/util/Constants';
import { BookService } from './service/BookService';
import { BookServiceSTubImpl } from './service/BookServiceStubImpl';
import { Book } from './service/vo/Book';


class AppRoute extends React.Component<any, IAppRouteState> {

    private bookService: BookService;
    private dateService: IDateService;

    constructor(props: any, state: IAppRouteState) {
        super();
        this.bookService = new BookServiceSTubImpl();
        this.dateService = new DateServiceImpl();

        this.showHelloBook = this.showHelloBook.bind(this);
        this.showAddBook = this.showAddBook.bind(this);
        this.showEditBook = this.showEditBook.bind(this);
        this.showDeleteBook = this.showDeleteBook.bind(this);
        this.handleBookChanges = this.handleBookChanges.bind(this);

        this.loadBooks = this.loadBooks.bind(this);
        this.updateSelectedBookId = this.updateSelectedBookId.bind(this);
        this.loadBookWrapperFunc = this.loadBookWrapperFunc.bind(this);
        this.handleError = this.handleError.bind(this);
        this.resetErrorState = this.resetErrorState.bind(this);

        this.state = {
            books: EMPTY_BOOKS,
            selectedBookId: NOT_SELECTED_BOOK_ID,
            selectedBookIndex: NOT_SELECTED_BOOK_INDEX,
            errorOccured: false
        };
    }

    protected loadBooks() {
        this.bookService.getAll().then((result: Book[]) => {
            this.setState({ books: result });
        });
    }

    protected getSelectedItemIndex(books: Array<Book>, bookId: string): number {
        let rs = -1;
        if (bookId && bookId !== NOT_SELECTED_BOOK_ID) {
            for (let i = 0; i < books.length; i++) {
                if (books[i] != null && books[i].isbn === bookId) {
                    rs = i;
                    break;
                }
            }
        }
        return rs;
    }

    protected updateSelectedBookId(bookId: string) {
        this.setState({ selectedBookId: bookId, selectedBookIndex: NOT_SELECTED_BOOK_INDEX });
        if (bookId && bookId !== NOT_SELECTED_BOOK_ID) {
            this.bookService.getById(bookId).then((book) => {
                const newBookIndex: number = this.getSelectedItemIndex(this.state.books, bookId);
                this.setState({ selectedBookIndex: newBookIndex });
            });
        }
    }

    protected showHelloBook() {
        const props: IHelloBookProps = {
            description: 'Book Manager',
            books: this.state.books,
            selectedBookId: this.state.selectedBookId,
            selectedBookIndex: this.state.selectedBookIndex,
            refreshBooks: this.loadBooks,
            refreshSelectedBook: this.updateSelectedBookId,
            dateService: this.dateService
        };
        return <HelloBook {...props} />;
    }

    protected showErrorPage() {
        const props: IGenericScreenProps = {
            customMessage: this.state.errorMessage,
            error: this.state.error,
            resetAndTryAgain: () => { this.resetErrorState(false, null, null); }
        };
        return <GenericScreen {...props} />;
    }

    protected resetErrorState(flag: boolean, err: Error, customMsg?: string) {
        this.setState({ errorOccured: flag });
    }

    protected handleError(err: Error, customMsg?: string) {
        this.setState({ errorOccured: true, error: err, errorMessage: customMsg });
    }

    protected handleBookChanges(book: Book, mode: BookCRUDMode): void {
        console.log('handleBookChanges book->', book);
        if (mode === BookCRUDMode.EDIT) {
            this.bookService.update(book).then((bookId: string) => {
                this.loadBooks();
            }).catch((err) => {
                this.handleError(err, 'Book cannot be updated.');
                //throw new Error(err);
            });
        } else if (mode === BookCRUDMode.DELETE) {
            this.bookService.delete(book.isbn).then((bookId: string) => {
                this.loadBooks();
            }).catch((err) => {
                this.handleError(err, 'Book cannot be removed.');
                //throw new Error(err);
            });
        } else if (mode === BookCRUDMode.NEW) {
            this.bookService.create(book).then((bookId: string) => {
                this.loadBooks();
            }).catch((err) => {
                this.handleError(err, 'Book cannot be created.');
                //throw new Error(err);
            });
        } else {
            throw new Error('Unknown Book CRUD mode');
        }
    }

    protected showAddBook() {
        const props: IBookCRUDProps = {
            mode: BookCRUDMode.NEW,
            handleSubmit: this.handleBookChanges,
            loadBook: this.loadBookWrapperFunc
        };
        return <BookCRUD {...props} />;
    }

    protected loadBookWrapperFunc(bookId: string): Promise<Book> {
        return this.bookService.getById(bookId).then((book: Book) => {
            return book;
        }).catch((err) => {
            console.log(err);
            throw new Error(err);
        });
    }

    protected showEditBook() {
        const props: IBookCRUDProps = {
            mode: BookCRUDMode.EDIT,
            bookId: this.state.selectedBookId,
            handleSubmit: this.handleBookChanges,
            loadBook: this.loadBookWrapperFunc
        };
        return <BookCRUD {...props} />;
    }

    protected showDeleteBook() {
        const props: IBookCRUDProps = {
            mode: BookCRUDMode.DELETE,
            bookId: this.state.selectedBookId,
            handleSubmit: this.handleBookChanges,
            loadBook: this.loadBookWrapperFunc
        };
        return <BookCRUD {...props} />;
    }

    protected renderRooutes() {
        return (<HashRouter>
            <Switch>
                <Route exact path="/" component={this.showHelloBook} />
                <Route path="/home" component={this.showHelloBook} />
                <Route path="/add" component={this.showAddBook} />
                <Route path="/edit" component={this.showEditBook} />
                <Route path="/delete" component={this.showDeleteBook} />
                <Route path="/error" component={this.showErrorPage} />
            </Switch>
        </HashRouter >);
    }

    public render() {
        if (this.state.errorOccured) {
            return this.showErrorPage();
        } else {
            return this.renderRooutes();
        }
    }
}

export default AppRoute;