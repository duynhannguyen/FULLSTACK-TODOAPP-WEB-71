import { useEffect } from "react";
import { useTodo } from "../Context/Context.js";
import TodoItem from "./TodoItem";
const TodolList = (props) => {
  const { todoList, DeleteEle, EditEle, onChecked } = useTodo();
  // const { data = [], DeleteId, EditId, onChecked } = props;
  const data = [];
  let TaskList =
    data &&
    todoList.map((todo) => (
      <TodoItem
        {...todo}
        DeleteId={DeleteEle}
        EditId={EditEle}
        onChecked={onChecked}
      />
    ));

  return <div className="todolist">{TaskList}</div>;
};
export default TodolList;
