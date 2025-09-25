import User from '../userModel.js';
import Task from '../taskModel.js';
import mongoose from 'mongoose';


// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTask = new Task({ userId: req.userId, title });
        await newTask.save();

        return res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all tasks of logged-in user
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { completed } = req.body;

        // Validate taskId format
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Authorization check
        if (task.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update only provided fields
        // if (title !== undefined) task.title = title;
        if (completed !== undefined) task.completed = completed;

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Validate taskId format
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: "Invalid task ID" });
        }

        // Delete only if task belongs to logged-in user
        const task = await Task.findOneAndDelete({ _id: taskId, userId: req.userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


