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

import {
    ProviderRateModel,
    ProviderRateInput
} from '../Models/ProviderRate';

export default {
    rateProvider: {
        type: LoanProviderType,
        args: {
            data: {
                type: new GraphQLNonNull(ProviderRateInput),
                description: 'Provider rate input'
            }
        },
        async resolve(root, params, options) {
            const { id, rate } = params.data;
            const rateModel = new ProviderRateModel({
                providerId: id,
                rate
            });

            const model = await rateModel.save();
            const providerModel = await LoanProviderModel.getById(id);
            const updatedModel = await providerModel.updateRate();
            
            return updatedModel;
        }
    }
};
