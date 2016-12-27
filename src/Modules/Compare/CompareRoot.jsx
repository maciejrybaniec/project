/* @flow */
/**
 * Compare root component.
 * @module Modules/Compare/CompareRoot
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import LoanCompare from 'Modules/Compare/Components/LoanCompare';
import LoanList from 'Modules/Compare/Components/LoanList';
import { searchLoan } from 'Actions/ActionCreators';
import {
    getLoadingState,
    getLoans
} from 'Reducers/Search';

const mapStateToProps = (state) => {
    return {
        loans: getLoans(state),
        searchLoading: getLoadingState(state)
    };
}

const mapDispatchToProps = {
    searchLoan
};

type PropsType = {
    searchLoading: boolean,
    searchLoan?: (amount: number, value: number) => Object,
    loans: List<string>
};

type StateType = {
    initialized: boolean
};

@connect(mapStateToProps, mapDispatchToProps)
class CompareRoot extends PureComponent {
    /**
    * Set state validation for component.
    */
    state: StateType
    /**
    * Set properties validation for component.
    */
    props: PropsType
    static defaultProps = {
        loans: List()
    };
    constructor(props: PropsType) {
        super(props);
        this.state = {
            initialized: false
        };
    }
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { searchLoan, searchLoading, loans } = this.props;
        return (
            <section className="CompareRoot">
                CompareRoot
                <LoanCompare
                   searchLoading={searchLoading}
                   searchLoan={searchLoan}
                />
                <div className="CompareRoot__loan-list">
                    <LoanList loans={loans} />
                </div>
            </section>
        );
    }
}


 export default CompareRoot;
