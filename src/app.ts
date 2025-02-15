import express, { Application } from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

export default app;
