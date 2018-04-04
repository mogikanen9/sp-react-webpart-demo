import * as React from 'react';
import { Link } from 'react-router-dom';
import IToolbarProps from './IToolbarProps';
import ToolbarItem from './ToolbarItem';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export default class Toolbar extends React.Component<IToolbarProps> {

    constructor(props: IToolbarProps) {
        super();
    }

    public buildToolBarLinks() {
        return this.props.links.map((tuple) =>
            <Link to={tuple.path}>{tuple.displayName}</Link>
        );
    }

    public buildItems(): IContextualMenuItem[] {
        let items: IContextualMenuItem[] = new Array<IContextualMenuItem>();
        this.props.links.map((tuple) => {
            let item: IContextualMenuItem = { 
                key: tuple.displayName,
                name: tuple.displayName,
                href: '#'+tuple.path,
                icon: tuple.iconName };
            items.push(item);
        });
        return items;
    }

    public render() {

        return (
            <div>
                {this.buildToolBarLinks()}
                <CommandBar items={this.buildItems()} />
            </div>);
    }
}