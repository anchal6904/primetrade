import { Router } from "express";
import middleware from "../middleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.js";

const router=Router();

router.post('/',middleware,createTask) // create task   
router.get('/',middleware,getTasks) // get all tasks of logged-in user
router.put('/:taskId',middleware,updateTask) // update task (mark as completed)
router.delete('/:taskId',middleware,deleteTask) // delete task
 

    

export default router;