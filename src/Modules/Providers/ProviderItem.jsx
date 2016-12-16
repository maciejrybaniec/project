/* @flow */
/**
 * Provider Component.
 * @module Modules/Providers/ProviderItem
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import providerItemQuery from 'Queries/providerItem.graphql';
import ProviderVote from 'Modules/Providers/Components/ProviderVote';

type PropsType = {};

@withApollo
class ProviderItem extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { provider } = this.props;
        const { rate, votes } = provider.rating;

        return (
            <div className="ProviderItem">
                <h4 className="ProviderItem__name">
                    {provider.name}
                </h4>
                <ProviderVote
                    rate={rate}
                    votes={votes}
                />
            </div>
        );
    }
}

ProviderItem.fragments = {
    loanProvider: gql`
        fragment ProviderItem on Provider {
            id
            name
            ...ProviderVote
        }
        ${ProviderVote.fragments.loanProvider}
    `
};

 export default ProviderItem;
