/* @flow */
/**
 * Render input control component.
 * @module Modules/Forms/Components
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import autobind from 'autobind-decorator';
import React, { PureComponent } from 'react';

type InputControlType = 'text' | 'password';

type PropsType = {
    name: string,
    type: InputControlType,
    onChange: (name: string, value: string) => void
};

class InputControl extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
    * Set default properties for component.
    */
    static defaultProps = {
        type: 'text'
    };
    constructor(props: PropsType) {
        super(props);
    }
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { type, name } = this.props
        return (
            <input name={name} type={type} onChange={this._onChange} />
        );
    }
    /**
     * Change field value event handler.
     * @param {SyntheticEvent} event Synthetic event.
     * @private
     */
    @autobind
    _onChange(event: SyntheticEvent) {
        const { name, onChange } = this.props;
        if (event.target instanceof HTMLInputElement) {
            const fieldValue = event.target.value;
            onChange(name, fieldValue);
        }
    }
}

 export default InputControl;
