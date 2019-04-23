import { PubSub, withFilter } from 'apollo-server';
const { connectDB } = require('./connectDB');
const { ObjectId, equals } = require('mongodb');

const createObjectId = function (id) {
    return new ObjectId(id);
}

const TODO_CREATED = 'TODO_CREATED';
const TODO_UPDATED = 'TODO_UPDATED';

const pubsub = new PubSub();

const resolvers = {
    Query: {
        allTodos: async () => {
            const todos = [];
            const db = await connectDB().catch((err) => console.log(err));
            await db.collection('todos').find().forEach((todo)=> todos.push(todo))
            return todos;
        },
        fetchTodo: async (_, { id }) => {
            const db = await connectDB().catch((err) => console.log(err));
            return await db.collection('todos').findOne({_id: createObjectId(id)});
        }
    },
    Mutation: {
        createTodo: async (_, { text }) => {
            const db = await connectDB().catch((err) => console.log(err));
            const resObj = await db.collection('todos').insertOne({text:text, isDone:false});
            const todo = await db.collection('todos').findOne({_id: resObj.insertedId});
            pubsub.publish(TODO_CREATED, { todoCreated: todo });
            return todo;
        },
        updateTodo: async (_, { id, text, isDone }) => {
            const todo = { text: text, isDone: isDone}
            const db = await connectDB().catch((err) => console.log(err));
            const resObj = await db.collection('todos').updateOne({_id: createObjectId(id)}, {$set: todo});
            
            if (resObj.matchedCount) {
                const todo = await db.collection('todos').findOne({_id: createObjectId(id)});
                pubsub.publish(TODO_UPDATED, { todoUpdated: todo });
                return todo
            }

            throw Error('Todo not found')
        }
    },
    Subscription: {
        todoCreated: {
          subscribe: () => pubsub.asyncIterator([TODO_CREATED]),
        },
        todoUpdated: {
            subscribe: withFilter(
                                  () => pubsub.asyncIterator('TODO_UPDATED'),
                                        (payload, variables) => {
                                                return payload.todoUpdated._id.equals(variables.id);
                                            },
                                  ),
        },
    }
}

export default resolvers;