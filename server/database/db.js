import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database Connection Successful...");
  } catch (error) {
    console.log("Error Message: ", error);
  }
};

export default connectDb;
