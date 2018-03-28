import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HelloBook from './components/HelloBook';
import { IHelloBookProps } from './components/IHelloBookProps';
import ErrorScreen from './components/ErrorScreen';
import { IErrorScreenProps } from './components/IErrorScreenProps';


const newHistory = createBrowserHistory();

class AppRoute extends React.Component {

    helloBook() {
        let props: IHelloBookProps = { description: 'Book Manager' };
        return <HelloBook {...props} />;
    }

    showErrorPage() {
        let props: IErrorScreenProps = { message: '', code: '' };
        return <ErrorScreen {...props} />;
    }

    render() {
        return <Router history={newHistory}>
            <div>
                <Route path="/" component={this.helloBook} />
                <Route path="/error" component={this.showErrorPage} />
            </div>
        </Router>
    }
}

export default AppRoute;