const {gql} = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        userName: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Comment {
        id: ID!
        body: String!
        userName: String!
        createdAt: String!
    }
    type Like {
        id:ID!
        createdAt: String!
        userName: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        userName: String!
        createdAt: String!
    }
    input RegisterInput{
        userName: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postID: ID!): Post 
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(userName: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postID: ID!): String!
        createComment(postID: String!, body: String!): Post!
        deleteComment(postID: ID!, commentID: ID!): Post!
        likePost(postID: ID!): Post! 
    }
    type Subscription {
        newPost: Post!
    }
`