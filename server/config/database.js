import { MongoClient } from "mongodb";
import "dotenv/config";
const MONGOURL = process.env.MONGO_URI;
// "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6";
const DATABASE = "todolist-app";
const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(MONGOURL);
    await mongoClient.connect();
    console.log("Database connected successfully");
    const database = mongoClient.db(DATABASE);
    db.todos = database.collection("todoData");
  } catch (error) {
    console.error("Connect to DB failed:", error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
