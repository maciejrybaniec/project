/* @flow */
/**
 * Provider Vote Component.
 * @module Modules/Providers/Components/ProviderVote
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import autobind from 'autobind-decorator';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

type PropsType = {
    rate: Number,
    votes: Number
};

const rateProvider = gql`
    mutation RateProvider($data: ProviderRateInput!) {
        rateProvider(data: $data) {
            id
            rating {
                rate
                votes
            }
        }
    }
`;

@graphql(rateProvider)
class ProviderVote extends Component {
    /**
    * Set properties validation for component.
    */
    props: PropsType
    constructor(props: PropsType) {
        super(props);
        this.state = {
            formRate: 1
        };
    }
    /**
     * Render component in DOM.
     * @returns {ReactElement}
     */
    render(): React.Element<*> {
        const { formRate } = this.state;
        const { rate, votes } = this.props;
                                    
        return (
            <div className="ProviderVote">
                <div className="ProviderVote__rating">
                    {rate}
                </div>
                <div className="ProviderVote__votes">
                    {votes}
                </div>
                <div className="ProviderVote__form">
                    <select value={formRate} onChange={this._onSetVoteRate}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <button onClick={this._rateProvider}>
                        Vote
                    </button>
                </div>
            </div>
        );
    }
    @autobind
    _rateProvider() {
        const { formRate } = this.state;
        const { mutate, providerId } = this.props;
        mutate({ variables: { data: { id: providerId, rate: formRate } } });
    }
    @autobind
    _onSetVoteRate(event) {
        this.setState({
            formRate: Number(event.target.value)
        });
    }
}

ProviderVote.fragments = {
    loanProvider: gql`
        fragment ProviderVote on Provider {
            rating {
                rate
                votes
            }
        }
    `
};

 export default ProviderVote;
