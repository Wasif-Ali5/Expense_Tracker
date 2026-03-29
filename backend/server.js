import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// 1. Core Middleware
app.use(express.json());

// 2. Logging Middleware (Keep this, it's helpful!)
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});

// ❌ REMOVE THE "app.use((req, res, next) => if (req.body === undefined)..." BLOCK ❌
// express.json() already handles body parsing. If there's no body, req.body will just be {}

// 3. Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

// 4. Default Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
});

// 6. Connect & Listen
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on port: ${PORT}`);
});