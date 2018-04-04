import * as React from 'react';
import styles from './HelloBook.module.scss';
import IHelloBookProps from './IHelloBookProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ViewList } from './list/ViewList';
import { IViewListProps } from './list/IViewListProps';

import Toolbar from './controls/Toolbar';
import IToolbarProps from './controls/IToolbarProps';
import ToolbarItem from './controls/ToolbarItem';

import { BookService } from '../service/BookService';
import { BookServiceSTubImpl } from '../service/BookServiceStubImpl';
import { Book } from '../service/vo/Book';
import { IHelloBookState } from './IHelloBookState';

const emptyBooks: Book[] = new Array<Book>();

export default class HelloBook extends React.Component<IHelloBookProps, IHelloBookState> {

  private bookService: BookService;

  constructor(props: IHelloBookProps, state: IHelloBookState) {
    super();
    this.bookService = new BookServiceSTubImpl();
    this.state = { books: emptyBooks };
  }

  public componentDidMount() {
    this.bookService.getAll().then((result: Book[]) => {
      this.setState({ books: result });
    });
  }

  public showList() {
    return (<ViewList books={this.state.books} />);
  }

  public showToolbar() {
    let theLinks: Array<ToolbarItem> = new Array();
    theLinks.push({ path: '/add', displayName: 'Add', iconName: 'Add' });
    theLinks.push({ path: '/edit', displayName: 'Edit', iconName: 'Edit', disabled: true });
    theLinks.push({ path: '/delete', displayName: 'Delete', iconName: 'Delete', disabled: true });

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
