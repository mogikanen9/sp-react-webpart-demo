import * as mocha from 'mocha';
import { assert } from 'chai';
import { BookServiceSTubImpl } from './BookServiceStubImpl';

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
                assert.isAtLeast(1, books.length);
            });
        });
    });
});