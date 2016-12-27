/* @flow */
/**
 * Loan model.
 * @module Server/Models/Loan
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import mongoose from 'mongoose';

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString
} from 'graphql';

import {
    LoanProviderModel,
    LoanProviderType
} from './LoanProvider';

export const LoanType = new GraphQLObjectType({
    name: 'Loan',
    fields: {
        id: { type: GraphQLString },
        commission: { type: GraphQLFloat },
        provider: {
            type: LoanProviderType,
            async resolve(root, params, options) {
                const { providerId } = root;
                const model = await LoanProviderModel.findById(providerId);
                return model;
            }
        }
    }
});

const loanSchema = new mongoose.Schema({
    days: Number,
    value: Number,
    commission: Number,
    providerId: mongoose.Schema.Types.ObjectId,
});

export const LoanModel = mongoose.model('Loan', loanSchema);
