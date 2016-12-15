/* @flow */
/**
 * Loan provider model.
 * @module Server/Models/LoanProvider
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import mongoose from 'mongoose';
import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} from 'graphql';

import { ProviderRateModel } from './ProviderRate';

export const LoanProviderType = new GraphQLObjectType({
    name: 'Provider',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});

const loanProviderSchema = new mongoose.Schema({
    name: String,
    slug: String,
    active: {
        type: Boolean,
        default: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        rate: {
            type: Number,
            default: 0
        },
        votes: {
            type: Number,
            default: 0
        }
    }
});

loanProviderSchema.methods = {
    /**
     * Update provider rating.
     * @async
     */
    updateRate: async function() {
        const providerRates = await ProviderRateModel.aggregate([
            { $match: {
                providerId: this._id
            }},
            {
                $group: {
                    _id: '$providerId',
                    rate: { $sum: '$rate' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const { rate, count } = providerRates[0];
        const providerRating = rate / count;

        this.rating.votes = count;
        this.rating.rate = providerRating.toFixed(2);
        return await this.save();
    }
};

loanProviderSchema.statics = {
    /**
     * Get provider by identifier.
     * @method getById
     * @param {string} id Provider identifier.
     * @returns {Promise}
     * @async
     */
    getById: async function(id: string) {
        return await this.findById(id).exec();
    },
    /**
     * Get provider by slug.
     * @method getBySlug
     * @param {string} slug Provider slug.
     * @returns {Promise}
     * @async
     */
    getBySlug: async function(slug: string) {
        return await this.findOne({
            slug
        }).exec();
    }
};

export const LoanProviderModel = mongoose.model('LoanProvider', loanProviderSchema);
