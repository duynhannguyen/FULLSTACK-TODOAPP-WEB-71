import { useEffect } from "react";
import { useTodo } from "../Context/Context.js";
import TodoItem from "./TodoItem";
const TodolList = (props) => {
  const { todoList, DeleteEle, EditEle, onChecked } = useTodo();
  console.log(todoList);
  const data = [];
  let TaskList =
    data &&
    todoList.map((todo) => (
      <TodoItem
        key={todo._id}
        {...todo}
        DeleteId={DeleteEle}
        EditId={EditEle}
        onChecked={onChecked}
      />
    ));

  return (
    <div className="todolist">
      {todoList !== [] ? TaskList : <p>Let add new task</p>}
    </div>
  );
};
export default TodolList;
