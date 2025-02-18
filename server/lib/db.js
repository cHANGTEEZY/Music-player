import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MONGODB ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to Database");
    process.exit(1);
  }
};
