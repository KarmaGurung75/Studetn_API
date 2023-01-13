import User_model from "../model/user_model.js";
import Jwt from "jsonwebtoken";

export const authenticated = async (req, res, next) => {
    try {
        let token = "";
        token = token ? token : req?.headers?.authorization;
        token = token?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
            })
        }
        const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User_model.findById(decoded.id);
        if (req.user === null) {
            return res.status(401).json({
                message: "Token Expired!!",
            })
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
        
    }
}

//admin for admin only
