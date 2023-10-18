import express from "express";
import todoRouter from "./todo.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";
const route = express.Router();

route.use("/users", userRouter);
route.use("/todo", todoRouter);
route.use("/auth", authRouter);
export default route;
