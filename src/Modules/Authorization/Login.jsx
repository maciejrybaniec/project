/* @flow */
/**
 * Render login page.
 * @module Modules/Authorization/Login
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import autobind from 'autobind-decorator';
import React, { PureComponent } from 'react';

import InputControl from 'Modules/Forms/Components/InputControl';

type PropsType = {};

type StateType = {
    username: string,
    password: string
}

class Login extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
    * Set state validation for component.
    */
    state: StateType
    constructor(props: PropsType) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { username, password } = this.state;

        return (
            <div className="Login">
                Login
                <InputControl
                    name="username"
                    onChange={this._onChange}
                    type="text"
                />
                <InputControl
                    name="password"
                    onChange={this._onChange}
                    type="password"
                />
            </div>
        );
    }
    @autobind
    _onChange(name: string, value: string) {
        const state = {};
        state[name] = value;
        this.setState(state);
    }
}

 export default Login;
