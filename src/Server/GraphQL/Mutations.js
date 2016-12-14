/**
 * GraphQL mutations definition.
 * @module Server/GraphQL/Queries
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import {
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

import {
    LoanProviderType,
    LoanProviderModel
} from '../Models/LoanProvider';
import { ProviderRateModel } from '../Models/ProviderRate';

export default {
    rateProvider: {
        type: GraphQLBoolean,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Provider identifier'
            },
            rate: {
                type: new GraphQLNonNull(GraphQLFloat),
                description: 'Rating'
            }
        },
        resolve(root, params, options) {
            const { id, rate } = params;
            return true;
        }
    }
};
