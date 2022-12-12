import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/ynov-api")
    .then(() => console.log('Succesfully connected to database'))
    .catch((e) => console.error(`Error during database connection: ${e}`));