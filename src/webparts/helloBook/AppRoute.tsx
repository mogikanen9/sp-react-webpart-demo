import * as React from 'react';
import { Route, HashRouter, Switch, IndexRoute } from 'react-router-dom';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HelloBook from './components/HelloBook';
import IHelloBookProps from './components/IHelloBookProps';

import GenericScreen from './components/error/GenericScreen';
import IGenericScreenProps from './components/error/IGenericScreenProps';

import BookCRUD from './components/forms/BookCRUD';

import { BookService } from './service/BookService';
import { BookServiceSTubImpl } from './service/BookServiceStubImpl';
import { Book } from './service/vo/Book';

import { IBookCRUDProps } from './components/forms/IBookCRUDProps';
import { NOT_SELECTED_BOOK_ID, EMPTY_BOOKS } from './components/util/Constants';
import { IAppRouteState } from './IAppRouteState';

const newHistory = createBrowserHistory();

class AppRoute extends React.Component<any, IAppRouteState> {

    private bookService: BookService;

    constructor(props: any, state: IAppRouteState) {
        super();
        this.bookService = new BookServiceSTubImpl();
        this.helloBook = this.helloBook.bind(this);
        this.showAddBook = this.showAddBook.bind(this);
        this.showEditBook = this.showEditBook.bind(this);

        this.state = { books: EMPTY_BOOKS, selectedBookId: NOT_SELECTED_BOOK_ID };
    }

    protected loadBooks(theBooks: Book[]) {
        this.setState({ books: theBooks });
    }

    protected updateSelectedBookId(bookId: string) {
        this.setState({ selectedBookId: bookId });
    }

    protected helloBook() {
        const props: IHelloBookProps = {
            description: 'Book Manager',
            bookService: this.bookService,
            books: this.state.books,
            selectedBookId: this.state.selectedBookId,
            refreshBooks: this.loadBooks,
            refreshSelectedBook: this.updateSelectedBookId
        };
        return <HelloBook {...props} />;
    }

    protected showErrorPage() {
        const props: IGenericScreenProps = { message: '', code: '' };
        return <GenericScreen {...props} />;
    }

    protected showAddBook() {
        const props: IBookCRUDProps = {
            bookService: this.bookService,
            itemId: this.state.selectedBookId
        };
        return <BookCRUD {...props} />;
    }

    protected showEditBook() {
        const props: IBookCRUDProps = {
            bookService: this.bookService,
            itemId: this.state.selectedBookId
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