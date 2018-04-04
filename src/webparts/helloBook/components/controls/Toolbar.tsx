import * as React from 'react';
import { Link } from 'react-router-dom';
import IToolbarProps from './IToolbarProps';

export default class Toolbar extends React.Component<IToolbarProps> {

    constructor(props: IToolbarProps) {
        super();
    }

    public buildToolBarLinks() {
        return this.props.links.map((tuple) =>
            <Link to={tuple[0]}>{tuple[1]}</Link>
        );
    }

    public render() {
        return (
            <div>{this.buildToolBarLinks()}</div>);
    }
}