import { useEffect, useState } from "react";
import { useTodo } from "../Context/Context.js";

const defaultValue = {
  TaskTitle: "",
  isCompleted: "",
  createAt: "",
  updateAt: "",
};

const SearchInput = () => {
  const {
    onAddNewTaskHandler,
    EditTaskEle,
    updateTodo,
    mode,
    setMode,
    todoMode,
  } = useTodo();
  const [NewTaskTitle, setNewTask] = useState(defaultValue);

  useEffect(() => {
    const hasEditTaskEleValue = EditTaskEle.TaskTitle && EditTaskEle._id;

    if (hasEditTaskEleValue) {
      setMode(todoMode.edit);
      setNewTask({ ...EditTaskEle });
    } else {
      setMode(todoMode.add);
      setNewTask(defaultValue);
    }
  }, [EditTaskEle]);

  const onChangeHandler = (e) => {
    setNewTask(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mode === todoMode.add) {
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
        value={NewTaskTitle.TaskTitle}
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
