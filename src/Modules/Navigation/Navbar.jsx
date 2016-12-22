/* @flow */
/**
 * Navigation component.
 * @module Modules/Navigation/Navbar
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import cx from 'classnames';
import { pure } from 'recompose';
import React, { PureComponent } from 'react';
import { Link } from 'react-router';

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
        return (
            <nav className="Navbar">
                <div className="Navigation__wrapper Container">
                    <div className="Navbar__company">
                        <img
                            className="Navbar__company-image"
                            src="/img/logo.png"
                        />
                    </div>
                    <NavbarMenu className="Navbar__menu" />
                </div>
            </nav>
        );
    }
}

type NavbarMenuProps = {
    className: string
};

/**
 * Navbar menu component.
 * @constructor
 * @param {NavbarMenuProps} props Component properties.
 * @returns {ReactElement}
 */
export const NavbarMenu = pure((props: NavbarMenuProps): React.Element<*> => {
    const { className } = props;
    return (
        <ul className={cx(className)}>
            <li className={cx(`${className}__item`)}>
                <Link
                    className={cx(`${className}-link`)}
                    to={'/about'}
                >
                    O nas
                </Link>
            </li>
            <li className={cx(`${className}__item`)}>
                <Link
                    className={cx(`${className}-link`)}
                    to={'/conditions'}
                >
                    Regulamin
                </Link>
            </li>
        </ul>
    );
});

 export default Navbar;
