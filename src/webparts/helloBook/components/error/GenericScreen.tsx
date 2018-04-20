import * as React from 'react';
import IGenericScreenProps from './IGenericScreenProps';

import { Button } from 'office-ui-fabric-react/lib/Button';

class ErrorScreen extends React.Component<IGenericScreenProps> {

    constructor(props: IGenericScreenProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    protected handleSubmit(event) {
        this.props.resetAndTryAgain();
    }

    public render() {
        return <div>
            <div>
                <h2>Ups! Smth went wrong.</h2>
            </div>
            <div>
                <h3>{this.props.customMessage}</h3>
            </div>
            <div>
                <h4>Please, try again later.</h4>
                <Button onClick={this.handleSubmit}>Got it</Button>
            </div>
        </div>;
    }
}

export default ErrorScreen;