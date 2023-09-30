import express from "express";

import todoController from "../controller/todo.controller.js";
const router = express.Router();
// Get all
router.get("/", todoController.getAll);
// Get by id
router.get("/:id", todoController.getById);
// Create task
router.post("/", todoController.createPost);
// Update task
router.put("/:id", todoController.updatePost);
// Delete task
router.delete("/:id", todoController.deletePost);

export default router;
