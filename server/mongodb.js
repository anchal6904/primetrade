import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function dbConnection(){
    const dburl=process.env.MONGO_URI;
    mongoose.connect(dburl,
        console.log("Connection established")
    );
}
const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error"))
db.once("open",function(){
    console.log("Database Connected")
})
export default dbConnection;