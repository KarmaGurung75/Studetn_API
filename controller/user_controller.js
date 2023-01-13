import User_model from "../model/user_model.js";
// import User from "/path/to/UserSchema";

// Register New User
export const register = async (req, res) => {
  try {
    const { firstName, lastName, batch, course, username, password } = req.body;

    const avatar = req.filename;

    if (
      !firstName ||
      !lastName ||
      !batch ||
      !course ||
      !username ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the form",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 character",
      });
    }

    const exist = await User_model.findOne({ username });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    const user = await User_model.create({
      firstName,
      lastName,
      batch,
      course,
      username,
      password,
      avatar: avatar,
    });

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      batch: user.batch,
      course: user.course,
      username: user.username,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "Register Successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the field",
      });
    }

    let user = await User_model.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = await user.getSignedJwtToken();
    res.status(200).json({
      success: true,
      message: "Login successfully",
      // user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// single Profile
export const userProfile = async (req, res) => {
  try {
    const user = await User_model.findById(req.user.id)
      .populate({
        path: "batch",
        model: "Batch",
        select: "batchName",
      })
      .populate({
        path: "course",
        model: "Course",
        select: "courseName",
      });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const userInfo = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      batch: user.batch,
      course: user.course,
      username: user.username,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "User information",
      data: userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update Profile
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, batch, course, username } = req.body;
    const avatar = req.file.filename;

    const user = await User_model.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, batch, course, username, avatar: avatar },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      batch: user.batch,
      course: user.course,
      username: user.username,
      avatar: user.avatar,
    };

    res.status(200).json({
      success: true,
      message: "user update Successfully!",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
