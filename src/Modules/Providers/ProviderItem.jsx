/* @flow */
/**
 * Provider Component.
 * @module Modules/Providers/ProviderItem
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import providerItemQuery from 'Queries/providerItem.graphql';
import ProviderVote from 'Modules/Providers/Components/ProviderVote';

type PropsType = {};

@graphql(providerItemQuery, {
    options: ({ providerId }) => ({ variables: { id: providerId } })
})
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
        const { loading, loanProvider } = this.props.data;
        const { providerId } = this.props;

        return (
            <div className="ProviderItem">
                { (loading ? (
                    <span className="ProviderItem__loader">
                        Loading...
                    </span>
                ):
                    <div className="ProviderItem__details">
                        <h4 className="ProviderItem__name">
                            {loanProvider.name}
                        </h4>
                        <div className="ProviderItem__rating">
                            {loanProvider.rating.rate}
                        </div>
                        <div className="ProviderItem__votes">
                            {loanProvider.rating.votes}
                        </div>
                    </div>
                )}
                <ProviderVote />
            </div>
        );
    }
}

ProviderItem.fragments = {
    loanProvider: gql`
        fragment ProviderItemDetails on Provider {
            name
        }
    `
};

 export default ProviderItem;
