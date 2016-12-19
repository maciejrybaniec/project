/**
 * Input control component specification.
 * @module Modules/Forms/Components/__tests__/InputControl
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import Renderer from 'react-test-renderer';
import sinon from 'sinon';
import { mount } from 'enzyme';

import InputControl from 'Modules/Forms/Components/InputControl';

describe('<InputControl />', () => {

    it('should set input control name', () => {
        const inputName = 'login';
        const wrapper = mount(<InputControl name={inputName} />);

        expect(wrapper.find(`input[name="${inputName}"]`).length).toEqual(1);
    });

    it('should set input control type', () => {
        const inputType = 'password';
        const wrapper = mount(<InputControl type={inputType} />);

        expect(wrapper.find(`input[type="${inputType}"]`).length).toEqual(1);
    });

    it('should trigger callback on change', () => {
        const inputName = 'login';
        const spy = sinon.spy();

        const wrapper = mount(
            <InputControl
                onChange={spy}
                name={inputName}
            />
        );

        const input = wrapper.find('input');
        input.node.value = 'login';
        input.simulate('change', input);

        expect(spy.calledOnce).toBe(true);
    });

});
