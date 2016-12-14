/* @flow */
/**
 * Navigation component.
 * @module Modules/Navigation/Navbar
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';

type PropsType = {};

class Navbar extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { children } = this.props
        return (
            <nav className="Navbar">
                Navigation
            </nav>
        );
    }
}

 export default Navbar;
