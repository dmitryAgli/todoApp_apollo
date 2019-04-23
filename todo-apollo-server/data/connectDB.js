const { MongoClient } = require('mongodb');

let client

export async function connectDB() {
    // const url = 'mongodb://localhost:27017/';
    const url = 'mongodb://dbuser:db123456@ds145486.mlab.com:45486/todoapp'
    // const dbname = 'apollo-tutorial-test';
    const dbname = 'todoapp';
    
    try {
        if (!client) {
            client = await MongoClient.connect(url,{useNewUrlParser:true});
        }
        return client.db(dbname)
    } catch(err) {
        return Promise.reject(err);
    }
    
};