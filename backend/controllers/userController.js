import User from "../models/user.model.js";
import bcrypt from "bcryptjs";   
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

          if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
                return res.status(400).json({
                         errors: [{ msg: "User already exists" }] });        
        }
        console.log("BODY:", req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
      res.status(500).json({
      errors: [{ msg: error.message || "Something went wrong" }],
  });
}
};

// LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

          if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};