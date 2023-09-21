import { useState } from "react";
import "./App.css";
import SearchInput from "./Components/SearchInput";
import TodolList from "./Components/TodoList";
import DeleteAllTask from "./Components/DeleteAllTask";
import TaskFilter from "./Components/TaskFilter";
import { FILTER_TASK_OPTION } from "./Constant/Constant";
import { TodoProvider } from "./Context/Context.js";
function App() {
  return (
    <TodoProvider>
      <div className="App">
        <div className="wrapper">
          <SearchInput />
          <TaskFilter />
          <TodolList />
          {/* <DeleteAllTask Delete = {onDeleteTaskHandler}/> */}
          {/* <button className="delete-btn" onClick={onDeleteTaskHandler}>Delete All </button> */}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
