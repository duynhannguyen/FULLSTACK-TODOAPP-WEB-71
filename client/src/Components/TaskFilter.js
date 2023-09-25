import { FILTER_TASK_OPTION } from "../Constant/Constant";
import { useTodo } from "../Context/Context.js";
const TaskFilter = (props) => {
  const { sortOption, setFilterOption } = useTodo();
  return (
    <div className="student-status">
      <button
        className="status-all"
        onClick={() => setFilterOption(FILTER_TASK_OPTION.ALL)}
      >
        All
      </button>
      <button
        className="status-complete"
        onClick={() => setFilterOption(FILTER_TASK_OPTION.COMPLETE)}
      >
        Complete
      </button>
      <button className="status-uncomplete">Uncomplete</button>
    </div>
  );
};
export default TaskFilter;
