import { createContext, useContext, useEffect, useState } from "react";
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
  }, [reload]);
  const onAddNewTaskHandler = async (NewTask) => {
    // const SaveNewTask = [...todoList, NewTask];
    // console.log("newtask", SaveNewTask);
    // const sendRequest = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(NewTask),
    // };
    try {
      const sendDataToServer = await todoApi.createTodo(NewTask);
      setReload(Math.random());
    } catch (error) {
      console.error(error);
    }
  };
  // delete
  const DeleteEle = async (_id) => {
    const deleteTask = todoList.find((task) => task._id === _id);

    const RequestDelete = {
      method: "DELETE",
      heaers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const sendRequestDel = await fetch(
        `http://localhost:3001/api/v1/todo/${_id}`,
        RequestDelete
      );
      await sendRequestDel.json();
      fetchData();
    } catch (error) {
      console.error(error);
    }
    // console.log(_id);
  };
  const EditEle = (_id) => {
    const filterEditTaskList = todoList.find(
      (editTask) => editTask._id === _id
    );
    setEditTaskEle(filterEditTaskList);
    console.log(EditTaskEle);
  };

  const updateTodo = async (updatedTask) => {
    const updateTaskIndex = todoList.findIndex(
      (task) => task._id === updatedTask._id
    );

    const newTodoList = [...todoList];
    newTodoList[updateTaskIndex] = updatedTask;
    console.log(newTodoList);
    const repuestUpdate = {
      method: "PUT",
      headers: {
        Content_Type: "application/json",
      },
      body: JSON.stringify(updatedTask),
    };
    try {
      const sendUpdateRequest = await fetch(
        `http://localhost:3001/api/v1/todo/${updatedTask._id}`,
        repuestUpdate
      );
      const responseUpdate = await sendUpdateRequest.json();
      setTodoList(newTodoList);
    } catch (error) {
      console.error(error);
    }
  };

  const onChecked = (_id) => {
    const updatingChecked = todoList.map((task) =>
      task._id === _id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTodoList(updatingChecked);
  };
  const sortOption = () => {
    setFilterOption(filterOption);
  };

  const sortTaskHandler = (filterOption, todoList) => {
    let sortList = [...todoList];
    switch (+filterOption) {
      case FILTER_TASK_OPTION.COMPLETE:
        sortList = sortList.sort(
          (task) => (task.isCompleted = !task.isCompleted)
        );

        return sortList;
      case FILTER_TASK_OPTION.ALL:
        sortList = sortList.sort(
          (task) => (task.isCompleted = task.isCompleted)
        );
        return sortList;
    }
  };
  const updatingFilter = sortTaskHandler(filterOption, todoList);
  //   console.log(updatingFilter);

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
    setEditTaskEle,
    updateTodo,
  };

  return (
    <TodoContext.Provider value={value}> {children} </TodoContext.Provider>
  );
};
