import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:4000",
  "https://expensetrackerfrontend-liard.vercel.app"
];

app.use(cors({
   origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});



app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
});

connectDB();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}

export default app;