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
import { NOT_SELECTED_BOOK_ID, EMPTY_BOOKS } from './util/Constants';


export default class HelloBook extends React.Component<IHelloBookProps, IHelloBookState> {

  constructor(props: IHelloBookProps, state: IHelloBookState) {
    super();

    this.state = { books: EMPTY_BOOKS, selectedBookId: NOT_SELECTED_BOOK_ID };
    this.showToolbar = this.showToolbar.bind(this);
    this.handleBookItemSelect = this.handleBookItemSelect.bind(this);
    this.showList = this.showList.bind(this);
  }

  public componentDidMount() {
    this.props.bookService.getAll().then((result: Book[]) => {
      this.props.refreshBooks(result);
    });
  }

  public handleBookItemSelect(itemId: string) {
    console.log('selected item id ->', itemId);
    this.props.refreshSelectedBook(itemId);
  }

  public showList() {
    return (<ViewList books={this.props.books}
      onItemSelected={this.handleBookItemSelect}
      dateService={this.props.dateService} />);
  }

  public showToolbar() {
    let theLinks: Array<ToolbarItem> = new Array();
    const disableFlag = !(this.props.selectedBookId !== NOT_SELECTED_BOOK_ID);
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
