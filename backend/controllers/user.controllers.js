import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Fetch all users except the current user
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password",
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    res.status(500).json({ message: "Failed to fetch users for sidebar" });
  }
};
