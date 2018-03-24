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
});