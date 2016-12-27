/* @flow */
/**
 * Compare loan component.
 * @module Modules/Compare/Components/LoanCompare
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import autobind from 'autobind-decorator';
import React, { PureComponent } from 'react';

type PropsType = {
    searchLoading: boolean,
    searchLoan: (amount: number, value: number) => Object
};

class LoanCompare extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { searchLoading } = this.props;
        const loadingLabel = searchLoading ? 'Loading' : '';

        return (
            <section className="LoanCompare">
                {loadingLabel}
                <button type="button" onClick={this._onLoanSearch}>
                    Porównaj
                </button>
            </section>
        );
    }
    @autobind
    _onLoanSearch() {
        const { searchLoan } = this.props;
        searchLoan(100, 1);
    }
}


 export default LoanCompare;
