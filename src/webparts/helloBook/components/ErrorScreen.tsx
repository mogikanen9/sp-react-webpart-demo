import * as React from 'react';
import { IErrorScreenProps } from './IErrorScreenProps';

class ErrorScreen extends React.Component<IErrorScreenProps> {

    constructor(props: IErrorScreenProps) {
        super(props);
    }

    public render() {
        return <div>Ups! Smth went wrong.</div>;
    }
}

export default ErrorScreen;