import Course from "../model/course.js";


// Add new Course
export const addCourse = async (req, res) => {
    try {
        const { courseName } = req.body;
        if (!courseName) {
            return res.status(400).json({
                success: true,
                message: "Fill all the Field"
            });
        }

        const exist = await Course.findOne({ courseName });
        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Course already exist"
            })
        }

        const course = await Course.create({
            courseName,
        })

        res.status(200).json({
            success: true,
            message: "Course Added Successfully",
            data: course

        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
    
}


// Get all courses

export const getCourse = async (req, res) => {
    try {
        const course = await Course.find();
        if (!course) {
            return res.status(400).json({
                success: true,
                message: "Course Does not exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Details",
            data: course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

