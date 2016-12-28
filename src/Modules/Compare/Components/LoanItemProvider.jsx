/* @flow */
/**
 * Loan item provider Component.
 * @module Modules/Compare/Components/LoanItemProvider
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

type PropsType = {};

class LoanItemProvider extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
    * Apollo query fragments.
    */
    static fragments = {
        loanProvider: gql`
            fragment LoanProvider on Loan {
                provider {
                    id
                    name
                }
            }
        `
    };
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        return (
            <div className="LoanItemProvider">
                LoanItemProvider
            </div>
        );
    }
}

export default LoanItemProvider;
