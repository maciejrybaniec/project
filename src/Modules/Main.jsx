/* @flow */
/**
 * Render static page.
 * @module Modules/Main
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';

import Navbar from 'Modules/Navigation/Navbar';

type PropsType = {
    children?: React.Element<*>
};

class Main extends PureComponent {
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
            <div className="Main">
                <Navbar />
                <div className="Main__content">
                    {children}
                </div>
            </div>
        );
    }
}

 export default Main;
