//Import the mongoose module
const mongoose = require('mongoose');


export const ConnectDb = (db_server: string) => {
    mongoose.connect(db_server, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('connected', console.warn.bind(console, "Mongoose connected", db_server));
    db.on('error', console.error.bind(console, 'MongoDB connection error', db_server));
    db.on('disconnected', console.warn.bind(console, 'Mongoose close', db_server));

    return db;
};

export const CloseDB = (db:any) => {
    db.close();
}