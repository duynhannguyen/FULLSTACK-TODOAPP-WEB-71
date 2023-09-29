import { useEffect, useState } from "react";
import { useTodo } from "../Context/Context.js";

const defaultValue = {
  TaskTitle: "",
  isCompleted: "",
  createAt: "",
  updateAt: "",
};

const SearchInput = () => {
  const { onAddNewTaskHandler, EditTaskEle, updateTodo } = useTodo();
  const [NewTaskTitle, setNewTask] = useState(defaultValue);
  const [mode, setMode] = useState("Add");
  useEffect(() => {
    const hasEditTaskEleValue = EditTaskEle.TaskTitle && EditTaskEle._id;

    if (hasEditTaskEleValue) {
      setMode("Edit");
      setNewTask({ ...EditTaskEle });
      console.log("edit task:", NewTaskTitle);
    } else {
      setMode("Add");
      setNewTask(defaultValue);
    }
  }, [EditTaskEle]);

  const onChangeHandler = (e) => {
    setNewTask(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mode === "Add") {
      const NewTask = {
        TaskTitle: NewTaskTitle,
        isCompleted: false,
        createAt: new Date().toTimeString(),
        updateAt: new Date().toTimeString(),
      };
      onAddNewTaskHandler(NewTask);
      setNewTask(defaultValue);
    } else {
      const updatedTask = { ...EditTaskEle, TaskTitle: NewTaskTitle };
      updateTodo(updatedTask);
      setMode("add");
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
        value={NewTaskTitle.TaskTitle}
        onChange={onChangeHandler}
        required
      ></input>
      <button type="submit" className="btn-add">
        {mode === "Edit" ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default SearchInput;
