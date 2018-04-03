import * as React from 'react';
import IGenericScreenProps from './IGenericScreenProps';

class ErrorScreen extends React.Component<IGenericScreenProps> {

    constructor(props: IGenericScreenProps) {
        super(props);
    }

    public render() {
        return <div>Ups! Smth went wrong.</div>;
    }
}

export default ErrorScreen;