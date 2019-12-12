import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import schema from './models/schemaQL';
import {ConnectDb} from '@DBServer';

//console.log("Server", process.env);
// Connect to the database - If testing we connect on testing database

const db_server = (process.env.JEST_WORKER_ID) ? process.env.DB_SERVER_TEST : process.env.DB_SERVER;
ConnectDb(db_server || "");

export default (app:any) => new ApolloServer({
    schema,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
})
.applyMiddleware({
    app,
    path: '/graphQL',
    cors: true,
    onHealthCheck: () =>
        // eslint-disable-next-line no-undef
        new Promise((resolve, reject) => {
            if (mongoose.connection.readyState > 0) {
                resolve();
            } else {
                reject();
            }
        }),
});