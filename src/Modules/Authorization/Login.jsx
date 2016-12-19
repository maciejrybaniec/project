/* @flow */
/**
 * Render login page.
 * @module Modules/Authorization/Login
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

import { loginUser } from 'Actions/ActionCreators';
import InputControl from 'Modules/Forms/Components/InputControl';

type PropsType = {
    loginUser?: (username: string, password: string) => Object
};

type StateType = {
    username: string,
    password: string
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = {
    loginUser
};

@connect(mapStateToProps, mapDispatchToProps)
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
                <button type="button" onClick={this._onFormSubmit}>
                    Login
                </button>
            </div>
        );
    }
    /**
     * Submit login form event handler.
     * @dispatch loginUser
     * @private
     */
    @autobind
    _onFormSubmit() {
        const { loginUser } = this.props;
        const { username, password } = this.state;
        if (loginUser) loginUser(username, password);
    }
    @autobind
    /**
     * Render component in DOM.
     * @param {string} name Field name.
     * @param {string} value Field value.
     * @private
     */
    _onChange(name: string, value: string) {
        const state = {};
        state[name] = value;
        this.setState(state);
    }
}

 export default Login;
