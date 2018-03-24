import * as mocha from 'mocha';
import { assert, expect } from 'chai';
import { shallow } from 'enzyme';


import * as React from 'react';
import { ViewList } from './ViewList';
import { IViewListProps } from './IViewListProps';


describe('ViewList tests', () => {

    describe('basic rendering', () => {
        let sut;
        const props: IViewListProps = { books: [] };

        beforeEach(() => {
            sut = shallow(<ViewList {...props} />);
        });

        it('BookList header is displayed', () => {
            expect(sut.contains(<h3>Book List</h3>)).to.equal(true);
        });
    });

    describe('#fillRows', () => {
        let sut: ViewList;
        beforeEach(() => {
            sut = new ViewList({ books: [] });
        });

        const bookParamInput = [
            {
                input: [],
                expected: 0
            },
            {
                input: [{ isbn: 'AAA', name: 'Name1', description: 'smth' }],
                expected: 1
            },
            {
                input:
                    [
                        { isbn: 'AAA', name: 'Name1', description: 'smth' },
                        { isbn: 'BBB', name: 'NameBBB', description: 'smthB' }],
                expected: 2
            }
        ];

        bookParamInput.map((row) => {
            it(row.input.length + ' books -> ' + row.expected + ' rows', () => {
                let items: {}[] = sut.fillRows(row.input);
                assert(items.length === row.expected);
            });
        });
    });

});