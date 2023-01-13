
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: [true, "Please enter a course"],

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

export default mongoose.model("Course", CourseSchema);