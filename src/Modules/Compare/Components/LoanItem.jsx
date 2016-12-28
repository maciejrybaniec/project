/* @flow */
/**
 * Loan item component.
 * @module Modules/Compare/Components/LoanItem
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import LoanItemProvider from 'Modules/Compare/Components/LoanItemProvider';

type PropsType = {
    loanId: string,
    loanItem?: {
        loading: boolean
    }
};

const LoanItemQuery = gql`
    query LoanItemQuery($id: String!) {
        loan(id: $id) {
            commission
            ...LoanProvider
        }
    }
    ${LoanItemProvider.fragments.loanProvider}
`;

@graphql(LoanItemQuery, {
    name: 'loanItem',
    options: ({ loanId }) => ({
        variables: { id: loanId }
    })
})
class LoanItem extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { loanId, loanItem } = this.props;
        return (
            <li className="LoanItem">
                {loanId}
                <LoanItemProvider />
            </li>
        );
    }
}

export default LoanItem;
