/**
 * PageRender specification.
 * @module Modules/Navigation/__tests__/NavbarMenu
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import Renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { NavbarMenu } from '../Navbar';

describe('<NavbarMenu />', () => {

    it('should render <NavbarMenu /> component correctly', () => {
        const tree = Renderer.create( <NavbarMenu /> ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should set proper classNames for component elements', () => {
        const componentClassName = 'Navbar__menu';
        const wrapper = mount(<NavbarMenu className={componentClassName} />);

        expect(wrapper.find(`.${componentClassName}-link`).length > 0).toBeTruthy();
        expect(wrapper.find(`.${componentClassName}__item`).length > 0).toBeTruthy();
    });

});
