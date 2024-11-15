import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectMongoAtlas() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");

    // Specify the database name
    // const dbName = "pg-student-database";
    // const database = mongoose.connection.useDb(dbName);

    // List all collections in the database
    // const collections = await database.db.listCollections().toArray();

    // if (collections.length > 0) {
    //   console.log(`Collections in "${dbName}" database:`);
    //   collections.forEach((collection) => {
    //     console.log(collection.name);
    //   });
    // } else {
    //   console.log(`No collections found in the "${dbName}" database.`);
    // }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Export the function
export default connectMongoAtlas;
