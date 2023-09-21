import express from "express";
import todoRouter from "./todo.route.js";

const route = express.Router();

route.use("/todo", todoRouter);

export default route;
