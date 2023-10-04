import React from "react";
import "../../../src/App.css";
import SearchInput from "../../Components/SearchInput.js";
import TodoList from "../../Components/TodoList.js";
import TaskFilter from "../../Components/TaskFilter.js";

const Home = () => {
  return (
    <div className="Home">
      <div className="wrapper">
        <SearchInput />
        <TaskFilter />
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
