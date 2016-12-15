/* @flow */
/**
 * Providers Main Component.
 * @module Modules/Providers/ProvidersMain
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';

import providersListQuery from 'Queries/providersList.graphql';
import ProviderItem from 'Modules/Providers/ProviderItem';

type PropsType = {};

@graphql(providersListQuery)
class ProvidersMain extends PureComponent {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { loading, loanProviders } = this.props.data;
        return (
            <div className="ProvidersMain">
                { (loading ? (
                    <span className="ProvidersMain__loader">
                        Loading providers...
                    </span>
                ):
                    <ul className="ProvidersMain__list">
                        {loanProviders.map((provider): React.Element<*> => {
                            return (
                                <ProviderItem
                                    providerId={provider.id}
                                    key={provider.id}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}

 export default ProvidersMain;
