import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    try{
        console.log("Request received");
        res.send("API is running...");
    } 
    catch (error) {
        console.log("Request not received");
        res.status(500).json({ message: "Error occurred" });
    }
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
console.log("Routes loaded..."); 
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on port: ${PORT}`);
});

