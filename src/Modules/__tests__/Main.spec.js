/**
 * Main component specification.
 * @module Modules/__tests__/Main
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import Renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Main from '../Main';

describe('<Main />', () => {

    it('should render <Main /> component correctly', () => {
        const tree = Renderer.create(<Main />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render application main container', () => {
        const wrapper = mount(<Main />);
        expect(wrapper.find('.Main').length).toEqual(1);
    });

    it('should render <Navbar /> component', () => {
        const wrapper = mount(<Main />);
        expect(wrapper.find('.Navbar').length).toEqual(1);
    });

    it('should render children components', () => {
        const wrapper = mount(
            <Main>
                <div className="Children"></div>
                <div className="Children"></div>
            </Main>
        );
        expect(wrapper.find('.Children').length).toEqual(2);
    });
});
