import { createContext, useContext, useEffect, useState } from "react";
import { FILTER_TASK_OPTION } from "../Constant/Constant.js";
import todoApi from "../services/todoApi.js";

const todoMode = {
  add: "Add",
  edit: "Edit",
};
export const TodoContext = createContext();
export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [editTaskEle, setEditTaskEle] = useState("");
  const [filterOption, setFilterOption] = useState(FILTER_TASK_OPTION.ALL);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(null);
  const [filter, setfilter] = useState(false);
  const [mode, setMode] = useState(todoMode.add);
  const fetchData = async () => {
    try {
      setLoading(true);
      const responseData = await todoApi.getAll();
      setTodoList(responseData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    if (filter) {
      sortTaskHandler(filterOption).then((sortList) => {
        setTodoList(sortList);
      });
    }
  }, [reload]);
  const onAddNewTaskHandler = async (newTask) => {
    try {
      setLoading(false);
      const sendDataToServer = await todoApi.createTodo(newTask);
      setReload(Math.random());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };
  // delete
  const onDeleteHandler = async (_id) => {
    if (mode === todoMode.edit) {
      return;
    }
    try {
      setLoading(false);
      const sendRequestDel = await todoApi.deleteTodo(_id);
      setReload(Math.random());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };
  const onEditHandler = (_id) => {
    const filterEditTaskList = todoList.find(
      (editTask) => editTask._id === _id
    );
    setEditTaskEle(filterEditTaskList);
  };

  const updateTodo = async (updatedTask) => {
    try {
      setLoading(false);
      const sendUpdateRequest = await todoApi.updateTodo(
        updatedTask._id,
        updatedTask
      );
      setReload(Math.random());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };

  const onChecked = async (_id) => {
    if (mode === todoMode.edit) {
      return;
    }
    const findTask = todoList.find((task) => task._id === _id);

    const updateStatusTask = {
      ...findTask,
      isCompleted: !findTask.isCompleted,
    };
    const updateStatus = await todoApi.updateTodo(_id, updateStatusTask);
    setReload(Math.random());
  };

  const sortOption = (option) => {
    setFilterOption(option);
    setfilter(true);
    setReload(Math.random());
  };

  const sortTaskHandler = async (filterOption) => {
    const getData = await todoApi.getAll();
    let sortList = getData.data;
    switch (+filterOption) {
      case FILTER_TASK_OPTION.COMPLETE:
        sortList = sortList.filter(
          (task) => (task.isCompleted = task.isCompleted)
        );
        break;
      case FILTER_TASK_OPTION.UNCOMPLETE:
        sortList = sortList.filter((task) => !task.isCompleted);
        break;
      case FILTER_TASK_OPTION.ALL:
        sortList = sortList.filter((task) => task);
        break;
    }
    return sortList;
  };

  const value = {
    onAddNewTaskHandler,
    onDeleteHandler,
    onEditHandler,
    onChecked,
    sortTaskHandler,
    sortOption,
    todoList,
    editTaskEle,
    setEditTaskEle,
    updateTodo,
    filterOption,
    setFilterOption,
    mode,
    setMode,
    todoMode,
  };

  return (
    <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
  );
};
