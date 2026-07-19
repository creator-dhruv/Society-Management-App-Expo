import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URL as string,
    );
  } catch (error) {
    console.error("Mongo DB error : ", error);
    process.exit(1);
  }
};

export default dbconnect;
