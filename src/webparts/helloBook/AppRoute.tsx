import * as React from 'react';
import { Route, Router, hashHistory } from 'react-router-dom';
import HelloBook from './components/HelloBook';
import { IHelloBookProps } from './components/IHelloBookProps';
import { render } from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const newHistory = createBrowserHistory();

class AppRoute extends React.Component {

    helloBook() {
        let props: IHelloBookProps = { description: 'Book Manager' };
        return <HelloBook {...props} />;
    }

    render() {
        return <Router history={newHistory}>
            <Route path="/" component={this.helloBook} />
        </Router>
    }
}

export default AppRoute;