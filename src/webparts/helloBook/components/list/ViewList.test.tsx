import * as mocha from 'mocha';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import * as React from 'react';
import { ViewList } from './ViewList';
import { IViewListProps } from './IViewListProps';

describe('ViewList tests', () => {
    const props: IViewListProps = { books: [] };
    let sut;

    beforeEach(() => {
        sut = shallow(<ViewList {...props} />);
    });

    it('basic rendering', () => {
        console.log('out->', sut.html());
        //const wrapper = sut.find();
    });
});