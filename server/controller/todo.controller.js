import { db } from "../config/database.js";
import { ObjectId } from "mongodb";

const getAll = async (req, res) => {
  const todos = await db.todos.find().toArray();
  return res.json(todos);
};
const getById = async (req, res) => {
  // id
  const id = req.params.id;
  // kiểm tra id

  const getTodoById = await db.todos.findOne({ _id: new ObjectId(id) });

  if (!getTodoById) {
    return res.json({
      message: "Todo not found",
    });
  }
  // get todo từ database
  res.json({
    data: getTodoById,
  });
};

const createPost = async (req, res) => {
  const { TaskTitle, isCompleted, createAt, updateAt } = req.body;

  if (!TaskTitle) {
    return res.status(400).json({
      message: "Missing required key",
    });
  }

  const newTodo = {
    TaskTitle,
    isCompleted,
    createAt,
    updateAt,
  };

  await db.todos.insertOne(newTodo);

  res.status(201).json({
    message: "Create successfully",
  });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { TaskTitle, isCompleted, updateAt } = req.body;

  const exitstingTodo = await db.todos.findOne({ _id: new ObjectId(id) });

  if (!exitstingTodo) {
    return res.status(400).json({
      message: "Todo not found",
    });
  }

  const updateTodos = {
    ...(TaskTitle && { TaskTitle }),
    // ...(isCompleted && { isCompleted }),
    isCompleted,
    ...(updateAt && { updateAt }),
  };

  await db.todos.updateOne({ _id: new ObjectId(id) }, { $set: updateTodos });

  res.status(200).json({
    message: "Update successfully",
  });
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  const exitstingTodo = await db.todos.findOne({ _id: new ObjectId(id) });

  if (!exitstingTodo) {
    return res.status(400).json({
      message: "Todo not found",
    });
  }

  await db.todos.deleteOne({ _id: new ObjectId(id) });

  return res.json({
    message: "Delete successfully",
  });
};

const todoController = {
  getAll,
  getById,
  createPost,
  updatePost,
  deletePost,
};

export default todoController;
