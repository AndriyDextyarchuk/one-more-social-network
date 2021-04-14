const postsResolvers = require('./posts.js')
const userResolvers = require('./users.js')

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ... userResolvers.Mutation,
        ... postsResolvers.Mutation,
    }
}