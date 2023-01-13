import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema(
    {
       batchName: {
            type: String,
            required: [true, "Please enter your Batch"],

        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        createAt: {
            type: Date,
            default: Date.now(),
        }
    }
)

export default mongoose.model("Batch", BatchSchema);