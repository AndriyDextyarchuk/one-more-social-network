const {AuthenticationError} = require('apollo-server')

const Post = require('../../models/Post.js')
const checkAuth = require('../../utils/check-auth.js')
 
module.exports = {
    Query: {
        async getPosts() {
            try{
                const posts = await Post.find().sort({ createdAt: -1})
                return posts
            } catch (e) {
                throw new Error(e)
            }
        },

        async getPost(_, {postID}) {
            try{
                const post = await Post.findById(postID)
                if(post){
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (e) {
                throw new Error(e)
            }
        },
    },
    Mutation: {
        async createPost(_, {body}, context){
            const user = checkAuth(context)
            console.log(user)

            const newPost = new Post({
                body,
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            return post
        },

        async deletePost(_, {postID}, context){
            const user = checkAuth(context)

            try{
                const post = await Post.findById(postID)
                if(user.userName === post.userName){
                    await post.delete()
                    return 'Post was deleted'
                }else {
                    throw new AuthenticationError('Action not allowed')
                }
            }catch (e){
                throw new Error(e)
            }
        }
    }
}