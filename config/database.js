import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const ConnectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL);
        console.log(
            `Mongoose is connected at: ${connection.host}`
        )
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
};

export default ConnectDB;