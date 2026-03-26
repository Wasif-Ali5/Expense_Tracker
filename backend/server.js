import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
//import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());

/*app.use(
  cors({
    origin: "http://localhost:4000/",
    credentials: true,
  })
);*/

import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    console.log("BODY:", req.body);
    next();
});

app.use((req, res, next) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: "Request body missing or invalid JSON" });
  }
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

app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on port: ${PORT}`);
});

