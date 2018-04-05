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
import { IBookCRUDProps } from './components/forms/IBookCRUDProps';
import { NOT_SELECTED_BOOK_ID } from './components/util/Constants';

const newHistory = createBrowserHistory();

class AppRoute extends React.Component {

    private bookService: BookService;

    constructor() {
        super();
        this.bookService = new BookServiceSTubImpl();
        this.helloBook = this.helloBook.bind(this);
        this.showAddBook = this.showAddBook.bind(this);
        this.showEditBook = this.showEditBook.bind(this);
    }

    protected helloBook() {
        const props: IHelloBookProps = { description: 'Book Manager', bookService: this.bookService };
        return <HelloBook {...props} />;
    }

    protected showErrorPage() {
        const props: IGenericScreenProps = { message: '', code: '' };
        return <GenericScreen {...props} />;
    }

    protected showAddBook() {
        const props: IBookCRUDProps = { bookService: this.bookService, itemId: NOT_SELECTED_BOOK_ID };
        return <BookCRUD {...props} />;
    }

    protected showEditBook() {
        const props: IBookCRUDProps = { bookService: this.bookService, itemId: NOT_SELECTED_BOOK_ID };
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