/* @flow */
/**
 * Loan list component.
 * @module Modules/Compare/Components/LoanList
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import { List } from 'immutable';

type PropsType = {
    loans: List<string>
};

class LoanList extends PureComponent {
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
            <ul className="LoanList">
                Loan list
            </ul>
        );
    }
}


 export default LoanList;
