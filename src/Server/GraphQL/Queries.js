/**
 * GraphQL queries definition.
 * @module Server/GraphQL/Queries
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

 import {
   GraphQLString,
   GraphQLInt,
   GraphQLNonNull,
   GraphQLList
 } from 'graphql';

import {
    LoanProviderType,
    LoanProviderModel
} from '../Models/LoanProvider';

import {
    LoanModel,
    LoanType
} from '../Models/Loan';

export default {
    loanProvider: {
        type: LoanProviderType,
        args: {
            id: { type: GraphQLString },
            slug: { type: GraphQLString }
        },
        resolve(root, params, options) {
            const { id, slug } = params;
            if (id) return LoanProviderModel.getById(id);
            if (slug) return LoanProviderModel.getBySlug(slug);
        }
    },
    loanProviders: {
        type: new GraphQLList(LoanProviderType),
        resolve(root, params, options) {
            return LoanProviderModel.find().exec();
        }
    },
    loan: {
        type: LoanType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(root, params, options) {
            const { id } = params;
            const model = await LoanModel.findById(id);
            return model;
        }    
    },
    searchLoans: {
        type: new GraphQLList(LoanType),
        args: {
            days: { type: new GraphQLNonNull(GraphQLInt) },
            value: { type: new GraphQLNonNull(GraphQLInt) }
        },
        async resolve(root, params, options) {
            const models = await LoanModel.find();
            return models;
        }
    }
};
