import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const app = express();


app.use(express.json());
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});

app.get("/", (req, res) => {
  try {
      res.send("API is running...");
  } 
  catch (error) {
      res.status(500).json({
          message: "Error connecting to API"
      }); 
  }
});

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
