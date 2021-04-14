const {gql} = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!
        body: String!
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
    }
`