/* @flow */
/**
 * Provider rate model.
 * @module Server/Models/ProviderRate
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import mongoose from 'mongoose';

const providerRateSchema = new mongoose.Schema({
    rate: Number,
    providerId: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const ProviderRateModel = mongoose.model('ProviderRate', providerRateSchema);
