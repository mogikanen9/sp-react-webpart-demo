import * as React from 'react';
import { Route, HashRouter, Switch, IndexRoute } from 'react-router-dom';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HelloBook from './components/HelloBook';
import IHelloBookProps from './components/IHelloBookProps';

import GenericScreen from './components/error/GenericScreen';
import IGenericScreenProps from './components/error/IGenericScreenProps';

import BookCRUD from './components/forms/BookCRUD';
import { IBookCRUDProps, Mode as BookCRUDMode } from './components/forms/IBookCRUDProps';

import { BookService } from './service/BookService';
import { BookServiceSTubImpl } from './service/BookServiceStubImpl';
import { Book } from './service/vo/Book';

import { IDateService } from '../helloBook/components/util/IDateService';
import { DateServiceImpl } from '../helloBook/components/util/DateServiceImpl';

import { NOT_SELECTED_BOOK_ID, EMPTY_BOOKS, NOT_SELECTED_BOOK_INDEX } from './components/util/Constants';
import { IAppRouteState } from './IAppRouteState';

const newHistory = createBrowserHistory();

class AppRoute extends React.Component<any, IAppRouteState> {

    private bookService: BookService;
    private dateService: IDateService;

    constructor(props: any, state: IAppRouteState) {
        super();
        this.bookService = new BookServiceSTubImpl();
        this.dateService = new DateServiceImpl();

        this.helloBook = this.helloBook.bind(this);
        this.showAddBook = this.showAddBook.bind(this);
        this.showEditBook = this.showEditBook.bind(this);
        this.loadBooks = this.loadBooks.bind(this);
        this.updateSelectedBookId = this.updateSelectedBookId.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleUpdateBook = this.handleUpdateBook.bind(this);

        this.state = {
            books: EMPTY_BOOKS,
            selectedBookId: NOT_SELECTED_BOOK_ID,
            selectedBookIndex: NOT_SELECTED_BOOK_INDEX,
            selectedBook: new Book()
        };
    }

    protected loadBooks(theBooks: Book[]) {
        this.setState({ books: theBooks });
    }


    protected getSelectedItemIndex(books: Array<Book>, bookId: string): number {
        let rs = -1;
        if (bookId && bookId !== NOT_SELECTED_BOOK_ID) {
            //rs = _.findIndex(books, (book) => { return book.isbn === bookId; });
            for (let i = 0; i < books.length; i++) {
                if (books[i].isbn === bookId) {
                    rs = i;
                    break;
                }
            }
        }
        return rs;
    }

    protected updateSelectedBookId(bookId: string) {
        this.setState({ selectedBookId: bookId, selectedBookIndex: NOT_SELECTED_BOOK_INDEX});
        if (bookId && bookId !== NOT_SELECTED_BOOK_ID) {
            this.bookService.getById(bookId).then((book) => {
                const newBookIndex:number = this.getSelectedItemIndex(this.state.books,bookId);
                this.setState({ selectedBook: book, selectedBookIndex: newBookIndex});
            });
        }
    }

    protected helloBook() {
        const props: IHelloBookProps = {
            description: 'Book Manager',
            bookService: this.bookService,
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
        const props: IGenericScreenProps = { message: '', code: '' };
        return <GenericScreen {...props} />;
    }

    protected handleAddBook(): void {
        console.log('Creating new book->', this.state.selectedBook);
    }

    protected handleUpdateBook(): void {
        console.log('Updating book->', this.state.selectedBook);
    }

    protected showAddBook() {
        const props: IBookCRUDProps = {
            mode: BookCRUDMode.NEW,
            handleSubmit: this.handleAddBook
        };
        return <BookCRUD {...props} />;
    }

    protected showEditBook() {
        const props: IBookCRUDProps = {
            mode: BookCRUDMode.EDIT,
            book: this.state.selectedBook,
            handleSubmit: this.handleUpdateBook
        };
        return <BookCRUD {...props} />;
    }

    public render() {
        return (
            <HashRouter history={newHistory}>
                <Switch>
                    <Route exact path="/" component={this.helloBook} />
                    <Route path="/home" component={this.helloBook} />
                    <Route path="/add" component={this.showAddBook} />
                    <Route path="/edit" component={this.showEditBook} />
                    <Route path="/error" component={this.showErrorPage} />
                </Switch>
            </HashRouter >);
    }
}

export default AppRoute;