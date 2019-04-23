import { gql } from 'apollo-server-express';

// Define our schema using the GraphQL schema language
const typeDefs = gql`
    type Todo {
        _id: ID!,
        text: String!,
        isDone: Boolean!
    }
    type Query {
        allTodos: [Todo]
        fetchTodo(id:String!): Todo
    }
    type Mutation {
        createTodo (
            text: String!
        ): Todo
        updateTodo (
            id: String!
            text: String!
            isDone: Boolean!
        ): Todo
    },
    type Subscription {
        todoCreated: Todo
        todoUpdated(id: String!): Todo
    }
`;

module.exports = typeDefs;