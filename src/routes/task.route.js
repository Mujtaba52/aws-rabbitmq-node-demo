import express from "express";
const taskRouter = express.Router();

import { createTask } from "../controllers/task.controller.js";

taskRouter.post('/task', createTask);

export default taskRouter;