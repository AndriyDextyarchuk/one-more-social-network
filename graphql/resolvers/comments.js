const {UserInputError, AuthenticationError} = require('apollo-server')

const Post = require('../../models/Post.js')
const checkAuth = require('../../utils/check-auth.js')

module.exports = {
    Mutation: {
        async createComment(_, {postID, body}, context){
            const {userName} = checkAuth(context)
            if (body.trim() === '') {
                throw new UserInputError('Emptu comment', {
                    errors: {
                        body: 'Comment must not empty'
                    }
                })
            }

            const post = await Post.findById(postID)

            if (post) {
                post.comments.unshift({
                    body,
                    userName,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else throw new UserInputError('Post not found')
        },
        async deleteComment(_, {postID, commentID}, context){
            const {userName} = checkAuth(context)

            const post = await Post.findById(postID)

            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentID)

                if (post.comments[commentIndex].userName === userName){
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}