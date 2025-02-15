import mongoose, { Document, Schema } from "mongoose";

enum TaskStatus {
    TODO = "To Do",
    INPROGRESS = "In Progress",
    DONE = "Done",
}

export interface TaskInterface extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    assignee: string;
    createdAt: Date;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
    },
    assignee: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<TaskInterface>("Task", taskSchema);

export default Task;
