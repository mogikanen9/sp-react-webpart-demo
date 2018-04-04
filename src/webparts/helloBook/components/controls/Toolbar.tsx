import * as React from 'react';
import IToolbarProps from './IToolbarProps';
import ToolbarItem from './ToolbarItem';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export default class Toolbar extends React.Component<IToolbarProps> {

    constructor(props: IToolbarProps) {
        super();
    }


    public buildItems(): IContextualMenuItem[] {
        let items: IContextualMenuItem[] = new Array<IContextualMenuItem>();
        this.props.links.map((tuple) => {
            let item: IContextualMenuItem = {
                key: tuple.displayName,
                name: tuple.displayName,
                href: '#' + tuple.path,
                icon: tuple.iconName,
                disabled: tuple.disabled
            };
            items.push(item);
        });
        return items;
    }

    public render() {

        return (
            <div>
                <CommandBar items={this.buildItems()} />
            </div>);
    }
}