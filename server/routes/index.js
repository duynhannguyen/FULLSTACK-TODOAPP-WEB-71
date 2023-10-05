import express from "express";
import todoRouter from "./todo.route.js";
import authRouter from "./auth.route.js";
import authMiddleWare from "../middlewares/auth.mdw.js";
const route = express.Router();

route.use("/todo", authMiddleWare, todoRouter);
route.use("/auth", authRouter);
export default route;
