/**
 * Root GraphQL schema file.
 * @module Server/GraphQL/Schema
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

 import {
     GraphQLSchema,
     GraphQLObjectType
 } from 'graphql';

 import Mutations from './Mutations';
 import Queries from './Queries';

 const queryType = new GraphQLObjectType({
     name: 'Query',
     fields: Queries
 });

 const mutationsType = new GraphQLObjectType({
    name: 'Mutation',
    fields: Mutations
});

 export const Schema = new GraphQLSchema({
     query: queryType,
      mutation: mutationsType
 });
