import { useTodo } from "../Context/Context.js";
import TodoItem from "./TodoItem";
const TodolList = () => {
  const { todoList, onDeleteHandler, onEditHandler, onChecked } = useTodo();
  const data = [];
  let taskList =
    data &&
    todoList.map((todo) => (
      <TodoItem
        key={todo._id}
        {...todo}
        DeleteId={onDeleteHandler}
        EditId={onEditHandler}
        onChecked={onChecked}
      />
    ));

  return (
    <div className="todolist">
      {todoList !== [] ? taskList : <p>Let add new task</p>}
    </div>
  );
};
export default TodolList;
