import { createContext, useContext, useEffect, useState } from "react";
import TodolList from "../Components/TodoList.js";
import { FILTER_TASK_OPTION } from "../Constant/Constant.js";
import todoApi from "../services/todoApi.js";

export const TodoContext = createContext();
export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [EditTaskEle, setEditTaskEle] = useState("");
  const [filterOption, setFilterOption] = useState(FILTER_TASK_OPTION.ALL);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(null);
  const [filter, setfilter] = useState(false);
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
  const onAddNewTaskHandler = async (NewTask) => {
    try {
      setLoading(false);
      const sendDataToServer = await todoApi.createTodo(NewTask);
      setReload(Math.random());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(true);
    }
  };
  // delete
  const DeleteEle = async (_id) => {
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
  const EditEle = (_id) => {
    const filterEditTaskList = todoList.find(
      (editTask) => editTask._id === _id
    );
    setEditTaskEle(filterEditTaskList);
  };

  const updateTodo = async (updatedTask) => {
    console.log(updatedTask);
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
        sortList = sortList.sort(
          (task) => (task.isCompleted = task.isCompleted)
        );
        break;
    }
    return sortList;
  };

  // const filterData = () => {
  //   sortTaskHandler(filterOption).then((sortList) => {
  //     setTodoList(sortList);
  //   });
  // };
  // console.log(filterData());
  // if (filterOption || !filterOption) {
  //   filterData();
  // }
  // console.log(todoList);
  const value = {
    onAddNewTaskHandler,
    DeleteEle,
    EditEle,
    onChecked,
    sortTaskHandler,
    sortOption,
    todoList,
    EditTaskEle,
    filterOption,
    setFilterOption,
    setEditTaskEle,
    updateTodo,
    filterOption,
    setFilterOption,
  };

  return (
    <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
  );
};
