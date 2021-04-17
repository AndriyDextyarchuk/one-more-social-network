const {ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers')
const {MONGODB} = require('./config.js')
const typeDefs = require('./graphql/typeDefs.js')

// const pubSub = new PubSub()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, /*pubSub*/}),
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB connected')
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })