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
