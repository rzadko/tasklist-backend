import { Request, Response } from "express";
import Task, { TaskInterface } from "../models/taskModel";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: TaskInterface[] = await Task.find();
        console.log(tasks);
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { title, status, assignee, description } = req.body;

    if (!title || !status || !assignee || !description) {
        res.status(400).json({ error: "Title and status are required." });
    }

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(status)) {
        res.status(400).json({
            error: `Invalid status. Valid statuses are: ${validStatuses.join(
                ", "
            )}`,
        });
    }

    try {
        console.log(req.body);
        const newTask: TaskInterface = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTaskStatus = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedTask) {
            res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task status", error });
    }
};

export const deleteTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
