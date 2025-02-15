import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
