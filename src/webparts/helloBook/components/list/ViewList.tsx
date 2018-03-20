import * as React from 'react';
import { IViewListProps } from './IViewListProps';
import { Book } from '../../service/vo/Book';

export class ViewList extends React.Component<IViewListProps, {}>{

    constructor(props) {
        super();
    }

    public render(): React.ReactElement<IViewListProps> {
        return (
            <div>
                <h3>Book List</h3>
                <div>
                    {this.props.books}
                </div>
            </div>);
    }
}