/// <reference types="mocha" />
/// <reference types="sinon" />

import * as mocha from 'mocha';

import { assert } from 'chai';
import { expect } from 'chai';

import { BookServiceSTubImpl } from './BookServiceStubImpl';

declare const sinon: sinon.SinonStatic;

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
            return sut.getById('0321349601').then((book) => {
                assert.isNotNull(book);
                expect(book.isbn).equals('0321349601');
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
        it('create book');
    });

    describe('#update', () => {
        it('update book');
    });
});