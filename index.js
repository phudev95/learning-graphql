"use strict";

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');
const PORT = process.env.PORT || 3000;
const server = express();
const { getVideoById } = require('./src/data');


//== Schema
const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on Egghead.io',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video.'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video.'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds).'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watched the video.'
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'The id of the video'
                }
            },
            /*resolve: () => new Promise((resolve) => {
                resolve({
                    id: 'a',
                    title: 'GraphQL',
                    duration: 180,
                    watched: false
                });
            })*/
            resolve: (_, args) => {
                return getVideoById(args.id);
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
});


const resolvers = {
    video: ({
        id: () => '1',
        title: () => 'bar',
        duration: () => 180,
        watched: () => true
    }),
    videos: () => videos
};

//== Middleware of GraphQL
server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
}));

//== Running the port, we're actually hop to Chrome browser.
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
