import { useEffect, useState } from "react";
import { useTodo } from "../Context/Context.js";

const defaultValue = {
  taskTitle: "",
  isCompleted: "",
  createAt: "",
  updateAt: "",
};

const SearchInput = () => {
  const {
    onAddNewTaskHandler,
    editTaskEle,
    updateTodo,
    mode,
    setMode,
    todoMode,
  } = useTodo();
  const [newTaskTitle, setNewTask] = useState(defaultValue);
  useEffect(() => {
    const hasEditTaskEleValue = editTaskEle.taskTitle && editTaskEle._id;

    if (hasEditTaskEleValue) {
      setMode(todoMode.edit);
      console.log("editTask", editTaskEle);
      setNewTask(editTaskEle);
      console.log("newTask", newTaskTitle);
    } else {
      setMode(todoMode.add);
      setNewTask(defaultValue);
    }
  }, [editTaskEle]);
  const onChangeHandler = (e) => {
    setNewTask(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (mode === todoMode.add) {
      const newTask = {
        taskTitle: newTaskTitle,
        isCompleted: false,
        createAt: new Date().toTimeString(),
        updateAt: new Date().toTimeString(),
      };
      await onAddNewTaskHandler(newTask);
      setNewTask(defaultValue);
    } else {
      const updatedTask = { ...editTaskEle, taskTitle: newTaskTitle };
      await updateTodo(updatedTask);
      setMode(todoMode.add);
      setNewTask(defaultValue);
    }
  };
  return (
    <form className="search-input" onSubmit={onSubmitHandler}>
      <input
        id="search-input"
        type="text"
        placeholder="New task"
        size="70"
        value={newTaskTitle.taskTitle}
        onChange={onChangeHandler}
        required
      ></input>
      <button type="submit" className="btn-add">
        {mode === todoMode.edit ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default SearchInput;
