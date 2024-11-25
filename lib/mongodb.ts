import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB as string;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not set");
}

async function connectDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }
  const options = {
    bufferCommands: false,
  };
  await mongoose.connect(MONGODB_URI, options);
  return mongoose;
}

export default connectDb;