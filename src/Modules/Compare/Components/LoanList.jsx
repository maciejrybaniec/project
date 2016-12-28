/* @flow */
/**
 * Loan list component.
 * @module Modules/Compare/Components/LoanList
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import { List } from 'immutable';

import LoanItem from 'Modules/Compare/Components/LoanItem';

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
        const { loans } = this.props;
        return (
            <ul className="LoanList">
                {loans.toJS().map((loanId: string) => {
                    return (
                        <LoanItem
                            loanId={loanId}
                            key={loanId}
                        />
                    );
                })}
            </ul>
        );
    }
}


 export default LoanList;
