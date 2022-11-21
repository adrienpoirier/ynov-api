import { mongoose } from "mongoose";

mongoose.connect('mongodb://localhost:27017/ynov-api')
.then(() => console.log("successfully connected to database"))
.catch((e) => console.log("error"));
  
 
