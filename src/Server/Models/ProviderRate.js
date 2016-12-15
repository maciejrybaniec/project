/* @flow */
/**
 * Provider rate model.
 * @module Server/Models/ProviderRate
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import mongoose from 'mongoose';
import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLInputObjectType
} from 'graphql';

export const ProviderRateInput = new GraphQLInputObjectType({
    name: 'ProviderRateInput',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Provider identifier'
        },
        rate: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Rating'
        }
    }
});

const providerRateSchema = new mongoose.Schema({
    rate: Number,
    providerId: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const ProviderRateModel = mongoose.model('ProviderRate', providerRateSchema);
