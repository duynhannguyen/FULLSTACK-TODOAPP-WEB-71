import { createContext, useContext, useEffect, useState } from "react";
import { FILTER_TASK_OPTION } from "../Constant/Constant.js";
export const TodoContext = createContext();

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [EditTaskEle, setEditTaskEle] = useState({});
  const [filterOption, setFilterOption] = useState(FILTER_TASK_OPTION.ALL);

  const fetchData = async () => {
    try {
      const responseData = await fetch("http://localhost:3001/api/v1/todo/");
      const data = await responseData.json();
      console.log("data", data);
      setTodoList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onAddNewTaskHandler = async (NewTask) => {
    const SaveNewTask = [...todoList, NewTask];
    setTodoList(SaveNewTask);
    const sendRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewTask),
    };
    console.log(sendRequest.body);
    try {
      const sendDataToServer = await fetch(
        "http://localhost:3001/api/v1/todo/",
        sendRequest
      );
      const responseData = await sendDataToServer.json();
      console.log(responseData);
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log(data);
      // });
    } catch (error) {
      console.error(error);
    }
  };
  // delete
  const DeleteEle = async (_id) => {
    const deleteTask = todoList.find((task) => task._id === _id);
    console.log(deleteTask);
    const RequestDelete = {
      method: "DELETE",
      heaers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteTask),
    };
    try {
      const sendRequestDel = await fetch(
        `http://localhost:3001/api/v1/todo/${_id}`,
        RequestDelete
      );
      const responseDel = await sendRequestDel.json();
      const filterdTaskList = todoList.filter((task) => task._id !== _id);
      setTodoList(filterdTaskList);
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
    // console.log(EditTaskEle);
  };

  const updateTodo = async (updatedTask) => {
    console.log(updatedTask);
    const updateTaskIndex = todoList.findIndex(
      (task) => task._id === updatedTask._id
    );
    // console.log(updateTaskIndex);
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
