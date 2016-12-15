/* @flow */
/**
 * Provider Vote Component.
 * @module Modules/Providers/Components/ProviderVote
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React, { Component } from 'react';
import { graphql } from 'react-apollo';

type PropsType = {};

class ProviderVote extends Component {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    constructor(props: PropsType) {
        super(props);
        this.state = {
            rate: 1
        };
    }
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        return (
            <div className="ProviderVote">
                Rate provider
            </div>
        );
    }
}

 export default ProviderVote;
