import { useEffect, useState } from "react";
import { useTodo } from "../Context/Context.js";

const defaultValue = {
  TaskTitle: "",
  isCompleted: "",
  createAt: "",
  updateAt: "",
};

const input = new Uint8Array(12);

const SearchInput = () => {
  const { onAddNewTaskHandler, EditTaskEle, updateTodo } = useTodo();
  const [NewTaskTitle, setNewTask] = useState(defaultValue);
  const [mode, setMode] = useState("add");
  useEffect(() => {
    // const hasEditTaskEleValue =
    //   EditTaskEle.TaskTitle &&
    //   EditTaskEle.isCompleted &&
    //   EditTaskEle.createAt &&
    //   EditTaskEle.updateAt;
    if (EditTaskEle !== {}) {
      setMode("edit");
      setNewTask({ ...EditTaskEle });
    } else {
      setMode("add");
      setNewTask(defaultValue);
    }
  }, [EditTaskEle]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mode === "add") {
      const NewTask = {
        TaskTitle: NewTaskTitle,
        isCompleted: false,
        createAt: new Date(),
        updateAt: new Date(),
      };
      onAddNewTaskHandler(NewTask);
      setNewTask(defaultValue);
    } else {
      const updatedTask = { ...EditTaskEle, TaskTitle: NewTaskTitle };
      console.log(updatedTask);
      updateTodo(updatedTask);
      setMode("add");
      setNewTask(defaultValue);
    }
  };
  const onChangeHandler = (e) => {
    setNewTask(e.target.value);
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
        Add
      </button>
    </form>
  );
};
export default SearchInput;