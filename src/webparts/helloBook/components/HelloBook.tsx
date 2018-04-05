import * as React from 'react';
import styles from './HelloBook.module.scss';
import IHelloBookProps from './IHelloBookProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ViewList } from './list/ViewList';
import { IViewListProps } from './list/IViewListProps';

import Toolbar from './controls/Toolbar';
import IToolbarProps from './controls/IToolbarProps';
import ToolbarItem from './controls/ToolbarItem';

import { Book } from '../service/vo/Book';
import { IHelloBookState } from './IHelloBookState';
import { NOT_SELECTED_BOOK_ID } from './util/Constants';

const EMPTY_BOOKS: Book[] = new Array<Book>();

export default class HelloBook extends React.Component<IHelloBookProps, IHelloBookState> {

  constructor(props: IHelloBookProps, state: IHelloBookState) {
    super();

    this.state = { books: EMPTY_BOOKS, selectedBookId: NOT_SELECTED_BOOK_ID };
    this.showToolbar = this.showToolbar.bind(this);
    this.handleBookItemSelect = this.handleBookItemSelect.bind(this);
  }

  public componentDidMount() {
    this.props.bookService.getAll().then((result: Book[]) => {
      this.setState({ books: result });
    });
  }

  public handleBookItemSelect(itemId: string) {
    console.log('selected item id ->', itemId);
    this.setState({ selectedBookId: itemId });
  }

  public showList() {
    return (<ViewList books={this.state.books} onItemSelected={this.handleBookItemSelect} />);
  }

  public showToolbar() {
    let theLinks: Array<ToolbarItem> = new Array();
    const disableFlag = !(this.state.selectedBookId !== NOT_SELECTED_BOOK_ID);
    theLinks.push({ path: '/add', displayName: 'Add', iconName: 'Add' });
    theLinks.push({ path: '/edit', displayName: 'Edit', iconName: 'Edit', disabled: disableFlag });
    theLinks.push({ path: '/delete', displayName: 'Delete', iconName: 'Delete', disabled: disableFlag });

    let props: IToolbarProps = { links: theLinks };
    return (<Toolbar {...props} />);
  }

  public render(): React.ReactElement<IHelloBookProps> {
    return (
      <div className={styles.helloBook}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint Book Sample Web Part!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              {this.showToolbar()}
              {this.showList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
