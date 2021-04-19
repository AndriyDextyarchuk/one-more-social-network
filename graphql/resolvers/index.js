const postsResolvers = require('./posts.js')
const userResolvers = require('./users.js')
const commentsResolver = require('./comments.js')

module.exports = {
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length,
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ... userResolvers.Mutation,
        ... postsResolvers.Mutation,
        ... commentsResolver.Mutation,
    },
    Subscription: {
        ... postsResolvers.Subscription,
    },
}