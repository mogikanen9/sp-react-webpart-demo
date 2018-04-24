import { assert, expect } from 'chai';
import { BookServiceSTubImpl } from './BookServiceStubImpl';
import { Book } from "./vo/Book";
import * as moment from 'moment';

declare const sinon: sinon.SinonStatic;

const SIMPLE_BOOK_ID = '0321349601';

describe('BookServiceSTubImpl', () => {

    let sut: BookServiceSTubImpl;

    beforeEach(() => {
        sut = new BookServiceSTubImpl();
    });

    describe('#getAll', () => {
        it('verify method returns at least one row', () => {
            return sut.getAll().then((books) => {
                assert.isNotNull(books);
                assert.isArray(books);
                assert.isAtLeast(10, books.length);
            });
        });

        it('verify that getMyBooks is called ones', () => {

            let spyMyBooks = sinon.spy(sut, "getMyBooks");

            return sut.getAll().then((books) => {
                assert(spyMyBooks.calledOnce);
            });
        });
    });

    describe('#getById', () => {
        it('verify method returns the book', () => {
            return sut.getById(SIMPLE_BOOK_ID).then((book) => {
                assert.isNotNull(book);
                expect(book.isbn).equals(SIMPLE_BOOK_ID);
                expect(book.name).equals('Java Concurrency in Practice');
            });
        });

        it('verify method throws error when book cannot be found', () => {
            return sut.getById('0321349601-a').then((book) => {
                assert.fail('Unreachable code - error should be thrown since book was not found');
            }).catch((err) => {
                assert.isNotNull(err);
                expect(err.message).to.contain('Book with isbn->0321349601-a was not found');
            });
        });
    });

    describe('#create', () => {
        const NEW_BOOK_ID = '00-99-AA-789';
        it('create book', () => {
            const newBook = {
                isbn: NEW_BOOK_ID,
                name: 'New cool book',
                description: 'New book desc',
                pubDate: moment("2003-12-25").toDate()
            };
            return sut.create(newBook).then((newBookId: string) => {
                assert.isNotNull(newBookId);
                assert.isTrue(newBookId === NEW_BOOK_ID, 'Create: Book ISBNs do not match ');
                return newBookId;
            }).then((newBookId: string) => {
                return sut.getById(newBookId).then((book: Book) => {
                    assert.isNotNull(book);
                    assert.isTrue(book.isbn === NEW_BOOK_ID, 'GetById: Book ISBNs do not match');
                }).catch((err) => {
                    assert.fail('ERR->getById->', err);
                });
            }).catch((err) => {
                assert.fail('ERR->create->', err);
            });
        });
    });

    describe('#update', () => {
        it('update book', () => {
            return sut.getById(SIMPLE_BOOK_ID).then((book: Book) => {
                assert.isNotNull(book);
                book = new Book(book.isbn,
                    book.name + '-modified',
                    book.description + '-modified',
                    book.pubDate);
                return book;
            }).then((book) => {
                return sut.update(book).then((bookId: string) => {
                    assert.isNotNull(bookId);
                    expect(book.isbn).equals(SIMPLE_BOOK_ID);
                    return bookId;
                });
            }).then((bookId: string) => {
                assert.isNotNull(bookId);
                return sut.getById(bookId).then((book: Book) => {
                    assert.isNotNull(bookId);
                    assert.isTrue(book.isbn === SIMPLE_BOOK_ID);
                    assert.include(book.name, '-modified', 'Book name ends with "-modified"');
                    assert.include(book.description, '-modified', 'Book desc ends with "-modified"');
                    return true;
                });
            });
        });
    });

    describe('#delete', () => {
        it('delete book', () => {
            return sut.delete(SIMPLE_BOOK_ID).then((bookId: string) => {
                assert.isNotNull(bookId);
                assert.isTrue(bookId === SIMPLE_BOOK_ID);
                return sut.getById(bookId);
            }).then((book: Book) => {
                assert.fail('Unreachable');
                return false;
            }).catch((err) => {
                assert.include(err.message, 'Book with isbn->' + SIMPLE_BOOK_ID + ' was not found');
                return true;
            }).then((flag: boolean) => {
                assert.isTrue(flag);
                return flag;
            });
        });
    });
});