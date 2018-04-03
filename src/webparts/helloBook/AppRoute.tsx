import * as React from 'react';
import { Route, HashRouter, Switch, IndexRoute } from 'react-router-dom';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HelloBook from './components/HelloBook';
import IHelloBookProps from './components/IHelloBookProps';

import GenericScreen from './components/error/GenericScreen';
import IGenericScreenProps from './components/error/IGenericScreenProps';

import BookCRUD from './components/forms/BookCRUD';

const newHistory = createBrowserHistory();

class AppRoute extends React.Component {

    protected helloBook() {
        let props: IHelloBookProps = { description: 'Book Manager' };
        return <HelloBook {...props} />;
    }

    protected showErrorPage() {
        let props: IGenericScreenProps = { message: '', code: '' };
        return <GenericScreen {...props} />;
    }

    protected showAddBook() {
        return <BookCRUD />;
    }

    protected showEditBook() {
        return <BookCRUD />;
    }

    public render() {
        return (
            <HashRouter  history={newHistory}>
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