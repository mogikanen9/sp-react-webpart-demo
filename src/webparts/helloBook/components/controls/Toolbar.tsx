import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Toolbar extends React.Component {
    public render() {
        return (
            <div>
                <Link to="/add">New</Link> <Link to="/edit" >Edit</Link></div>);
    }
}