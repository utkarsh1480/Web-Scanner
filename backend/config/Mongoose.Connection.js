import mongoose from "mongoose";

const db = async () => {
    const MONGO_URI = process.env.MONGO_URI; // Read AFTER dotenv.config() has run
    if (!MONGO_URI) {
        console.error("MONGO_URI is not defined. Please add it to your .env file.");
        return;
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log(" Connected to MongoDB");
    } catch (error) {
        console.error(" Error connecting to MongoDB:", error.message);
        throw error;
    }
};

export { db };