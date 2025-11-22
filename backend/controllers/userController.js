import bcrypt from "bcrypt";
import { User } from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
        console.log("user Obstaja")
        return res.status(404).json({ message: "Already exists!" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ firstName, lastName, email, hashedPassword });

    res.status(201).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(400).json({ message: "Failed to create user", error: err.message });
  }
};


// Create a new user
export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        console.log("user ne Obstaja")
        return res.status(404).json({ message: "Doesnt exists!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Wrong password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(201).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(400).json({ message: "Failed to Log in user", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};