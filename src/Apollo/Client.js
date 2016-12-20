/* @flow */
/**
 * Create apollo client.
 * @module Store
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import ApolloClient, {
    createNetworkInterface,
    addTypename
} from 'apollo-client';

import config from '../../config';

const networkInterface = createNetworkInterface({
    uri: `${config.apiURL}/graphql`
});

export default new ApolloClient({
    networkInterface: networkInterface,
    reduxRootSelector: 'apollo',
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
        if (result.id && result.__typename) {
            return result.__typename + result.id;
        }
        return null;
    }
});
