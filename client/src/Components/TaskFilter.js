import { FILTER_TASK_OPTION } from "../Constant/Constant.js";
import { useTodo } from "../Context/Context.js";
const TaskFilter = (props) => {
  const { sortOption, setFilterOption } = useTodo();
  return (
    <div className="student-status">
      <button
        className="status-all"
        onClick={() => sortOption(FILTER_TASK_OPTION.ALL)}
      >
        All
      </button>
      <button
        className="status-complete"
        onClick={() => sortOption(FILTER_TASK_OPTION.COMPLETE)}
      >
        Complete
      </button>
      <button
        className="status-uncomplete"
        onClick={() => sortOption(FILTER_TASK_OPTION.UNCOMPLETE)}
      >
        Uncomplete
      </button>
    </div>
  );
};
export default TaskFilter;
